import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import { PublicPageShell } from "../components/public-page-shell"

export default async function NoticesPage({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    select: {
      name: true,
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
  const notices = customization.interacaoPublica.noticeBoard.filter((notice) => notice.published)

  return (
    <PublicPageShell
      churchLabel={churchLabel}
      title="Quadro de Avisos"
      description={`Avisos e comunicados publicos de ${church.name}.`}
    >
      <div className="space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice.id} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">{notice.title}</h2>
                  {notice.tag ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{notice.tag}</p> : null}
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/72">{notice.content}</p>
              {notice.ctaLabel && notice.ctaUrl ? (
                <a href={notice.ctaUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium text-white underline underline-offset-4">
                  {notice.ctaLabel}
                </a>
              ) : null}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/12 p-6 text-sm text-white/60">
            Nenhum aviso publicado no momento.
          </div>
        )}
      </div>
    </PublicPageShell>
  )
}
