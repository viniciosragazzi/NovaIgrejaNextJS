import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export async function getChurchContext(churchLabel: string) {
  // 1. Pega a sessão do usuário logado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Se não estiver logado, manda pro login daquela igreja
  if (!session) {
    redirect(`/${churchLabel}/login`);
  }

  // 3. Busca a igreja e verifica se o usuário pertence a ela
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    include: {
      _count: {
        select: { persons: true } // Exemplo: já traz contagem de membros
      }
    }
  });

  // 4. Validações de segurança (Tenant Isolation)
  if (!church) {
    notFound();
  }

  if (session.user.churchId !== church.id) {
    // Se o cara tentar entrar em outra igreja, manda ele de volta pra dele
    const userChurch = await prisma.church.findUnique({
      where: { id: session.user.churchId ?? "" },
      select: { label: true }
    });

    redirect(userChurch ? `/${userChurch.label}/dashboard` : "/onboarding");
  }

  // 5. Retorna tudo o que a página vai precisar
  return {
    church,
    user: session.user,
    // Você pode adicionar permissões aqui no futuro:
    isStaff: session.user.status   === "STAFF"
  };
}
