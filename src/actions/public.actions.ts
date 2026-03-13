"use server"

import { ActionResponse } from "@/@types/shared.types"
import { requireChurchStaffSession } from "@/lib/authorization"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import { buildPixPayload, extractCityFromAddress, getPixPaymentLink } from "@/lib/pix"
import {
  publicOfferingSchema,
  publicPrayerRequestSchema,
  type PublicOfferingFormData,
  type PublicPrayerRequestFormData,
} from "@/lib/validations"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/generated/prisma/client"

async function getChurchByLabel(churchLabel: string) {
  return prisma.church.findUnique({
    where: { label: churchLabel },
    select: {
      id: true,
      label: true,
      name: true,
      address: true,
      pixKeyValue: true,
      customization: true,
    },
  })
}

export async function submitPrayerRequestAction(
  churchLabel: string,
  data: PublicPrayerRequestFormData
): Promise<ActionResponse<{ id: string }>> {
  const parsed = publicPrayerRequestSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
  }

  const church = await getChurchByLabel(churchLabel)
  if (!church) {
    return { success: false, error: "Igreja nao encontrada." }
  }

  try {
    const customization = normalizeChurchCustomization(church.customization)
    const nextPrayerRequest = {
      id: crypto.randomUUID(),
      name: parsed.data.name.trim(),
      contact: parsed.data.contact?.trim() || "",
      request: parsed.data.request.trim(),
      createdAt: new Date().toISOString(),
      status: "pending" as const,
    }
    const updatedCustomization = {
      ...customization,
      interacaoPublica: {
        ...customization.interacaoPublica,
        prayerRequests: [nextPrayerRequest, ...customization.interacaoPublica.prayerRequests].slice(0, 100),
      },
    }

    await prisma.church.update({
      where: { id: church.id },
      data: {
        customization: updatedCustomization as unknown as Prisma.InputJsonValue,
      },
    })

    revalidatePath(`/${church.label}`)
    revalidatePath(`/${church.label}/dashboard/profile`)

    return { success: true, data: { id: nextPrayerRequest.id } }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel enviar o pedido de oracao." }
  }
}

export async function submitPublicOfferingAction(
  churchLabel: string,
  data: PublicOfferingFormData
): Promise<ActionResponse<{ id: string; pixPayload: string; pixLink: string }>> {
  const parsed = publicOfferingSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Dados invalidos." }
  }

  const church = await getChurchByLabel(churchLabel)
  if (!church) {
    return { success: false, error: "Igreja nao encontrada." }
  }

  if (!church.pixKeyValue) {
    return { success: false, error: "A igreja ainda nao configurou uma chave PIX publica." }
  }

  try {
    const pixPayload = buildPixPayload({
      pixKey: church.pixKeyValue,
      amount: parsed.data.amount,
      churchName: church.name,
      city: extractCityFromAddress(church.address),
      description: parsed.data.description?.trim() || "Oferta",
    })

    return {
      success: true,
      data: {
        id: crypto.randomUUID(),
        pixPayload,
        pixLink: getPixPaymentLink(pixPayload),
      },
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel registrar a oferta." }
  }
}

export async function updatePrayerRequestStatusAction(
  churchId: string,
  requestId: string,
  status: "pending" | "reviewed"
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId)
  if (!session) {
    return { success: false, error: "Nao autorizado" }
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { id: true, label: true, customization: true },
  })

  if (!church) {
    return { success: false, error: "Igreja nao encontrada." }
  }

  try {
    const customization = normalizeChurchCustomization(church.customization)
    const prayerRequests = customization.interacaoPublica.prayerRequests.map((item) =>
      item.id === requestId ? { ...item, status } : item
    )
    const updatedCustomization = {
      ...customization,
      interacaoPublica: {
        ...customization.interacaoPublica,
        prayerRequests,
      },
    }

    await prisma.church.update({
      where: { id: church.id },
      data: {
        customization: updatedCustomization as unknown as Prisma.InputJsonValue,
      },
    })

    revalidatePath(`/${church.label}/dashboard/prayers`)
    revalidatePath(`/${church.label}/dashboard/profile`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel atualizar o pedido." }
  }
}

export async function deletePrayerRequestAction(
  churchId: string,
  requestId: string
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId)
  if (!session) {
    return { success: false, error: "Nao autorizado" }
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { id: true, label: true, customization: true },
  })

  if (!church) {
    return { success: false, error: "Igreja nao encontrada." }
  }

  try {
    const customization = normalizeChurchCustomization(church.customization)
    const prayerRequests = customization.interacaoPublica.prayerRequests.filter((item) => item.id !== requestId)
    const updatedCustomization = {
      ...customization,
      interacaoPublica: {
        ...customization.interacaoPublica,
        prayerRequests,
      },
    }

    await prisma.church.update({
      where: { id: church.id },
      data: {
        customization: updatedCustomization as unknown as Prisma.InputJsonValue,
      },
    })

    revalidatePath(`/${church.label}/dashboard/prayers`)
    revalidatePath(`/${church.label}/dashboard/profile`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Nao foi possivel remover o pedido." }
  }
}
