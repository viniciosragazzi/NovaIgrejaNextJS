"use server"

import { Person } from "@/@types/person.types"
import { Schedule, ScheduleFormData } from "@/@types/ministry.types"
import { ActionResponse } from "@/@types/shared.types"
import { getAuthSession, requireChurchModuleSession } from "@/lib/authorization"
import { applyJourneyTrigger } from "@/lib/member-journey"
import {
  notifyStaffAboutScaleResponse,
  notifyVolunteerAssignedToScale,
} from "@/lib/notifications"
import prisma from "@/lib/prisma"
import { volunteerScaleResponseSchema } from "@/lib/validations"
import { VolunteerScaleResponseStatus } from "@prisma/generated/prisma/client"
import { revalidatePath } from "next/cache"

async function getChurchLabel(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  })

  return church?.label
}

async function revalidateMinistryRoute(churchId: string) {
  const churchLabel = await getChurchLabel(churchId)
  if (churchLabel) {
    revalidatePath(`/${churchLabel}/dashboard/ministerios`)
  }
}

function mapPerson(person: {
  id: string
  name: string
  contact: string[]
  email: string | null
  address: string | null
  birthday: string | null
  notes: string | null
  ministry: string | null
  role: string | null
  type: "STAFF" | "MEMBER" | "VISITOR" | "VOLUNTEER"
}) {
  return {
    id: person.id,
    fullName: person.name,
    whatsapp: person.contact[0] || "",
    email: person.email || "",
    address: person.address || "",
    birthDate: person.birthday || "",
    notes: person.notes || "",
    ministry: person.ministry || "",
    role: person.role || "",
    type: person.type.toLowerCase(),
  } as Person
}

function mapSchedule(scale: {
  id: string
  date: Date
  eventName: string | null
  ministryId: string
  role: string
  confirmed: boolean
  responseStatus: VolunteerScaleResponseStatus
  responseNote: string | null
  respondedAt: Date | null
  person: {
    id: string
    name: string
    contact: string[]
    email: string | null
    address: string | null
    birthday: string | null
    notes: string | null
    ministry: string | null
    role: string | null
    type: "STAFF" | "MEMBER" | "VISITOR" | "VOLUNTEER"
  }
  ministry: {
    name: string
  }
}) {
  return {
    id: scale.id,
    eventDate: scale.date.toISOString(),
    eventName: scale.eventName || "Evento",
    ministryId: scale.ministryId,
    ministryName: scale.ministry.name,
    confirmed: scale.confirmed,
    responseStatus: scale.responseStatus.toLowerCase() as Schedule["responseStatus"],
    responseNote: scale.responseNote || undefined,
    respondedAt: scale.respondedAt?.toISOString(),
    role: scale.role,
    person: mapPerson(scale.person),
  } satisfies Schedule
}

type ScheduleCreateResponse = ActionResponse<Schedule[]>

