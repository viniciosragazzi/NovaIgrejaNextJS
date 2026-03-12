"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Definimos o tipo para o estado da action
export type ActionResponse = {
  error?: string;
} | null;

import { Prisma } from "@prisma/generated/prisma/client";

export async function createChurchAction(
  prevState: ActionResponse, // OBRIGATÓRIO para o useActionState
  formData: FormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const name = formData.get("name") as string;
  const label = formData.get("label") as string;
  const address = formData.get("address") as string;

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Criar a Igreja
      const newChurch = await tx.church.create({
        data: {
          name,
          label,
          address,
          contact: [], // Adicionado para satisfazer o schema
        },
      });

      // 2. Criar a pessoa vinculada como STAFF
      await tx.person.create({
        data: {
          name: session.user.name,
          email: session.user.email,
          type: "STAFF",
          churchId: newChurch.id,
          contact: [],
        }
      });


      // 3. Atualizar o Usuário
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          churchId: newChurch.id,
          status: "STAFF" as any
        },
      });

      return newChurch;
    });

    // Se tudo deu certo, redirecionamos para fora do try/catch
    // (Redirect dentro de try/catch no Next.js pode causar erros de 'NEXT_REDIRECT')
    if (result) {
      redirect(`/${result.label}/dashboard`);
    }

  } catch (error: any) {
    // Tratamento de erro de label duplicado do Prisma (P2002)
    if (error.code === 'P2002') {
      return { error: "Este endereço (URL) já está em uso por outra igreja." };
    }
    // Verificamos se é um erro de redirect (que não deve ser capturado como erro real)
    if (error.message === 'NEXT_REDIRECT') throw error;

    return { error: "Ocorreu um erro ao configurar sua igreja." };
  }

  return null;
}
