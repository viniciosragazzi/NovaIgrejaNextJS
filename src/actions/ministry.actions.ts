"use server"

import { Person } from "@/@types/person.types"
import { Schedule, ScheduleFormData } from "@/@types/ministry.types"
import { ActionResponse } from "@/@types/shared.types"
import { requireChurchStaffSession } from "@/lib/authorization"
import prisma from "@/lib/prisma"
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
    role: scale.role,
    person: mapPerson(scale.person),
  } satisfies Schedule
}

type ScheduleCreateResponse = ActionResponse<Schedule[]>

export async function createScheduleAction(
  churchId: string,
  data: ScheduleFormData
): Promise<ScheduleCreateResponse> {
  const session = await requireChurchStaffSession(churchId)
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
  const session = await requireChurchStaffSession(churchId)
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

    const updatedScale = await prisma.volunteerScale.update({
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
  const session = await requireChurchStaffSession(churchId)
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
