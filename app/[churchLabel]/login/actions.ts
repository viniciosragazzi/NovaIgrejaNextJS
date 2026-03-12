"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export type LoginResponse = { error?: string } | null;

export async function loginChurchAction(
  churchLabel: string, // Recebemos o label da URL [churchLabel]
  prevState: LoginResponse,
  formData: FormData
): Promise<LoginResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Autenticação padrão do Better Auth
    const session = await auth.api.signInEmail({
      body: { email, password },
    });

    if (!session) return { error: "Erro na autenticação." };

    // 2. Validação de Tenant (Multi-tenancy check)
    // Buscamos a igreja pelo label da URL
    const church = await prisma.church.findUnique({
      where: { label: churchLabel }
    });

    // Verificamos se o usuário logado pertence a ESTA igreja
    if (!church || session.user.churchId !== church.id) {
      // Se não pertencer, deslogamos o usuário imediatamente por segurança
      // (Opcional: você pode manter logado mas negar acesso ao painel)
      return { error: "Você não tem permissão para acessar esta igreja." };
    }

  } catch (error: any) {
    return { error: "E-mail ou senha incorretos." };
  }

  // Se tudo estiver OK, redireciona para o dashboard específico
  redirect(`/${churchLabel}/dashboard`);
}

export type RegisterResponse = { error?: string } | null;

// app/[churchLabel]/auth/actions.ts

export async function registerMemberAction(
  churchLabel: string,
  prevState: RegisterResponse,
  formData: FormData
): Promise<RegisterResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    // 1. Validar se a igreja existe
    const church = await prisma.church.findUnique({
      where: { label: churchLabel }
    });

    if (!church) return { error: "Igreja não encontrada." };

    // 2. Criar o Usuário (Auth)
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        churchId: church.id
      },
    });

    // 3. O PULO DO GATO: Criar a "Person" vinculada
    // Usamos um upsert para evitar erros caso a pessoa já tenha sido convidada antes
    await prisma.person.upsert({
      where: {
        email_churchId: {
          email: email,
          churchId: church.id
        }
      },
      update: {
        type: "MEMBER", // Se era visitante, vira membro ao criar conta
        name: name,
      },
      create: {
        name: name,
        email: email,
        type: "MEMBER",
        churchId: church.id,
        contact: [], // Pode ser preenchido se tiver o campo no form
      }
    });

  } catch (error: any) {
    return { error: error.message || "Erro ao criar conta." };
  }

  // 4. Redirecionar para o Dashboard
  redirect(`/${churchLabel}/dashboard`);
}
