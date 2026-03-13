"use server";

import { ChurchLink } from "@/@types/church.types";
import { ActionResponse } from "@/@types/shared.types";
import { requireChurchModuleSession } from "@/lib/authorization";
import prisma from "@/lib/prisma";
import { ChurchProfileSchemaData } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/generated/prisma/client";

export async function updateChurchProfileAction(
  churchId: string,
  data: ChurchProfileSchemaData,
  links: Partial<ChurchLink>[]
): Promise<ActionResponse> {
  const session = await requireChurchModuleSession(churchId, "perfil");

  if (!session) {
    return { success: false, error: "Nao autorizado" };
  }

  try {
    await prisma.$transaction([
      prisma.church.update({
        where: { id: churchId },
        data: {
          name: data.name,
          address: data.address,
          customization: data.customization as Prisma.InputJsonValue,
          pixCopyPaste: data.customization.doacoes.qrCodePix || undefined,
        },
      }),
      prisma.churchLink.deleteMany({ where: { churchId } }),
      prisma.churchLink.createMany({
        data: links
          .filter((link) => link.title && link.url)
          .map((link, index) => ({
            title: link.title || "",
            url: link.url || "",
            churchId,
            order: index,
            icon: link.title?.toLowerCase() || "",
          })),
      }),
    ]);

    const church = await prisma.church.findUnique({
      where: { id: churchId },
      select: { label: true },
    });

    if (church?.label) {
      revalidatePath(`/${church.label}`);
      revalidatePath(`/${church.label}/dashboard/profile`);
      revalidatePath(`/${church.label}/dashboard/financeiro`);
      revalidatePath(`/${church.label}/dashboard`);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar perfil." };
  }
}
