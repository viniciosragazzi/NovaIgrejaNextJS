"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createScheduleAction(churchId: string, data: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId) return { error: "Não autorizado" };

  try {
    // Aqui você criaria a escala no banco.
    // Certifique-se de ter as tabelas Ministry e VolunteerScale no schema.
    await prisma.volunteerScale.create({
      data: {
        date: new Date(data.eventDate),
        role: data.role,
        personId: data.volunteerId,
        churchId: churchId,
        // ministryId: data.ministryId
      }
    });

    revalidatePath(`/[churchLabel]/dashboard/ministries`);
    return { success: true };
  } catch (error) {
    return { error: "Erro ao salvar escala." };
  }
}
