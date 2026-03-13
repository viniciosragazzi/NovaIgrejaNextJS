import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getChurchContext } from "@/lib/get-church-context"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import MemberWelcomePage from "./welcome-page"

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params
  const { church, user, isStaff } = await getChurchContext(churchLabel, {
    allowIncompleteMemberOnboarding: true,
  })

  if (isStaff) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const [memberProfile, ministries] = await Promise.all([
    prisma.person.findFirst({
      where: {
        churchId: church.id,
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        contact: true,
        birthday: true,
        profileImage: true,
        onboardingDraft: true,
        onboardingCompletedAt: true,
      },
    }),
    prisma.ministry.findMany({
      where: { churchId: church.id },
      select: { id: true, name: true, description: true },
      orderBy: { name: "asc" },
    }),
  ])

  if (memberProfile?.onboardingCompletedAt) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const customization = normalizeChurchCustomization(church.customization, ministries)

  return (
    <MemberWelcomePage
      churchId={church.id}
      churchLabel={churchLabel}
      churchName={church.name}
      welcomeMessage={
        customization.comunicacao.mensagemBoasVindas ||
        customization.comunicacao.mensagemVisitantes ||
        "Complete seu primeiro acesso para personalizar sua experiencia no app da igreja."
      }
      member={{
        fullName: memberProfile?.name || user.name,
        phone: memberProfile?.contact?.[0] || "",
        birthDate: memberProfile?.birthday || "",
        profileImage: memberProfile?.profileImage || user.image || "",
        draft: memberProfile?.onboardingDraft,
      }}
      ministries={ministries}
    />
  )
}
