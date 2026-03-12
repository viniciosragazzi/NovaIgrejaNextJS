// app/[churchLabel]/dashboard/members/page.tsx
import { getChurchContext } from "@/lib/get-church-context";
import { redirect } from "next/navigation";
import MembersPage from "./members-page";
import prisma from "@/lib/prisma";

import { Person, PersonType } from "@/@types/person.types";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church } = await getChurchContext(churchLabel);

  if (!isStaff) {
    redirect(`/${churchLabel}/dashboard`);
  }

  // Busca as pessoas reais vinculadas a esta igreja
  const dbPeople = await prisma.person.findMany({
    where: { churchId: church.id },
    orderBy: { createdAt: "desc" },
  });

  // Mapeia os dados do banco para o formato esperado pelo componente (opcional, dependendo do seu Person type)
  const formattedPeople: Person[] = dbPeople.map(p => ({
    id: p.id,
    fullName: p.name,
    whatsapp: p.contact[0] || "",
    email: p.email || undefined,
    address: p.address || undefined,
    birthDate: p.birthday || undefined,
    type: p.type.toLowerCase() as PersonType,
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
