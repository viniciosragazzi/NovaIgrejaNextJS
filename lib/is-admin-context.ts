import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export async function isAdminContext() {
  // 1. Pega a sessão do usuário logado
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // 2. Se não estiver logado, manda pro login
  if (!session) {
    redirect(`/login`);
  }
  const user = session.user;
  // 3. Verifica se o usuário é admin
  if (user.role !== "ADMIN") {
    notFound();
  }

  return {
    user,
  };
}
