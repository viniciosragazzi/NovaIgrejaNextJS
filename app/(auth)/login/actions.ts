"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginResponse = {
  error?: string;
} | null;

export async function loginAction(prevState: LoginResponse, formData: FormData): Promise<LoginResponse> {
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
        // O Better Auth retorna erros claros como "Invalid email or password"
        return { error: "E-mail ou senha incorretos." };
    }

    // O plugin nextCookies cuida do Set-Cookie automaticamente aqui
    redirect("/dashboard");
}
