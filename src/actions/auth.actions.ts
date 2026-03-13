"use server";

import { ActionResponse } from "@/@types/shared.types";
import { auth } from "@/lib/auth";
import { mapActionError, validateAuthFields } from "@/lib/action-feedback";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAction(
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

  redirect(`/${user.youChurch.label}/dashboard`);
}

export async function registerAction(
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
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    return { success: false, error: mapActionError(error, "Erro ao criar conta. Verifique os dados.") };
  }

  redirect("/onboarding");
}
