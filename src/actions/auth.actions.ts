"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/@types/shared.types";

export async function loginAction(
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

  redirect("/dashboard");
}

export async function registerAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error: any) {
    return { success: false, error: "Erro ao criar conta. Verifique os dados." };
  }

  redirect("/onboarding");
}
