"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createPersonAction(churchId: string, data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.churchId !== churchId) {
    return { error: "Não autorizado" };
  }

  try {
    await prisma.person.create({
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: data.type.toUpperCase(), // MEMBER, VISITOR, VOLUNTEER
        churchId: churchId,
        // Novos campos
        ministry: data.type === "volunteer" ? data.ministry : null,
        role: data.type === "volunteer" ? data.role : null,
      },
    });

    revalidatePath(`/[churchLabel]/dashboard/members`, "page");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao cadastrar pessoa." };
  }
}

export async function updatePersonAction(churchId: string, personId: string, data: any) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.churchId !== churchId) {
    return { error: "Não autorizado" };
  }

  try {
    await prisma.person.update({
      where: { id: personId },
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: data.type.toUpperCase(),
        // Novos campos
        ministry: data.type === "volunteer" ? data.ministry : null,
        role: data.type === "volunteer" ? data.role : null,
      },
    });

    revalidatePath(`/[churchLabel]/dashboard/members`, "page");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar pessoa." };
  }
}

export async function vincularMembroAction(email: string, churchId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.churchId !== churchId) return { error: "Não autorizado" };

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        churchId: churchId,
        status: "MEMBER"
      }
    });

    await prisma.person.upsert({
      where: { email_churchId: { email, churchId } },
      update: { type: "MEMBER" },
      create: {
        name: updatedUser.name,
        email: updatedUser.email,
        type: "MEMBER",
        churchId: churchId,
        contact: []
      }
    });

    revalidatePath(`/[churchLabel]/dashboard/members`, "page");
    return { success: true };
  } catch (error) {
    return { error: "Usuário não encontrado no sistema." };
  }
}

// Action de Deletar (faltava no seu código)
export async function deletePersonAction(churchId: string, personId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.churchId !== churchId) {
    return { error: "Não autorizado" };
  }

  try {
    await prisma.person.delete({
      where: { id: personId }
    });

    revalidatePath(`/[churchLabel]/dashboard/members`, "page");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir registro." };
  }
}
