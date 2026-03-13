import { auth } from "@/lib/auth";
import { isStaffUser } from "@/lib/authorization";
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
  options?: { allowIncompleteMemberOnboarding?: boolean }
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

  if (session.user.churchId !== church.id) {
    const userChurch = await prisma.church.findUnique({
      where: { id: session.user.churchId ?? "" },
      select: { label: true },
    });

    redirect(userChurch ? `/${userChurch.label}/dashboard` : "/onboarding");
  }

  const isStaff = isStaffUser(session.user)

  if (!isStaff && !options?.allowIncompleteMemberOnboarding) {
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
  };
}
