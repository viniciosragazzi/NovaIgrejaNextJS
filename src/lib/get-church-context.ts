import type { PermissionModuleKey } from "@/@types/church.types"
import { auth } from "@/lib/auth";
import { getChurchModuleAccess, isPlatformAdmin, isStaffUser } from "@/lib/authorization";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function getOptionalSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getChurchContext(
  churchLabel: string,
  options?: { allowIncompleteMemberOnboarding?: boolean; requiredModule?: PermissionModuleKey }
) {
  const session = await getOptionalSession();

  if (!session) {
    redirect(`/${churchLabel}/login`);
  }

  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    include: {
      _count: {
        select: { persons: true },
      },
    },
  });

  if (!church) {
    notFound();
  }

  const platformAdmin = isPlatformAdmin(session.user)

  if (!platformAdmin && session.user.churchId !== church.id) {
    const userChurch = await prisma.church.findUnique({
      where: { id: session.user.churchId ?? "" },
      select: { label: true },
    });

    redirect(userChurch ? `/${userChurch.label}/dashboard` : "/onboarding");
  }

  const isStaff = platformAdmin || isStaffUser(session.user)
  const moduleAccess = getChurchModuleAccess(session.user, church.customization)
  const hasAdministrativeAccess = Object.values(moduleAccess).some(Boolean)

  if (options?.requiredModule && !moduleAccess[options.requiredModule]) {
    redirect(`/${churchLabel}/dashboard`)
  }

  if (!isStaff && !hasAdministrativeAccess && !options?.allowIncompleteMemberOnboarding) {
    const memberProfile = await prisma.person.findFirst({
      where: {
        churchId: church.id,
        email: session.user.email,
      },
      select: {
        onboardingCompletedAt: true,
      },
    })

    if (!memberProfile?.onboardingCompletedAt) {
      redirect(`/${churchLabel}/welcome`)
    }
  }

  return {
    church,
    user: session.user,
    isStaff,
    isPlatformAdmin: platformAdmin,
    moduleAccess,
  };
}
