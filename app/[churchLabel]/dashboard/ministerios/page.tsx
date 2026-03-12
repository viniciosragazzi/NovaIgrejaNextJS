import { getChurchContext } from "@/lib/get-church-context";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import MinistriesPage from "./ministerios-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church } = await getChurchContext(churchLabel);

  if (!isStaff) {
    redirect(`/${churchLabel}/dashboard`);
  }

  // 1. Busca os ministérios (equipes) desta igreja
  const dbMinistries = await prisma.ministry.findMany({
    where: { churchId: church.id },
    orderBy: { name: "asc" },
  });

  // 2. Busca as pessoas que podem ser voluntários
  const dbPeople = await prisma.person.findMany({
    where: { churchId: church.id },
    orderBy: { name: "asc" },
  });

  // 3. Busca as escalas atuais incluindo os dados da pessoa vinculada
  const dbSchedules = await prisma.volunteerScale.findMany({
    where: { churchId: church.id },
    include: {
      person: {
        select: {
          name: true,
          contact: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  // Formata os voluntários para o componente
  const formattedVolunteers = dbPeople.map((p) => ({
    id: p.id,
    fullName: p.name,
    whatsapp: p.contact[0] || "",
    type: p.type.toLowerCase() as any,
    ministry: p.ministry || undefined,
    role: p.role || undefined,
  }));

  // Formata as escalas para o componente
  const formattedSchedules = dbSchedules.map((s) => ({
    id: s.id,
    eventDate: s.date.toISOString(),
    eventName: s.eventName || "Evento",
    ministryId: s.ministryId || "",
    role: s.role,
    confirmed: s.confirmed,
    person: {
      fullName: s.person.name,
      whatsapp: s.person.contact[0] || "",
    },
  }));

  return (
    <MinistriesPage
      churchId={church.id}
      isStaff={isStaff}
      ministries={dbMinistries as any}
      volunteers={formattedVolunteers}
      initialSchedules={formattedSchedules}
    />
  );
}
