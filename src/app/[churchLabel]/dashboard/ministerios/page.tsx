import { Ministry, Schedule } from "@/@types/ministry.types";
import { Person, PersonType } from "@/@types/person.types";
import { getChurchContext } from "@/lib/get-church-context";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import MinistriesPage from "./ministerios-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church } = await getChurchContext(churchLabel);

  if (!isStaff) {
    redirect(`/${churchLabel}/dashboard`);
  }

  const dbMinistries = await prisma.ministry.findMany({
    where: { churchId: church.id },
    orderBy: { name: "asc" },
  });

  const dbPeople = await prisma.person.findMany({
    where: { churchId: church.id },
    orderBy: { name: "asc" },
  });

  const dbSchedules = await prisma.volunteerScale.findMany({
    where: { churchId: church.id },
    include: {
      person: {
        select: {
          id: true,
          name: true,
          contact: true,
          email: true,
          address: true,
          birthday: true,
          notes: true,
          ministry: true,
          role: true,
          type: true,
        },
      },
      ministry: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  const formattedVolunteers: Person[] = dbPeople.map((person) => ({
    id: person.id,
    fullName: person.name,
    whatsapp: person.contact[0] || "",
    email: person.email || undefined,
    address: person.address || undefined,
    birthDate: person.birthday || undefined,
    type: person.type.toLowerCase() as PersonType,
    ministry: person.ministry || undefined,
    role: person.role || undefined,
    notes: person.notes || undefined,
  }));

  const formattedSchedules: Schedule[] = dbSchedules.map((schedule) => ({
    id: schedule.id,
    eventDate: schedule.date.toISOString(),
    eventName: schedule.eventName || "Evento",
    ministryId: schedule.ministryId,
    ministryName: schedule.ministry.name,
    role: schedule.role,
    confirmed: schedule.confirmed,
    person: {
      id: schedule.person.id,
      fullName: schedule.person.name,
      whatsapp: schedule.person.contact[0] || "",
      email: schedule.person.email || undefined,
      address: schedule.person.address || undefined,
      birthDate: schedule.person.birthday || undefined,
      notes: schedule.person.notes || undefined,
      ministry: schedule.person.ministry || undefined,
      role: schedule.person.role || undefined,
      type: schedule.person.type.toLowerCase() as PersonType,
    },
  }));

  return (
    <MinistriesPage
      churchId={church.id}
      isStaff={isStaff}
      ministries={dbMinistries as unknown as Ministry[]}
      volunteers={formattedVolunteers}
      initialSchedules={formattedSchedules}
    />
  );
}
