"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { PersonFormData } from "@/@types/person.types";
import { ActionResponse } from "@/@types/shared.types";

import { TypePerson } from "@prisma/generated/prisma/client";

export async function createPersonAction(
  churchId: string,
  data: PersonFormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId)
    return { success: false, error: "Não autorizado" };

  try {
    const typeMap: Record<string, TypePerson> = {
      member: TypePerson.MEMBER,
      visitor: TypePerson.VISITOR,
      volunteer: TypePerson.VOLUNTEER,
    };

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
        type: typeMap[data.type] || TypePerson.VISITOR,
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
    return { success: false, error: "Erro ao cadastrar pessoa." };
  }
}

export async function updatePersonAction(
  churchId: string,
  personId: string,
  data: PersonFormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId)
    return { success: false, error: "Não autorizado" };

  try {
    const typeMap: Record<string, TypePerson> = {
      member: TypePerson.MEMBER,
      visitor: TypePerson.VISITOR,
      volunteer: TypePerson.VOLUNTEER,
    };

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
        type: typeMap[data.type] || TypePerson.VISITOR,
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
    return { success: false, error: "Falha técnica ao atualizar." };
  }
}

export async function deletePersonAction(
  churchId: string,
  personId: string
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.churchId !== churchId)
    return { success: false, error: "Não autorizado" };

  try {
    await prisma.person.delete({ where: { id: personId } });
    revalidatePath(`/[churchLabel]/dashboard/members`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir registro." };
  }
}
