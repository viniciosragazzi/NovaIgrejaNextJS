import { redirect } from "next/navigation"
import { Award, CheckCircle2, Circle, Map, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import { getChurchContext } from "@/lib/get-church-context"
import { buildJourneyOverview } from "@/lib/member-journey"
import { VolunteerScaleResponseStatus } from "@prisma/generated/prisma/client"
import prisma from "@/lib/prisma"
import { MemberJourneyActions } from "./member-journey-actions"

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ churchLabel: string }>
}) {
  const { churchLabel } = await params
  const { church, user } = await getChurchContext(churchLabel)

  const [person, ministries] = await Promise.all([
    prisma.person.findFirst({
      where: {
        churchId: church.id,
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        contact: true,
      },
    }),
    prisma.ministry.findMany({
      where: { churchId: church.id },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
      },
    }),
  ])

  if (!person) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const [overview, pendingScales] = await Promise.all([
    prisma.$transaction((tx) => buildJourneyOverview(tx, person.id, church.id)),
    prisma.volunteerScale.findMany({
      where: {
        churchId: church.id,
        personId: person.id,
        responseStatus: VolunteerScaleResponseStatus.PENDING,
      },
      orderBy: { date: "asc" },
      include: {
        ministry: {
          select: { name: true },
        },
      },
    }),
  ])

  if (!overview) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const customization = normalizeChurchCustomization(church.customization, ministries)
  const groups = [
    ...customization.estruturaOrganizacional.grupos.map((group) => ({
      id: `group-${group.id}`,
      name: group.nomeGrupo,
      description: group.descricao,
      meta: [group.dia, group.horario].filter(Boolean).join(" / "),
    })),
    ...customization.estruturaOrganizacional.celulas.map((group) => ({
      id: `cell-${group.id}`,
      name: group.nomeGrupo,
      description: group.descricao,
      meta: [group.dia, group.horario].filter(Boolean).join(" / "),
    })),
  ]

  const currentStageTasks = overview.currentStage?.tasks ?? []

  return (
    <div className="space-y-8">
      <PageHeader
        title="Minha Jornada"
        description="Acompanhe sua evolucao na caminhada com a igreja, conclua etapas e desbloqueie conquistas."
        badge="Gameficacao"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
              <Map className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Etapa atual</p>
              <p className="text-xl font-semibold">{overview.currentStage?.name || "Jornada iniciada"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--status-success))]">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nivel</p>
              <p className="text-xl font-semibold">{overview.level}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
              <Award className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pontuacao</p>
              <p className="text-xl font-semibold">{overview.score} pts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <MemberJourneyActions
        churchId={church.id}
        churchLabel={churchLabel}
        memberName={person.name}
        memberContact={person.contact[0] || ""}
        tasks={currentStageTasks}
        ministries={ministries.map((ministry) => ({
          id: ministry.id,
          name: ministry.name,
          description: ministry.description || "",
        }))}
        groups={groups}
        pendingScales={pendingScales.map((scale) => ({
          id: scale.id,
          eventName: scale.eventName || "Evento",
          eventDate: scale.date.toISOString(),
          role: scale.role,
          ministryName: scale.ministry.name,
          confirmed: scale.confirmed,
        }))}
      />

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Trilha de progresso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${overview.progress}%` }} />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {overview.stages.map((stage) => (
              <div
                key={stage.id}
                className={`rounded-3xl p-5 ${
                  stage.current
                    ? "bg-primary text-primary-foreground"
                    : stage.completed
                      ? "bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))]"
                      : "bg-muted/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] opacity-70">Etapa {stage.order}</p>
                    <h3 className="mt-2 text-lg font-semibold">{stage.name}</h3>
                    <p className="mt-2 text-sm opacity-80">{stage.description}</p>
                  </div>
                  <Badge variant={stage.current ? "secondary" : "outline"} className="rounded-full px-3 py-1">
                    {stage.current ? "Atual" : stage.completed ? "Concluida" : "Proxima"}
                  </Badge>
                </div>

                {stage.tasks.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {stage.tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 rounded-2xl bg-background/60 px-4 py-3 text-foreground">
                        {task.completed ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--status-success-foreground))]" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 text-sm opacity-80">Essa etapa e consolidada por acompanhamento da igreja.</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-3xl p-5 ${achievement.earned ? "bg-secondary" : "bg-muted/40"}`}
            >
              <p className="text-sm font-semibold">{achievement.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{achievement.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {achievement.points} pts
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
