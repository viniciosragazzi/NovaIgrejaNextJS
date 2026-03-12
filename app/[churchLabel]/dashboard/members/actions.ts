"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createPersonAction(churchId: string, data: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId) return { error: "Não autorizado" };

  try {
    // 1. Integração Automática de Ministério
    if (data.type === "volunteer" && data.ministry) {
      await prisma.ministry.upsert({
        where: {
          name_churchId: {
            name: data.ministry,
            churchId: churchId,
          },
        },
        update: {}, // Não altera nada se já existir
        create: {
          name: data.ministry,
          churchId: churchId,
          color: "#8ee4af", // Cor padrão do seu sistema
          icon: "users",
        },
      });
    }

    // 2. Criação da Pessoa
    await prisma.person.create({
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: data.type.toUpperCase(),
        churchId: churchId,
        ministry: data.type === "volunteer" ? data.ministry : null,
        role: data.type === "volunteer" ? data.role : null,
        notes: data.notes || null,
      },
    });

    revalidatePath(`/[churchLabel]/dashboard/members`);
    revalidatePath(`/[churchLabel]/dashboard/ministerios`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao cadastrar pessoa." };
  }
}

export async function updatePersonAction(churchId: string, personId: string, data: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId) return { error: "Não autorizado" };

  try {
    // 1. Garantir que o ministério existe se for voluntário
    if (data.type === "volunteer" && data.ministry) {
      await prisma.ministry.upsert({
        where: {
          name_churchId: {
            name: data.ministry,
            churchId: churchId,
          },
        },
        update: {},
        create: {
          name: data.ministry,
          churchId: churchId,
          color: "#8ee4af",
        },
      });
    }

    // 2. Atualizar a Pessoa
    await prisma.person.update({
      where: { id: personId },
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: data.type.toUpperCase(),
        ministry: data.type === "volunteer" ? data.ministry : null,
        role: data.type === "volunteer" ? data.role : null,
        notes: data.notes || null,
      },
    });

    revalidatePath(`/[churchLabel]/dashboard/members`);
    revalidatePath(`/[churchLabel]/dashboard/ministerios`);
    return { success: true };
  } catch (error) {
    console.error("ERRO AO ATUALIZAR:", error);
    return { error: "Falha técnica ao atualizar." };
  }
}

export async function deletePersonAction(churchId: string, personId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId) return { error: "Não autorizado" };

  try {
    await prisma.person.delete({ where: { id: personId } });
    revalidatePath(`/[churchLabel]/dashboard/members`);
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir registro." };
  }
}
