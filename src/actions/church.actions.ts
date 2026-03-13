"use server";

import { ActionResponse } from "@/@types/shared.types";
import { ChurchLink } from "@/@types/church.types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ChurchProfileSchemaData } from "@/lib/validations";
import { Prisma } from "@prisma/generated/prisma/client";

export async function updateChurchProfileAction(
  churchId: string,
  data: ChurchProfileSchemaData,
  links: Partial<ChurchLink>[]
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    !session ||
    session.user.churchId !== churchId ||
    (session.user.status !== "STAFF" && session.user.role !== "ADMIN")
  ) {
    return { success: false, error: "Não autorizado" };
  }

  try {
    await prisma.$transaction([
      prisma.church.update({
        where: { id: churchId },
        data: {
          name: data.name,
          address: data.address,
          customization: data.customization as Prisma.InputJsonValue,
          pixCopyPaste:
            data.customization.doacoes.qrCodePix || undefined,
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
