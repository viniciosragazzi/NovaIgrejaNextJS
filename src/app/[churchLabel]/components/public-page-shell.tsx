import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"

export function PublicPageShell({
  churchLabel,
  title,
  description,
  children,
}: {
  churchLabel: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto w-full max-w-3xl max-sm:max-w-[300px]  px-4 py-6 sm:px-6">
        <Link
          href={`/${churchLabel}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/72 no-underline hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para a home
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-[#061223] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.4)] sm:p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
            {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">{description}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
