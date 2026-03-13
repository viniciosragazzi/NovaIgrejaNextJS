// app/[churchLabel]/dashboard/members/page.tsx
import { PermissionStatusKey } from "@/@types/church.types";
import { getChurchContext } from "@/lib/get-church-context";
import MembersPage from "./members-page";
import prisma from "@/lib/prisma";

import { Person, PersonType } from "@/@types/person.types";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church } = await getChurchContext(churchLabel, { requiredModule: "membros" });

  // Busca as pessoas reais vinculadas a esta igreja
  const dbPeople = await prisma.person.findMany({
    where: { churchId: church.id },
    orderBy: { createdAt: "desc" },
  });
  const churchUsers = await prisma.user.findMany({
    where: { churchId: church.id },
    select: {
      email: true,
      status: true,
    },
  });
  const userByEmail = new Map(
    churchUsers
      .filter((user) => Boolean(user.email))
      .map((user) => [user.email.toLowerCase(), user])
  );

  // Mapeia os dados do banco para o formato esperado pelo componente (opcional, dependendo do seu Person type)
  const formattedPeople: Person[] = dbPeople.map(p => ({
    ...(p.email && userByEmail.get(p.email.toLowerCase())
      ? {
          accessStatus: (userByEmail.get(p.email.toLowerCase())?.status || "MEMBER") as PermissionStatusKey,
          hasLinkedUser: true,
        }
      : {
          hasLinkedUser: false,
        }),
    id: p.id,
    fullName: p.name,
    whatsapp: p.contact[0] || "",
    email: p.email || undefined,
    address: p.address || undefined,
    birthDate: p.birthday || undefined,
    type: (p.type === "STAFF" ? "member" : p.type.toLowerCase()) as PersonType,
    ministry: p.ministry || undefined,
    role: p.role || undefined,
    notes: p.notes || undefined,
  }));

  return (
    <MembersPage
      isStaff={isStaff}
      churchId={church.id}
      initialData={formattedPeople}
    />
  );
}
