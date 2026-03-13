import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import { PublicPageShell } from "../components/public-page-shell"
import { PublicPrayerPage } from "../components/public-prayer-page"

export default async function PrayerPage({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    select: {
      customization: true,
      ministries: {
        select: { id: true, name: true, description: true },
      },
    },
  })

  if (!church) {
    notFound()
  }

  const customization = normalizeChurchCustomization(church.customization, church.ministries)

  return (
    <PublicPageShell
      churchLabel={churchLabel}
      title="Pedido de Oracao"
      description="Envie seu pedido em uma pagina dedicada. A equipe da igreja podera acompanhar internamente."
    >
      <PublicPrayerPage
        churchLabel={churchLabel}
        intro={customization.interacaoPublica.prayerRequestIntro}
        successMessage={customization.interacaoPublica.prayerRequestSuccessMessage}
      />
    </PublicPageShell>
  )
}
