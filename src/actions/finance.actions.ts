"use server";

import { ActionResponse } from "@/@types/shared.types";
import { requireChurchStaffSession } from "@/lib/authorization";
import { ManualIncomeFormData, PixConfigFormData } from "@/lib/validations";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EntryType } from "@prisma/generated/prisma/client";

async function getChurchLabel(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  });

  return church?.label;
}

async function revalidateFinanceRoute(churchId: string) {
  const churchLabel = await getChurchLabel(churchId);
  if (churchLabel) {
    revalidatePath(`/${churchLabel}/dashboard/financeiro`);
  }
}

export async function registerIncomeAction(
  churchId: string,
  data: ManualIncomeFormData
): Promise<ActionResponse<{ id: string } & ManualIncomeFormData>> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const entry = await prisma.financialEntry.create({
      data: {
        amount: data.amount,
        category: data.category,
        type: EntryType.INCOME,
        date: new Date(data.date),
        donorName: data.donorName || null,
        description: data.description || null,
        churchId,
      },
      select: {
        id: true,
        amount: true,
        category: true,
        date: true,
        donorName: true,
        description: true,
      },
    });

    await revalidateFinanceRoute(churchId);

    return {
      success: true,
      data: {
        id: entry.id,
        amount: entry.amount,
        category: entry.category as ManualIncomeFormData["category"],
        date: entry.date.toISOString().split("T")[0],
        donorName: entry.donorName || "",
        description: entry.description || "",
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao registrar entrada no banco." };
  }
}

export async function updatePixConfigAction(
  churchId: string,
  data: PixConfigFormData
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const copyPasteCode =
      data.copyPasteCode || `00020126580014br.gov.bcb.pix0136${data.pixKeyValue}`;

    await prisma.church.update({
      where: { id: churchId },
      data: {
        pixKeyType: data.pixKeyType,
        pixKeyValue: data.pixKeyValue,
        pixCopyPaste: copyPasteCode,
      },
    });

    await revalidateFinanceRoute(churchId);
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao salvar configuracao PIX." };
  }
}

export async function deleteIncomeAction(
  churchId: string,
  incomeId: string
): Promise<ActionResponse> {
  const session = await requireChurchStaffSession(churchId);
  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    const existingIncome = await prisma.financialEntry.findFirst({
      where: { id: incomeId, churchId },
      select: { id: true },
    });

    if (!existingIncome) {
      return { success: false, error: "Entrada nao encontrada." };
    }

    await prisma.financialEntry.delete({
      where: { id: incomeId },
    });

    await revalidateFinanceRoute(churchId);
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao excluir entrada." };
  }
}
