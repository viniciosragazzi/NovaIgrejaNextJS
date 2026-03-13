import { Ministry, Schedule } from "@/@types/ministry.types";
import { Person, PersonType } from "@/@types/person.types";
import { getChurchContext } from "@/lib/get-church-context";
import prisma from "@/lib/prisma";
import MinistriesPage from "./ministerios-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church, user } = await getChurchContext(churchLabel);

  const [dbMinistries, memberPerson] = await Promise.all([
    prisma.ministry.findMany({
      where: { churchId: church.id },
      orderBy: { name: "asc" },
    }),
    isStaff
      ? Promise.resolve(null)
      : prisma.person.findFirst({
          where: {
            churchId: church.id,
            email: user.email,
          },
          select: {
            id: true,
          },
        }),
  ]);

  const [dbPeople, dbSchedules] = await Promise.all([
    prisma.person.findMany({
      where: {
        churchId: church.id,
        ...(isStaff ? {} : { id: memberPerson?.id ?? "__no-person__" }),
      },
      orderBy: { name: "asc" },
    }),
    prisma.volunteerScale.findMany({
      where: {
        churchId: church.id,
        ...(isStaff ? {} : { personId: memberPerson?.id ?? "__no-person__" }),
      },
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
    }),
  ]);

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
    responseStatus: schedule.responseStatus.toLowerCase() as Schedule["responseStatus"],
    responseNote: schedule.responseNote || undefined,
    respondedAt: schedule.respondedAt?.toISOString(),
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
      churchLabel={churchLabel}
      ministries={dbMinistries as unknown as Ministry[]}
      volunteers={formattedVolunteers}
      initialSchedules={formattedSchedules}
    />
  );
}
