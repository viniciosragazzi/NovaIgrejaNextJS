"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateChurchProfileAction(churchId: string, data: any, links: any[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // SEGURANÇA: Verifica se é staff desta igreja específica
  if (!session || session.user.churchId !== churchId || session.user.role !== "USER") {
    // Note: No seu schema, SystemRole 'USER' é o padrão,
    // mas a lógica de Staff é controlada pelo churchId vinculado.
    throw new Error("Não autorizado");
  }

  try {
    // Transação para garantir que tudo salve ou nada salve
    await prisma.$transaction([
      // 1. Atualiza dados básicos da Igreja
      prisma.church.update({
        where: { id: churchId },
        data: {
          name: data.name,
          address: data.address,
          // slug/label costuma ser bloqueado após criação para não quebrar URLs
        },
      }),

      // 2. Limpa links antigos e insere os novos (Sincronização)
      prisma.churchLink.deleteMany({ where: { churchId } }),
      prisma.churchLink.createMany({
        data: links.map((link, index) => ({
          title: link.title,
          url: link.url,
          churchId: churchId,
          order: index,
          icon: link.title.toLowerCase() // O componente já faz o mapeamento por nome
        })),
      }),
    ]);

    revalidatePath(`/dashboard/profile`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar perfil." };
  }
}