export async function createScheduleAction(
  churchId: string,
  data: ScheduleFormData
): Promise<ScheduleCreateResponse> {
  const session = await requireChurchModuleSession(churchId, "ministerios")
  if (!session) {
    return { success: false, error: "Nao autorizado" }
  }

  try {
    const ministry = await prisma.ministry.findFirst({
      where: { id: data.ministryId, churchId },
      select: { id: true },
    })

    if (!ministry) {
      return { success: false, error: "Ministerio invalido." }
    }

    const volunteers = await prisma.person.findMany({
      where: {
        id: { in: data.volunteerIds },
        churchId,
      },
      select: { id: true },
    })

    if (volunteers.length !== data.volunteerIds.length) {
      return { success: false, error: "Um ou mais voluntarios sao invalidos." }
    }

    const createdSchedules = await prisma.$transaction(
      data.volunteerIds.map((volunteerId) =>
        prisma.volunteerScale.create({
          data: {
            date: new Date(data.eventDate),
            eventName: data.eventName,
            role: data.role,
            personId: volunteerId,
            ministryId: data.ministryId,
            churchId,
            responseStatus: VolunteerScaleResponseStatus.PENDING,
          },
          include: {
            person: {
              select: {
                id: true,
                name: true,
                contact: true,
                email: true,
                address: true,
                birthday: true,
                notes: true,
                ministry: true,
                role: true,
                type: true,
              },
            },
            ministry: {
              select: { name: true },
            },
          },
        })
      )
    )

    const churchLabel = await getChurchLabel(churchId)

    if (churchLabel) {
      await prisma.$transaction(async (tx) => {
        for (const schedule of createdSchedules) {
          await notifyVolunteerAssignedToScale(tx, {
            churchId,
            churchLabel,
            actorUserId: session.user.id,
            scale: {
              id: schedule.id,
              eventName: schedule.eventName,
              role: schedule.role,
              date: schedule.date,
              person: {
                id: schedule.person.id,
                name: schedule.person.name,
                email: schedule.person.email,
              },
              ministry: {
                name: schedule.ministry.name,
              },
            },
          })
        }
      })
    }

    await revalidateMinistryRoute(churchId)

    return {
      success: true,
      data: createdSchedules.map(mapSchedule),
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Erro ao salvar escala." }
  }
}

export async function updateScaleVolunteerAction(
  churchId: string,
  scaleId: string,
  volunteerId: string
): Promise<ActionResponse<Schedule>> {
  const session = await requireChurchModuleSession(churchId, "ministerios")
  if (!session) {
    return { success: false, error: "Nao autorizado" }
  }

  try {
    const scale = await prisma.volunteerScale.findFirst({
      where: { id: scaleId, churchId },
      select: { id: true },
    })

    const volunteer = await prisma.person.findFirst({
      where: { id: volunteerId, churchId },
      select: { id: true },
    })

    if (!scale || !volunteer) {
      return { success: false, error: "Escala ou voluntario invalido." }
    }

    const churchLabel = await getChurchLabel(churchId)

    const updatedScale = await prisma.$transaction(async (tx) => {
      const updated = await tx.volunteerScale.update({
        where: { id: scaleId },
        data: { personId: volunteerId },
        include: {
          person: {
            select: {
              id: true,
              name: true,
              contact: true,
              email: true,
              address: true,
              birthday: true,
              notes: true,
              ministry: true,
              role: true,
              type: true,
            },
          },
          ministry: {
            select: { name: true },
          },
        },
      })

      if (churchLabel) {
        await notifyVolunteerAssignedToScale(tx, {
          churchId,
          churchLabel,
          actorUserId: session.user.id,
          scale: {
            id: updated.id,
            eventName: updated.eventName,
            role: updated.role,
            date: updated.date,
            person: {
              id: updated.person.id,
              name: updated.person.name,
              email: updated.person.email,
            },
            ministry: {
              name: updated.ministry.name,
            },
          },
        })
      }

      return updated
    })

    await revalidateMinistryRoute(churchId)
    return { success: true, data: mapSchedule(updatedScale) }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Erro ao atualizar voluntario da escala." }
  }
}

export async function deleteScheduleAction(
  churchId: string,
  scaleId: string
): Promise<ActionResponse> {
  const session = await requireChurchModuleSession(churchId, "ministerios")
  if (!session) {
    return { success: false, error: "Nao autorizado" }
  }

  try {
    const existingScale = await prisma.volunteerScale.findFirst({
      where: { id: scaleId, churchId },
      select: { id: true },
    })

    if (!existingScale) {
      return { success: false, error: "Escala nao encontrada." }
    }

    await prisma.volunteerScale.delete({
      where: { id: scaleId },
    })

    await revalidateMinistryRoute(churchId)
    return { success: true }
  } catch {
    return { success: false, error: "Erro ao excluir escala." }
  }
}

async function revalidateVolunteerRoutes(churchId: string) {
  const churchLabel = await getChurchLabel(churchId)
  if (!churchLabel) {
    return
  }

  revalidatePath(`/${churchLabel}/dashboard`)
  revalidatePath(`/${churchLabel}/dashboard/jornada`)
  revalidatePath(`/${churchLabel}/dashboard/ministerios`)
}

export async function respondToMyScaleAction(
  churchId: string,
  input: { scaleId: string; status: "confirmed" | "declined" | "swap_requested"; note?: string }
): Promise<ActionResponse<Schedule>> {
  const session = await getAuthSession()
  if (!session || session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado" }
  }

  const parsed = volunteerScaleResponseSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
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
      return { success: false, error: "Perfil do voluntario nao encontrado." }
    }

    const scale = await prisma.volunteerScale.findFirst({
      where: {
        id: parsed.data.scaleId,
        churchId,
        personId: person.id,
      },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            contact: true,
            email: true,
            address: true,
            birthday: true,
            notes: true,
            ministry: true,
            role: true,
            type: true,
          },
        },
        ministry: {
          select: { name: true },
        },
      },
    })

    if (!scale) {
      return { success: false, error: "Escala nao encontrada." }
    }

    const nextStatus = {
      confirmed: VolunteerScaleResponseStatus.CONFIRMED,
      declined: VolunteerScaleResponseStatus.DECLINED,
      swap_requested: VolunteerScaleResponseStatus.SWAP_REQUESTED,
    }[parsed.data.status]

    const churchLabel = await getChurchLabel(churchId)

    const updatedScale = await prisma.$transaction(async (tx) => {
      const updated = await tx.volunteerScale.update({
        where: { id: scale.id },
        data: {
          confirmed: parsed.data.status === "confirmed",
          responseStatus: nextStatus,
          responseNote: parsed.data.note?.trim() || null,
          respondedAt: new Date(),
        },
        include: {
          person: {
            select: {
              id: true,
              name: true,
              contact: true,
              email: true,
              address: true,
              birthday: true,
              notes: true,
              ministry: true,
              role: true,
              type: true,
            },
          },
          ministry: {
            select: { name: true },
          },
        },
      })

      if (parsed.data.status === "confirmed") {
        await applyJourneyTrigger(tx, churchId, person.id, "SCALE_CONFIRMED")
      }

      if (churchLabel) {
        const typeByStatus = {
          confirmed: "VOLUNTEER_CONFIRMED_SCALE",
          declined: "VOLUNTEER_DECLINED_SCALE",
          swap_requested: "VOLUNTEER_REQUESTED_SWAP",
        } as const

        await notifyStaffAboutScaleResponse(tx, {
          churchId,
          churchLabel,
          actorUserId: session.user.id,
          type: typeByStatus[parsed.data.status],
          scale: {
            id: updated.id,
            eventName: updated.eventName,
            role: updated.role,
            responseNote: updated.responseNote,
            person: {
              id: updated.person.id,
              name: updated.person.name,
            },
            ministry: {
              name: updated.ministry.name,
            },
          },
        })
      }

      return updated
    })

    await revalidateVolunteerRoutes(churchId)
    return { success: true, data: mapSchedule(updatedScale) }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel atualizar sua resposta." }
  }
}
