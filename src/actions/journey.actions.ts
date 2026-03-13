"use server"

import type { ActionResponse } from "@/@types/shared.types"
import type { JourneyOverview } from "@/@types/journey.types"
import { getAuthSession, requireChurchModuleSession } from "@/lib/authorization"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import {
  applyJourneyTrigger,
  buildJourneyOverview,
  movePersonToJourneyStage,
} from "@/lib/member-journey"
import prisma from "@/lib/prisma"
import {
  memberJourneyInterestSchema,
  memberJourneySelfTriggerSchema,
  moveJourneyStageSchema,
  publicPrayerRequestSchema,
} from "@/lib/validations"
import { Prisma, VolunteerScaleResponseStatus } from "@prisma/generated/prisma/client"
import { revalidatePath } from "next/cache"

async function getChurchLabel(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  })

  return church?.label || null
}

async function revalidateJourneyRoutes(churchId: string) {
  const churchLabel = await getChurchLabel(churchId)
  if (!churchLabel) {
    return
  }

  revalidatePath(`/${churchLabel}/dashboard`)
  revalidatePath(`/${churchLabel}/dashboard/jornada`)
  revalidatePath(`/${churchLabel}/dashboard/jornada/gestao`)
  revalidatePath(`/${churchLabel}/dashboard/ministerios`)
  revalidatePath(`/${churchLabel}/dashboard/prayers`)
  revalidatePath(`/${churchLabel}/dashboard/members`)
}

async function getMemberForSession(churchId: string) {
  const session = await getAuthSession()
  if (!session || session.user.churchId !== churchId) {
    return { session: null, person: null }
  }

  const person = await prisma.person.findFirst({
    where: {
      churchId,
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      contact: true,
      notes: true,
    },
  })

  return { session, person }
}

export async function getMyJourneyOverviewAction(
  churchId: string
): Promise<ActionResponse<JourneyOverview>> {
  const session = await getAuthSession()
  if (!session || session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." }
  }

  try {
    const person = await prisma.person.findFirst({
      where: {
        churchId,
        email: session.user.email,
      },
      select: { id: true },
    })

    if (!person) {
      return { success: false, error: "Perfil do membro nao encontrado." }
    }

    const overview = await prisma.$transaction((tx) =>
      buildJourneyOverview(tx, person.id, churchId)
    )

    if (!overview) {
      return { success: false, error: "Jornada nao encontrada." }
    }

    return { success: true, data: overview }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel carregar sua jornada." }
  }
}

export async function completeMemberSelfJourneyTriggerAction(
  churchId: string,
  trigger: "FIRST_ATTENDANCE" | "ATTENDANCE_STREAK"
): Promise<ActionResponse> {
  const parsed = memberJourneySelfTriggerSchema.safeParse(trigger)
  if (!parsed.success) {
    return { success: false, error: "Gatilho invalido." }
  }

  const { session, person } = await getMemberForSession(churchId)
  if (!session || !person) {
    return { success: false, error: "Nao autorizado." }
  }

  try {
    await prisma.$transaction((tx) => applyJourneyTrigger(tx, churchId, person.id, parsed.data))
    await revalidateJourneyRoutes(churchId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel atualizar sua jornada." }
  }
}

export async function submitMemberPrayerRequestAction(
  churchId: string,
  data: { name: string; contact?: string; request: string }
): Promise<ActionResponse<{ id: string }>> {
  const parsed = publicPrayerRequestSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
  }

  const { session, person } = await getMemberForSession(churchId)
  if (!session || !person) {
    return { success: false, error: "Nao autorizado." }
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { id: true, customization: true },
  })

  if (!church) {
    return { success: false, error: "Igreja nao encontrada." }
  }

  try {
    const requestId = crypto.randomUUID()
    const customization = normalizeChurchCustomization(church.customization)
    const updatedCustomization = {
      ...customization,
      interacaoPublica: {
        ...customization.interacaoPublica,
        prayerRequests: [
          {
            id: requestId,
            name: parsed.data.name.trim(),
            contact: parsed.data.contact?.trim() || "",
            request: parsed.data.request.trim(),
            createdAt: new Date().toISOString(),
            status: "pending" as const,
          },
          ...customization.interacaoPublica.prayerRequests,
        ].slice(0, 100),
      },
    }

    await prisma.$transaction(async (tx) => {
      await tx.church.update({
        where: { id: church.id },
        data: {
          customization: updatedCustomization as unknown as Prisma.InputJsonValue,
        },
      })

      await applyJourneyTrigger(tx, churchId, person.id, "FIRST_PRAYER_REQUEST")
    })

    await revalidateJourneyRoutes(churchId)
    return { success: true, data: { id: requestId } }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel enviar seu pedido de oracao." }
  }
}

