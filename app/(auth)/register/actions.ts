"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        status: "MEMBER", // Define o status padrão como MEMBER para novos registros
        // churchId não é enviado aqui, pois será criado no onboarding
      }
    });
  } catch (error: any) {
    return { error: error.message || "Erro ao criar conta." };
  }

  // Após o registro, enviamos para o onboarding para criar a igreja
  redirect("/onboarding");
}
