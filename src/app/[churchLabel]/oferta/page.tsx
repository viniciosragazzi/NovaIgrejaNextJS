import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import { PublicPageShell } from "../components/public-page-shell"
import { PublicOfferingPage } from "../components/public-offering-page"

export default async function OfferingPage({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    select: {
      pixKeyValue: true,
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
      title="Oferta"
      description="Escolha o valor e gere um PIX com o montante ja preenchido."
    >
      {church.pixKeyValue && customization.doacoes.exibirPublicamente && customization.doacoes.doacoesAtivas ? (
        <PublicOfferingPage
          churchLabel={churchLabel}
          intro={customization.interacaoPublica.publicOfferingIntro}
          pixKeyValue={church.pixKeyValue}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-white/12 p-6 text-sm text-white/60">
          A igreja ainda nao configurou uma chave PIX publica para receber ofertas.
        </div>
      )}
    </PublicPageShell>
  )
}
