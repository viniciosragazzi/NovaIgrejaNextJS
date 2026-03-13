import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import {
  Bell,
  BookHeart,
  CalendarDays,
  ChevronDown,
  CirclePlay,
  HandHeart,
  HeartHandshake,
  Images,
  LogIn,
  MapPin,
  MessageSquareHeart,
  Phone,
  ScrollText,
  Shield,
  type LucideIcon,
} from "lucide-react"

interface PageProps {
  params: Promise<{ churchLabel: string }>
}

const dayLabels: Record<string, string> = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda",
  TUESDAY: "Terca",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sabado",
}

type LauncherItem = {
  key: string
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export default async function ChurchWelcomePage({ params }: PageProps) {
  const { churchLabel } = await params

  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    include: {
      links: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      schedules: {
        where: { active: true },
        orderBy: [{ dayOfWeek: "asc" }, { time: "asc" }],
      },
      ministries: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  })

  if (!church) {
    notFound()
  }

  const customization = normalizeChurchCustomization(church.customization, church.ministries)
  const activeSections = new Set(
    customization.paginaPublica.secoes.filter((section) => section.enabled).map((section) => section.key)
  )

  const coverImage =
    customization.identidadeVisual.imagemCapa.url ||
    customization.paginaPublica.galeria[0] ||
    customization.paginaInicial.banners[0] ||
    null

  const accentColor = customization.identidadeVisual.corSecundaria || "#1d9bf0"
  const supportColor = customization.identidadeVisual.corDeApoio || "#6ee7f9"
  const primaryColor = customization.identidadeVisual.corPrimaria || "#0b1220"
  const nextSchedule = church.schedules[0] ?? null
  const primaryContact = church.contact[0] ?? ""
  const memberCount = await prisma.person.count({
    where: {
      churchId: church.id,
      type: { in: ["MEMBER", "VOLUNTEER", "STAFF"] },
    },
  })

  const launcherItems: LauncherItem[] = [
    activeSections.has("sobreAIgreja") && customization.paginaPublica.sobreAIgreja
      ? { key: "sobre", label: "A Igreja", href: "#sobre", icon: Shield }
      : null,
    nextSchedule ? { key: "cultos", label: "Cultos", href: "#cultos", icon: CirclePlay } : null,
    customization.informacoesInstitucionais.descricao || customization.informacoesInstitucionais.historiaDaIgreja
      ? { key: "noticias", label: "Historia", href: "#historia", icon: ScrollText }
      : null,
    church.links.length > 0 ? { key: "links", label: "Conecte-se", href: "#links", icon: BookHeart } : null,
    customization.doacoes.exibirPublicamente && customization.doacoes.doacoesAtivas
      ? { key: "doacoes", label: "Doacoes", href: "#doacoes", icon: HandHeart }
      : null,
    church.schedules.length > 0 ? { key: "agenda", label: "Agenda", href: "#agenda", icon: CalendarDays } : null,
    customization.interacaoPublica.noticeBoard.some((entry) => entry.published)
      ? { key: "avisos", label: "Avisos", href: `/${churchLabel}/avisos`, icon: Bell }
      : null,
    customization.paginaInicial.pedidosDeOracao || customization.interacaoPublica.prayerRequestIntro
      ? { key: "oracao", label: "Oracao", href: `/${churchLabel}/oracao`, icon: MessageSquareHeart }
      : null,
    activeSections.has("contato")
      ? { key: "contato", label: "Contato", href: "#contato", icon: MapPin }
      : null,
    activeSections.has("galeria") && customization.paginaPublica.galeria.length > 0
      ? { key: "galeria", label: "Galeria", href: "#galeria", icon: Images }
      : null,
    { key: "login", label: "Login", href: `/${churchLabel}/login`, icon: LogIn },
    customization.localizacao.linkMaps
      ? { key: "maps", label: "Google Maps", href: customization.localizacao.linkMaps, icon: MapPin, external: true }
      : null,
    customization.doacoes.exibirPublicamente && customization.doacoes.doacoesAtivas
      ? { key: "oferta-publica", label: "Oferta", href: `/${churchLabel}/oferta`, icon: HandHeart }
      : null,
    church.links[0]
      ? { key: "link-destaque", label: church.links[0].title, href: church.links[0].url, icon: HeartHandshake, external: true }
      : null,
  ].filter((item): item is LauncherItem => item !== null)

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="flex min-h-screen w-full flex-col">
        <div className="w-full overflow-hidden bg-[#031120]">
          <section
            className="relative min-h-screen px-6 pb-14 pt-8 sm:px-8"
            style={{
              backgroundColor: primaryColor,
              backgroundImage: coverImage
                ? `linear-gradient(180deg, rgba(1,10,24,0.72) 0%, rgba(2,16,35,0.58) 30%, rgba(2,16,35,0.82) 68%, rgba(1,9,20,0.98) 100%), radial-gradient(circle at 50% 18%, ${accentColor}40 0%, transparent 28%), radial-gradient(circle at 50% 0%, ${supportColor}1f 0%, transparent 38%), url(${coverImage})`
                : `linear-gradient(180deg, rgba(1,10,24,0.88) 0%, rgba(2,16,35,0.74) 40%, rgba(1,9,20,0.98) 100%), radial-gradient(circle at 50% 18%, ${accentColor}40 0%, transparent 28%), radial-gradient(circle at 50% 0%, ${supportColor}26 0%, transparent 38%)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_36%),radial-gradient(circle_at_bottom,_rgba(6,182,212,0.08),_transparent_28%)]" />

            <div className="relative flex h-full min-h-[calc(100vh-4rem)] flex-col">
              <div className="flex items-center justify-between text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
                <span>Nova Igreja</span>
                <Link
                  href={`/${churchLabel}/login`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white no-underline backdrop-blur transition hover:bg-white/12"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Entrar
                </Link>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center text-center">
                {customization.identidadeVisual.logoPrincipal.url ? (
                  <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur">
                    <Image
                      src={customization.identidadeVisual.logoPrincipal.url}
                      alt={customization.identidadeVisual.logoPrincipal.alt || church.name}
                      width={96}
                      height={96}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : null}

                <h1 className="max-w-[280px] text-5xl font-semibold tracking-[-0.06em] text-white sm:max-w-sm sm:text-6xl">
                  {church.name}
                </h1>
                {customization.informacoesInstitucionais.slogan ? (
                  <p className="mt-4 max-w-[300px] text-sm leading-6 text-white/80">
                    {customization.informacoesInstitucionais.slogan}
                  </p>
                ) : null}
                {customization.informacoesInstitucionais.pastorPrincipal ? (
                  <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
                    Pastor principal: {customization.informacoesInstitucionais.pastorPrincipal}
                  </p>
                ) : null}
              </div>

              <div className="relative z-10">
                <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                  {launcherItems.slice(0, 9).map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex min-w-0 max-w-full flex-col items-center gap-2 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white/14 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition duration-200 hover:bg-white/10">
                          <Icon className="h-8 w-8 text-white" strokeWidth={1.8} />
                        </div>
                        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5 text-white/95">
                          {item.label}
                        </span>
                      </div>
                    )

                    return item.external ? (
                      <a key={item.key} href={item.href} target="_blank" rel="noreferrer" className="no-underline">
                        {content}
                      </a>
                    ) : (
                      <Link key={item.key} href={item.href} className="no-underline">
                        {content}
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-10 flex justify-center">
                  <a
                    href="#conteudo"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/90 backdrop-blur"
                    aria-label="Ver conteudo"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="conteudo" className="space-y-4 bg-[#061223] px-5 py-5 sm:px-6 sm:py-6">
            <div className="grid grid-cols-3 gap-3">
              <InfoPill label="Membros" value={String(memberCount)} />
              <InfoPill label="Eventos" value={String(church.schedules.length)} />
              <InfoPill label="Proximo" value={nextSchedule ? nextSchedule.time : "--:--"} />
            </div>

            {activeSections.has("sobreAIgreja") && customization.paginaPublica.sobreAIgreja ? (
              <ContentCard id="sobre" title="Sobre a Igreja">
                <p className="max-w-full overflow-hidden break-words text-sm leading-7 text-white/78">
                  {customization.paginaPublica.sobreAIgreja}
                </p>
              </ContentCard>
            ) : null}

            {(customization.informacoesInstitucionais.descricao || customization.informacoesInstitucionais.historiaDaIgreja) ? (
              <ContentCard id="historia" title="Historia">
                <p className="max-w-full overflow-hidden break-words text-sm leading-7 text-white/78">
                  {customization.informacoesInstitucionais.descricao || customization.informacoesInstitucionais.historiaDaIgreja}
                </p>
              </ContentCard>
            ) : null}

            {church.schedules.length > 0 ? (
              <ContentCard id="cultos" title="Cultos">
                <div className="space-y-3">
                  {church.schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-4 py-3"
                    >
                      <div className="min-w-0 max-w-full flex-1 overflow-hidden">
                        <p className="font-medium text-white">{schedule.title}</p>
                        {schedule.description ? (
                          <p className="mt-1 max-w-full overflow-hidden break-words text-sm text-white/65">
                            {schedule.description}
                          </p>
                        ) : null}
                      </div>
                      <div className="shrink-0 text-right text-sm text-white/72">
                        <p>{dayLabels[schedule.dayOfWeek] || schedule.dayOfWeek}</p>
                        <p>{schedule.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ContentCard>
            ) : null}

            {church.schedules.length > 0 ? (
              <ContentCard id="agenda" title="Agenda da Semana">
                <div className="space-y-2">
                  {church.schedules.map((schedule) => (
                    <div key={`agenda-${schedule.id}`} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8">
                        <CalendarDays className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{schedule.title}</p>
                        <p className="text-sm text-white/65">
                          {dayLabels[schedule.dayOfWeek] || schedule.dayOfWeek} as {schedule.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ContentCard>
            ) : null}

            {activeSections.has("contato") ? (
              <ContentCard id="contato" title="Contato e Localizacao">
                <div className="space-y-3 text-sm leading-6 text-white/78">
                  <p className="max-w-full overflow-hidden break-words">{customization.localizacao.endereco || church.address}</p>
                  {primaryContact ? (
                    <a href={`tel:${primaryContact}`} className="flex min-w-0 max-w-full items-center gap-2 overflow-hidden text-white">
                      <Phone className="h-4 w-4" />
                      <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{primaryContact}</span>
                    </a>
                  ) : null}
                  {customization.localizacao.linkMaps ? (
                    <a
                      href={customization.localizacao.linkMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="block max-w-full overflow-hidden text-white underline underline-offset-4"
                      title={customization.localizacao.linkMaps}
                    >
                      <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        Abrir no Google Maps
                      </span>
                    </a>
                  ) : null}
                  {customization.localizacao.linkWaze ? (
                    <a
                      href={customization.localizacao.linkWaze}
                      target="_blank"
                      rel="noreferrer"
                      className="block max-w-full overflow-hidden text-white underline underline-offset-4"
                      title={customization.localizacao.linkWaze}
                    >
                      <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        Abrir no Waze
                      </span>
                    </a>
                  ) : null}
                </div>
              </ContentCard>
            ) : null}

            {activeSections.has("galeria") && customization.paginaPublica.galeria.length > 0 ? (
              <ContentCard id="galeria" title="Galeria">
                <div className="grid grid-cols-2 gap-3">
                  {customization.paginaPublica.galeria.map((imageUrl, index) => (
                    <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-[1.25rem]">
                      <Image
                        src={imageUrl}
                        alt={`${church.name} ${index + 1}`}
                        width={320}
                        height={220}
                        unoptimized
                        className="h-32 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </ContentCard>
            ) : null}

            {church.links.length > 0 ? (
              <ContentCard id="links" title="Conecte-se">
                <div className="grid gap-3">
                  {church.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 max-w-full items-center justify-between gap-3 overflow-hidden rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-white no-underline transition hover:bg-white/[0.08]"
                    >
                      <div className="min-w-0 max-w-full flex-1 overflow-hidden">
                        <p className="block max-w-full truncate font-medium">{link.title}</p>
                        <p className="block max-w-full truncate text-sm text-white/60">
                          {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                        </p>
                      </div>
                      <HeartHandshake className="h-5 w-5 shrink-0 text-white/70" />
                    </a>
                  ))}
                </div>
              </ContentCard>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.05] px-3 py-4 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

function ContentCard({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="rounded-[1.75rem] border border-white/8 bg-white/[0.045] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  )
}
