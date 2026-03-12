"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ScheduleFormData } from "@/@types/ministry.types";
import { ActionResponse } from "@/@types/shared.types";

// Escalar um voluntário
export async function createScheduleAction(
  churchId: string,
  data: ScheduleFormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId)
    return { success: false, error: "Não autorizado" };

  try {
    await prisma.volunteerScale.create({
      data: {
        date: new Date(data.eventDate),
        eventName: data.eventName,
        role: data.role,
        personId: data.volunteerId,
        ministryId: data.ministryId,
        churchId: churchId,
      }
    });

    revalidatePath(`/[churchLabel]/dashboard/ministerios`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao salvar escala." };
  }
}

// Alternar confirmação (Check/Uncheck)
export async function toggleConfirmationAction(
  churchId: string,
  scaleId: string,
  confirmed: boolean
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId)
    return { success: false, error: "Não autorizado" };

  try {
    await prisma.volunteerScale.update({
      where: { id: scaleId },
      data: { confirmed }
    });

    revalidatePath(`/[churchLabel]/dashboard/ministerios`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar confirmação." };
  }
}
