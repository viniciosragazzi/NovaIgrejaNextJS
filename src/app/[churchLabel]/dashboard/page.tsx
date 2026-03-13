import prisma from "@/lib/prisma"
import { getChurchContext } from "@/lib/get-church-context"
import { buildJourneyOverview } from "@/lib/member-journey"
import { VolunteerScaleResponseStatus } from "@prisma/generated/prisma/client"
import DashboardClientPage from "./dashboard-client-page"

type DashboardStat = {
  label: string
  value: string
  change: string
  icon: "users" | "heart" | "calendar" | "trendingUp"
  color: string
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ churchLabel: string }>
}) {
  const { churchLabel } = await params
  const { church, isStaff, user } = await getChurchContext(churchLabel)

  const [people, schedules, volunteerScales, memberPerson] = await Promise.all([
    prisma.person.findMany({
      where: { churchId: church.id },
      select: {
        id: true,
        name: true,
        type: true,
        firstVisitAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.weeklySchedule.findMany({
      where: { churchId: church.id, active: true },
      orderBy: [{ dayOfWeek: "asc" }, { time: "asc" }],
      take: 3,
    }),
    prisma.volunteerScale.findMany({
      where: {
        churchId: church.id,
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      select: { confirmed: true, responseStatus: true },
    }),
    isStaff
      ? Promise.resolve(null)
      : prisma.person.findFirst({
          where: {
            churchId: church.id,
            email: user.email,
          },
          select: { id: true },
        }),
  ])

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const visitorsThisMonth = people.filter(
    (person) => person.type === "VISITOR" && (person.firstVisitAt ?? person.createdAt) >= monthStart
  ).length
  const members = people.filter((person) => person.type === "MEMBER" || person.type === "VOLUNTEER" || person.type === "STAFF").length
  const confirmedScales = volunteerScales.filter((item) => item.confirmed).length
  const totalScales = volunteerScales.length
  const pendingScales = volunteerScales.filter(
    (item) => item.responseStatus === VolunteerScaleResponseStatus.PENDING
  ).length

  const stats: readonly DashboardStat[] = isStaff
    ? [
        {
          label: "Total de Membros",
          value: String(members),
          change: `${people.filter((person) => person.type === "MEMBER" || person.type === "VOLUNTEER").length} ativos`,
          icon: "users",
          color: "bg-primary",
        },
        {
          label: "Visitantes este Mes",
          value: String(visitorsThisMonth),
          change: visitorsThisMonth > 0 ? "Novos contatos" : "Sem novos visitantes",
          icon: "heart",
          color: "bg-secondary",
        },
        {
          label: "Eventos Agendados",
          value: String(schedules.length),
          change: schedules.length > 0 ? "Agenda publicada" : "Sem eventos",
          icon: "calendar",
          color: "bg-[hsl(var(--status-success))]",
        },
        {
          label: "Escalas Confirmadas",
          value: `${confirmedScales}/${totalScales || 0}`,
          change: totalScales > 0 ? "Acompanhamento do mes" : "Sem escalas no mes",
          icon: "trendingUp",
          color: "bg-primary",
        },
      ] as const
    : [
        {
          label: "Minha Igreja",
          value: church.name,
          change: "Painel do membro",
          icon: "users",
          color: "bg-primary",
        },
        {
          label: "Eventos",
          value: String(schedules.length),
          change: schedules.length > 0 ? "Agenda disponivel" : "Sem agenda publicada",
          icon: "calendar",
          color: "bg-[hsl(var(--status-success))]",
        },
      ] as const

  const recentVisitors = isStaff
    ? people
        .filter((person) => person.type === "VISITOR" || person.type === "MEMBER")
        .slice(0, 3)
        .map((person) => ({
          name: person.name,
          date: (person.firstVisitAt ?? person.createdAt).toISOString().split("T")[0],
          status: person.type === "MEMBER" ? "Novo Membro" : "Visitante",
        }))
    : []

  const events = schedules.map((schedule) => ({
    name: schedule.title,
    day: schedule.dayOfWeek,
    time: schedule.time,
  }))

  const alerts: Array<{
    id: string
    title: string
    description: string
    tone: "warning" | "info" | "success"
    href: string
    actionLabel: string
  }> = isStaff
    ? [
        pendingScales > 0
          ? {
              id: "pending-scales",
              title: "Escalas aguardando confirmacao",
              description: `${pendingScales} escala(s) ainda sem retorno dos voluntarios.`,
              tone: "warning" as const,
              href: `/${churchLabel}/dashboard/ministerios`,
              actionLabel: "Revisar escalas",
            }
          : null,
        schedules.length === 0
          ? {
              id: "no-events",
              title: "Agenda semanal incompleta",
              description: "Nenhum culto ou reuniao ativa foi configurado para a pagina publica.",
              tone: "info" as const,
              href: `/${churchLabel}/dashboard/schedule`,
              actionLabel: "Criar evento",
            }
          : null,
        visitorsThisMonth > 0
          ? {
              id: "new-visitors",
              title: "Novos visitantes para acompanhar",
              description: `${visitorsThisMonth} visitante(s) chegaram este mes e podem precisar de follow-up.`,
              tone: "success" as const,
              href: `/${churchLabel}/dashboard/members`,
              actionLabel: "Ver visitantes",
            }
          : null,
      ].filter(
        (
          alert
        ): alert is {
          id: string
          title: string
          description: string
          tone: "warning" | "info" | "success"
          href: string
          actionLabel: string
        } => alert !== null
      )
    : []

  const memberJourney =
    !isStaff && memberPerson
      ? await prisma.$transaction((tx) => buildJourneyOverview(tx, memberPerson.id, church.id))
      : null

  return (
    <DashboardClientPage
      churchLabel={churchLabel}
      isStaff={isStaff}
      stats={stats}
      alerts={alerts}
      recentVisitors={recentVisitors}
      events={events}
      memberJourney={
        memberJourney
          ? {
              currentStageName: memberJourney.currentStage?.name || "Jornada iniciada",
              progress: memberJourney.progress,
              score: memberJourney.score,
              level: memberJourney.level,
            }
          : null
      }
    />
  )
}