export async function registerMemberJourneyInterestAction(
  churchId: string,
  trigger: "JOINED_MINISTRY" | "JOINED_GROUP",
  input: { selections: string[]; message?: string }
): Promise<ActionResponse> {
  const parsed = memberJourneyInterestSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
  }

  const { session, person } = await getMemberForSession(churchId)
  if (!session || !person) {
    return { success: false, error: "Nao autorizado." }
  }

  const interestLabel =
    trigger === "JOINED_MINISTRY" ? "Interesse em ministerios" : "Interesse em grupos/celulas"
  const noteEntry = [
    `[${new Date().toLocaleDateString("pt-BR")}] ${interestLabel}: ${parsed.data.selections.join(", ")}`,
    parsed.data.message?.trim() ? `Mensagem: ${parsed.data.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join(" | ")

  try {
    await prisma.$transaction(async (tx) => {
      await tx.person.update({
        where: { id: person.id },
        data: {
          notes: person.notes ? `${person.notes}\n${noteEntry}` : noteEntry,
        },
      })

      await applyJourneyTrigger(tx, churchId, person.id, trigger)
    })

    await revalidateJourneyRoutes(churchId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel registrar seu interesse." }
  }
}

export async function confirmMyScaleAction(
  churchId: string,
  scaleId: string
): Promise<ActionResponse> {
  const { session, person } = await getMemberForSession(churchId)
  if (!session || !person) {
    return { success: false, error: "Nao autorizado." }
  }

  try {
    const scale = await prisma.volunteerScale.findFirst({
      where: {
        id: scaleId,
        churchId,
        personId: person.id,
      },
      select: {
        id: true,
        confirmed: true,
        responseStatus: true,
      },
    })

    if (!scale) {
      return { success: false, error: "Escala nao encontrada." }
    }

    if (!scale.confirmed || scale.responseStatus !== VolunteerScaleResponseStatus.CONFIRMED) {
      await prisma.$transaction(async (tx) => {
        await tx.volunteerScale.update({
          where: { id: scale.id },
          data: {
            confirmed: true,
            responseStatus: VolunteerScaleResponseStatus.CONFIRMED,
            respondedAt: new Date(),
          },
        })

        await applyJourneyTrigger(tx, churchId, person.id, "SCALE_CONFIRMED")
      })
    }

    await revalidateJourneyRoutes(churchId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel confirmar sua escala." }
  }
}

export async function moveJourneyStageAction(
  churchId: string,
  input: { personId: string; stageId: string; notes?: string }
): Promise<ActionResponse> {
  const session = await requireChurchModuleSession(churchId, "membros")
  if (!session) {
    return { success: false, error: "Nao autorizado." }
  }

  const parsed = moveJourneyStageSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
  }

  try {
    await prisma.$transaction((tx) =>
      movePersonToJourneyStage(
        tx,
        churchId,
        parsed.data.personId,
        parsed.data.stageId,
        parsed.data.notes || ""
      )
    )

    await revalidateJourneyRoutes(churchId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel atualizar a etapa da jornada." }
  }
}

export async function triggerJourneyEventAction(
  churchId: string,
  personId: string,
  trigger:
    | "MANUAL"
    | "PROFILE_COMPLETED"
    | "ONBOARDING_COMPLETED"
    | "FIRST_ATTENDANCE"
    | "ATTENDANCE_STREAK"
    | "JOINED_MINISTRY"
    | "JOINED_GROUP"
    | "FIRST_PRAYER_REQUEST"
    | "SCALE_CONFIRMED"
): Promise<ActionResponse> {
  const session = await requireChurchModuleSession(churchId, "membros")
  if (!session) {
    return { success: false, error: "Nao autorizado." }
  }

  try {
    await prisma.$transaction((tx) => applyJourneyTrigger(tx, churchId, personId, trigger))
    await revalidateJourneyRoutes(churchId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel aplicar o evento da jornada." }
  }
}
