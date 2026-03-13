"use server";

import type { ChurchOnboardingFormData, MemberOnboardingFormData } from "@/lib/validations";
import type { MemberOnboardingDraft } from "@/@types/onboarding.types";
import { createDefaultChurchCustomization } from "@/lib/church-customization";
import { applyJourneyTrigger } from "@/lib/member-journey";
import { buildPersonMatchWhere, formatPhone } from "@/lib/person-linking";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { DayOfWeek, Prisma, TypePerson } from "@prisma/generated/prisma/client";

export type OnboardingActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

const dayMap: Record<ChurchOnboardingFormData["schedules"][number]["dayOfWeek"], DayOfWeek> = {
  sunday: DayOfWeek.DOMINGO,
  monday: DayOfWeek.SEGUNDA,
  tuesday: DayOfWeek.TERCA,
  wednesday: DayOfWeek.QUARTA,
  thursday: DayOfWeek.QUINTA,
  friday: DayOfWeek.SEXTA,
  saturday: DayOfWeek.SABADO,
};

async function getSessionOrError() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Sessao expirada. Faca login novamente." } as const;
  }

  return { session } as const;
}

export async function submitChurchOnboardingAction(
  data: ChurchOnboardingFormData
): Promise<OnboardingActionResponse<{ churchLabel: string }>> {
  const authResult = await getSessionOrError();
  if ("error" in authResult) {
    return { success: false, error: authResult.error };
  }

  if (authResult.session.user.churchId) {
    return { success: false, error: "Sua conta ja esta vinculada a uma igreja." };
  }

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const customization = createDefaultChurchCustomization();

      customization.identidadeVisual.logoPrincipal.url = data.branding.logoUrl || "";
      customization.identidadeVisual.imagemCapa.url = data.branding.coverUrl || "";
      customization.identidadeVisual.corPrimaria = data.branding.primaryColor;
      customization.identidadeVisual.corSecundaria = data.branding.secondaryColor;
      customization.informacoesInstitucionais.descricao = data.basicInfo.description || "";
      customization.informacoesInstitucionais.denominacao = data.basicInfo.denomination || "";
      customization.informacoesInstitucionais.pastorPrincipal = data.basicInfo.pastorName || "";
      customization.localizacao.endereco = data.location.address || "";
      customization.localizacao.cidade = data.location.city || "";
      customization.localizacao.estado = data.location.state || "";
      customization.localizacao.pais = data.location.country || "";
      customization.doacoes.qrCodePix = data.donations.pixCopyPaste || "";

      const newChurch = await tx.church.create({
        data: {
          name: data.basicInfo.churchName,
          label: data.basicInfo.slug,
          address: data.location.address || "",
          contact: [],
          pixKeyValue: data.donations.skip ? null : data.donations.pixKey,
          pixCopyPaste: data.donations.skip ? null : data.donations.pixCopyPaste || null,
          customization: customization as unknown as Prisma.InputJsonValue,
        },
      });

      if (data.schedules.length > 0) {
        await tx.weeklySchedule.createMany({
          data: data.schedules.map((schedule) => ({
            churchId: newChurch.id,
            title: schedule.title,
            dayOfWeek: dayMap[schedule.dayOfWeek],
            time: schedule.time,
          })),
        });
      }

      await tx.person.create({
        data: {
          name: authResult.session.user.name,
          email: authResult.session.user.email,
          type: "STAFF",
          churchId: newChurch.id,
          contact: [],
          onboardingCompletedAt: new Date(),
        },
      });

      await tx.user.update({
        where: { id: authResult.session.user.id },
        data: {
          churchId: newChurch.id,
          status: TypePerson.STAFF,
        },
      });

      return newChurch;
    });

    return {
      success: true,
      data: {
        churchLabel: result.label,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Este endereco ja esta em uso por outra igreja." };
    }

    console.error(error);
    return { success: false, error: "Nao foi possivel concluir a configuracao da igreja." };
  }
}

export async function saveMemberOnboardingDraftAction(
  churchId: string,
  draft: MemberOnboardingDraft
): Promise<OnboardingActionResponse> {
  const authResult = await getSessionOrError();
  if ("error" in authResult) {
    return { success: false, error: authResult.error };
  }

  if (authResult.session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." };
  }

  try {
    const existingProfile = await prisma.person.findFirst({
      where: buildPersonMatchWhere(churchId, {
        email: authResult.session.user.email,
        phone: draft.profile.phone,
      }),
      select: { id: true },
    })

    if (existingProfile) {
      await prisma.person.update({
        where: { id: existingProfile.id },
        data: {
          onboardingDraft: draft as Prisma.InputJsonValue,
        },
      })
    } else {
      await prisma.person.create({
        data: {
          churchId,
          email: authResult.session.user.email,
          name: draft.profile.fullName || authResult.session.user.name,
          contact: draft.profile.phone ? [formatPhone(draft.profile.phone)] : [],
          birthday: draft.profile.birthDate || null,
          profileImage: draft.profile.profileImage || null,
          onboardingDraft: draft as Prisma.InputJsonValue,
          type: "MEMBER",
        },
      })
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Nao foi possivel salvar seu progresso." };
  }
}

export async function completeMemberOnboardingAction(
  churchId: string,
  data: MemberOnboardingFormData
): Promise<OnboardingActionResponse> {
  const authResult = await getSessionOrError();
  if ("error" in authResult) {
    return { success: false, error: authResult.error };
  }

  if (authResult.session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const existingProfile = await tx.person.findFirst({
        where: buildPersonMatchWhere(churchId, {
          email: authResult.session.user.email,
          phone: data.profile.phone,
        }),
        select: { id: true },
      })

      const personPayload = {
        name: data.profile.fullName,
        contact: data.profile.phone ? [formatPhone(data.profile.phone)] : [],
        birthday: data.profile.birthDate || null,
        profileImage: data.profile.profileImage || null,
        ministry: data.interests.ministries.join(", ") || null,
        role: data.interests.areas.join(", ") || null,
        notes: JSON.stringify({
          skills: data.interests.skills,
          preferences: data.communication,
        }),
        onboardingDraft: data as Prisma.InputJsonValue,
        onboardingCompletedAt: new Date(),
      }

      if (existingProfile) {
        await tx.person.update({
          where: { id: existingProfile.id },
          data: personPayload,
        })
      } else {
        await tx.person.create({
          data: {
            churchId,
            email: authResult.session.user.email,
            type: "MEMBER",
            ...personPayload,
          },
        })
      }

      const person = await tx.person.findFirst({
        where: buildPersonMatchWhere(churchId, {
          email: authResult.session.user.email,
          phone: data.profile.phone,
        }),
        select: { id: true },
      })

      if (person) {
        await applyJourneyTrigger(tx, churchId, person.id, "PROFILE_COMPLETED")
        await applyJourneyTrigger(tx, churchId, person.id, "ONBOARDING_COMPLETED")
      }

      await tx.user.update({
        where: { id: authResult.session.user.id },
        data: {
          name: data.profile.fullName,
          image: data.profile.profileImage || null,
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Nao foi possivel concluir seu primeiro acesso." };
  }
}
