"use server";

import { ActionResponse } from "@/@types/shared.types";
import { auth } from "@/lib/auth";
import { mapActionError, validateAuthFields } from "@/lib/action-feedback";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginChurchAction(
  churchLabel: string,
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validationError = validateAuthFields({ email, password });

  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return { success: false, error: mapActionError(error, "E-mail ou senha incorretos.") };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      churchId: true,
      youChurch: {
        select: { label: true },
      },
    },
  });

  if (!user?.churchId || !user.youChurch?.label) {
    redirect("/onboarding");
  }

  if (user.youChurch.label !== churchLabel) {
    redirect(`/${user.youChurch.label}/dashboard`);
  }

  redirect(`/${churchLabel}/dashboard`);
}

export async function registerMemberAction(
  churchLabel: string,
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validationError = validateAuthFields({ name, email, password });

  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    const church = await prisma.church.findFirst({
      where: { label: churchLabel },
    });

    if (church && user) {
      await prisma.user.update({
        where: { email },
        data: { churchId: church.id },
      });

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
  } catch (error) {
    console.error(error);
    return { success: false, error: mapActionError(error, "Erro ao criar conta.") };
  }

  redirect(`/${churchLabel}/dashboard`);
}

type VisitorRegistrationInput = {
  name: string;
  phone: string;
  birthDate: string;
  source: string;
};

export async function registerVisitorAction(
  churchLabel: string,
  data: VisitorRegistrationInput
): Promise<ActionResponse<{ id: string }>> {
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    select: { id: true },
  });

  if (!church) {
    return { success: false, error: "Igreja não encontrada." };
  }

  try {
    const visitor = await prisma.person.create({
      data: {
        name: data.name,
        contact: [data.phone],
        birthday: data.birthDate || null,
        type: "VISITOR",
        notes: data.source ? `Origem do contato: ${data.source}` : null,
        churchId: church.id,
        firstVisitAt: new Date(),
      },
      select: { id: true },
    });

    return { success: true, data: visitor };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao registrar visitante." };
  }
}
