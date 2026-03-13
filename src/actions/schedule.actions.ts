"use server";

import { ActionResponse, DayOfWeek } from "@/@types/shared.types";
import { requireChurchStaffSession } from "@/lib/authorization";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DayOfWeek as PrismaDayOfWeek } from "@prisma/generated/prisma/client";

type ScheduleInput = {
  name: string;
  dayOfWeek: DayOfWeek;
  time: string;
  description?: string;
};

const dayOfWeekMap: Record<DayOfWeek, PrismaDayOfWeek> = {
  sunday: PrismaDayOfWeek.DOMINGO,
  monday: PrismaDayOfWeek.SEGUNDA,
  tuesday: PrismaDayOfWeek.TERCA,
  wednesday: PrismaDayOfWeek.QUARTA,
  thursday: PrismaDayOfWeek.QUINTA,
  friday: PrismaDayOfWeek.SEXTA,
  saturday: PrismaDayOfWeek.SABADO,
};

function toAppDay(day: PrismaDayOfWeek): DayOfWeek {
  const reverseMap: Record<PrismaDayOfWeek, DayOfWeek> = {
    DOMINGO: "sunday",
    SEGUNDA: "monday",
    TERCA: "tuesday",
    QUARTA: "wednesday",
    QUINTA: "thursday",
    SEXTA: "friday",
    SABADO: "saturday",
  };

  return reverseMap[day];
}

async function revalidateScheduleRoutes(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  });

  if (!church?.label) {
    return;
  }

  revalidatePath(`/${church.label}`);
  revalidatePath(`/${church.label}/dashboard/schedule`);
  revalidatePath(`/${church.label}/dashboard`);
}

type SchedulePayload = {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  time: string;
  description?: string;
};

export async function createScheduleEventAction(
  churchId: string,
  data: ScheduleInput
): Promise<ActionResponse<SchedulePayload>> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const schedule = await prisma.weeklySchedule.create({
      data: {
        title: data.name,
        dayOfWeek: dayOfWeekMap[data.dayOfWeek],
        time: data.time,
        description: data.description || null,
        churchId,
      },
    });

    await revalidateScheduleRoutes(churchId);

    return {
      success: true,
      data: {
        id: schedule.id,
        name: schedule.title,
        dayOfWeek: toAppDay(schedule.dayOfWeek),
        time: schedule.time,
        description: schedule.description || undefined,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao criar evento." };
  }
}

export async function updateScheduleEventAction(
  churchId: string,
  scheduleId: string,
  data: ScheduleInput
): Promise<ActionResponse<SchedulePayload>> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const existing = await prisma.weeklySchedule.findFirst({
      where: { id: scheduleId, churchId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Evento nao encontrado." };
    }

    const schedule = await prisma.weeklySchedule.update({
      where: { id: scheduleId },
      data: {
        title: data.name,
        dayOfWeek: dayOfWeekMap[data.dayOfWeek],
        time: data.time,
        description: data.description || null,
      },
    });

    await revalidateScheduleRoutes(churchId);

    return {
      success: true,
      data: {
        id: schedule.id,
        name: schedule.title,
        dayOfWeek: toAppDay(schedule.dayOfWeek),
        time: schedule.time,
        description: schedule.description || undefined,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar evento." };
  }
}

export async function deleteScheduleEventAction(
  churchId: string,
  scheduleId: string
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const existing = await prisma.weeklySchedule.findFirst({
      where: { id: scheduleId, churchId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Evento nao encontrado." };
    }

    await prisma.weeklySchedule.delete({
      where: { id: scheduleId },
    });

    await revalidateScheduleRoutes(churchId);
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao excluir evento." };
  }
}
