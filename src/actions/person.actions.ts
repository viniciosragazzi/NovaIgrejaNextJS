"use server";

import { ActionResponse } from "@/@types/shared.types";
import { PersonFormData } from "@/@types/person.types";
import { requireChurchStaffSession } from "@/lib/authorization";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TypePerson } from "@prisma/generated/prisma/client";

async function getChurchLabel(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  });

  return church?.label;
}

function toPersonPayload(person: {
  id: string;
  name: string;
  email: string | null;
  contact: string[];
  address: string | null;
  birthday: string | null;
  type: TypePerson;
  ministry: string | null;
  role: string | null;
  notes: string | null;
  firstVisitAt: Date | null;
}) {
  return {
    id: person.id,
    fullName: person.name,
    whatsapp: person.contact[0] || "",
    email: person.email || "",
    address: person.address || "",
    birthDate: person.birthday || "",
    firstVisitDate: person.firstVisitAt?.toISOString().split("T")[0] || "",
    type: person.type.toLowerCase(),
    ministry: person.ministry || "",
    role: person.role || "",
    notes: person.notes || "",
  };
}

type PersonActionResponse = ActionResponse<ReturnType<typeof toPersonPayload>>;

function mapPersonType(type: PersonFormData["type"]) {
  const typeMap: Record<PersonFormData["type"], TypePerson> = {
    member: TypePerson.MEMBER,
    visitor: TypePerson.VISITOR,
    volunteer: TypePerson.VOLUNTEER,
  };

  return typeMap[type];
}

async function revalidateChurchPeopleRoutes(churchId: string) {
  const churchLabel = await getChurchLabel(churchId);
  if (!churchLabel) {
    return;
  }

  revalidatePath(`/${churchLabel}/dashboard/members`);
  revalidatePath(`/${churchLabel}/dashboard/ministerios`);
}

export async function createPersonAction(
  churchId: string,
  data: PersonFormData
): Promise<PersonActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    if (data.type === "volunteer" && data.ministry) {
      await prisma.ministry.upsert({
        where: {
          name_churchId: {
            name: data.ministry,
            churchId,
          },
        },
        update: {},
        create: {
          name: data.ministry,
          churchId,
          color: "#8ee4af",
          icon: "users",
        },
      });
    }

    const person = await prisma.person.create({
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: mapPersonType(data.type),
        churchId,
        ministry: data.type === "volunteer" ? data.ministry || null : null,
        role: data.type === "volunteer" ? data.role || null : null,
        notes: data.notes || null,
        firstVisitAt: data.firstVisitDate ? new Date(data.firstVisitDate) : undefined,
      },
    });

    await revalidateChurchPeopleRoutes(churchId);
    return { success: true, data: toPersonPayload(person) };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao cadastrar pessoa." };
  }
}

export async function updatePersonAction(
  churchId: string,
  personId: string,
  data: PersonFormData
): Promise<PersonActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const existingPerson = await prisma.person.findFirst({
      where: { id: personId, churchId },
      select: { id: true },
    });

    if (!existingPerson) {
      return { success: false, error: "Pessoa nao encontrada." };
    }

    if (data.type === "volunteer" && data.ministry) {
      await prisma.ministry.upsert({
        where: {
          name_churchId: {
            name: data.ministry,
            churchId,
          },
        },
        update: {},
        create: {
          name: data.ministry,
          churchId,
          color: "#8ee4af",
          icon: "users",
        },
      });
    }

    const person = await prisma.person.update({
      where: { id: personId },
      data: {
        name: data.fullName,
        email: data.email || null,
        contact: [data.whatsapp],
        birthday: data.birthDate || null,
        address: data.address || null,
        type: mapPersonType(data.type),
        ministry: data.type === "volunteer" ? data.ministry || null : null,
        role: data.type === "volunteer" ? data.role || null : null,
        notes: data.notes || null,
        firstVisitAt: data.firstVisitDate ? new Date(data.firstVisitDate) : null,
      },
    });

    await revalidateChurchPeopleRoutes(churchId);
    return { success: true, data: toPersonPayload(person) };
  } catch (error) {
    console.error("ERRO AO ATUALIZAR:", error);
    return { success: false, error: "Falha tecnica ao atualizar." };
  }
}

export async function deletePersonAction(
  churchId: string,
  personId: string
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const existingPerson = await prisma.person.findFirst({
      where: { id: personId, churchId },
      select: { id: true },
    });

    if (!existingPerson) {
      return { success: false, error: "Pessoa nao encontrada." };
    }

    await prisma.person.delete({
      where: { id: personId },
    });

    await revalidateChurchPeopleRoutes(churchId);
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao excluir registro." };
  }
}
