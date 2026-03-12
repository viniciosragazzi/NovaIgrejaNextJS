"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/@types/shared.types";

export async function loginChurchAction(
  churchLabel: string,
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error: any) {
    return { success: false, error: "E-mail ou senha incorretos." };
  }

  redirect(`/${churchLabel}/dashboard`);
}

export async function registerMemberAction(
  churchLabel: string,
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Cria o usuário no Better Auth
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    // 2. Busca a igreja
    const church = await prisma.church.findFirst({
      where: { label: churchLabel },
    });

    if (church && user) {
      // 3. Vincula o usuário à igreja (se o better auth permitir ou via prisma)
      // No seu schema, o User tem churchId
      await prisma.user.update({
        where: { email },
        data: { churchId: church.id },
      });

      // 4. Cria a pessoa (Person) como membro
      await prisma.person.create({
        data: {
          name,
          email,
          contact: [],
          type: "MEMBER",
          churchId: church.id,
        },
      });
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Erro ao criar conta." };
  }

  redirect(`/${churchLabel}/dashboard`);
}
