"use server";

import { ActionResponse } from "@/@types/shared.types";
import { PermissionStatusKey } from "@/@types/church.types";
import { PersonFormData } from "@/@types/person.types";
import { requireChurchModuleSession, requireChurchStaffSession } from "@/lib/authorization";
import { applyJourneyTrigger } from "@/lib/member-journey";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma, TypePerson } from "@prisma/generated/prisma/client";

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
  const session = await requireChurchModuleSession(churchId, "membros");
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const person = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (data.type === "volunteer" && data.ministry) {
        await tx.ministry.upsert({
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

      const createdPerson = await tx.person.create({
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

      if (createdPerson.name && createdPerson.contact[0]) {
        await applyJourneyTrigger(tx, churchId, createdPerson.id, "PROFILE_COMPLETED");
      }

      if (data.firstVisitDate) {
        await applyJourneyTrigger(tx, churchId, createdPerson.id, "FIRST_ATTENDANCE");
      }

      if (data.type === "volunteer" || data.ministry) {
        await applyJourneyTrigger(tx, churchId, createdPerson.id, "JOINED_MINISTRY");
      }

      return createdPerson;
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
  const session = await requireChurchModuleSession(churchId, "membros");
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

    const person = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (data.type === "volunteer" && data.ministry) {
        await tx.ministry.upsert({
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

      const updatedPerson = await tx.person.update({
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

      if (updatedPerson.name && updatedPerson.contact[0]) {
        await applyJourneyTrigger(tx, churchId, updatedPerson.id, "PROFILE_COMPLETED");
      }

      if (data.firstVisitDate) {
        await applyJourneyTrigger(tx, churchId, updatedPerson.id, "FIRST_ATTENDANCE");
      }

      if (data.type === "volunteer" || data.ministry) {
        await applyJourneyTrigger(tx, churchId, updatedPerson.id, "JOINED_MINISTRY");
      }

      return updatedPerson;
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
  const session = await requireChurchModuleSession(churchId, "membros");
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

export async function updatePersonAccessStatusAction(
  churchId: string,
  personId: string,
  nextStatus: PermissionStatusKey
): Promise<ActionResponse<{ personId: string; status: PermissionStatusKey }>> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const person = await prisma.person.findFirst({
      where: { id: personId, churchId },
      select: { id: true, email: true, name: true },
    });

    if (!person) {
      return { success: false, error: "Pessoa nao encontrada." };
    }

    if (!person.email) {
      return { success: false, error: "Esta pessoa nao possui e-mail vinculado a uma conta." };
    }

    const user = await prisma.user.findFirst({
      where: {
        churchId,
        email: person.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return { success: false, error: "Nenhuma conta vinculada foi encontrada para esta pessoa." };
    }

    if (user.id === session.user.id) {
      return { success: false, error: "Voce nao pode alterar o proprio status por esta tela." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: nextStatus,
      },
    });

    await revalidateChurchPeopleRoutes(churchId);
    return {
      success: true,
      data: {
        personId,
        status: nextStatus,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Nao foi possivel atualizar o status de acesso." };
  }
}
