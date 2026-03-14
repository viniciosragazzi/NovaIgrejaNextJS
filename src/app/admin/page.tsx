import Link from "next/link"
import { AlertTriangle, ArrowRight, Building2, Shield, UserRoundCog, Users } from "lucide-react"
import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminNavItems } from "@/lib/admin-navigation"

function startOfMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value)
}

export default async function AdminDashboardPage() {
  const monthStart = startOfMonth()

  const [
    churches,
    users,
    peopleCount,
    churchesCreatedThisMonth,
    usersCreatedThisMonth,
    adminsCount,
    usersWithoutChurch,
    churchesWithoutStaff,
  ] = await Promise.all([
    prisma.church.findMany({
      select: {
        id: true,
        name: true,
        label: true,
        createdAt: true,
        pixKeyValue: true,
        _count: {
          select: {
            users: true,
            persons: true,
            ministries: true,
            schedules: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.user.findMany({
      select: {
        id: true,
        churchId: true,
        role: true,
        status: true,
      },
    }),
    prisma.person.count(),
    prisma.church.count({
      where: {
        createdAt: {
          gte: monthStart,
        },
      },
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: monthStart,
        },
      },
    }),
    prisma.user.count({
      where: { role: "ADMIN" },
    }),
    prisma.user.count({
      where: { churchId: null },
    }),
    prisma.church.findMany({
      select: {
        id: true,
        name: true,
        label: true,
        users: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    }),
  ])

  const churchesWithoutStaffCount = churchesWithoutStaff.filter(
    (church) => !church.users.some((user) => user.status === "STAFF")
  ).length

  const kpis = [
    {
      label: "Igrejas cadastradas",
      value: String(churchesWithoutStaff.length),
      detail: `${churchesCreatedThisMonth} novas neste mes`,
      icon: Building2,
    },
    {
      label: "Usuarios da plataforma",
      value: String(users.length),
      detail: `${usersCreatedThisMonth} novos neste mes`,
      icon: Users,
    },
    {
      label: "Pessoas nas igrejas",
      value: String(peopleCount),
      detail: "Base consolidada de membros e visitantes",
      icon: UserRoundCog,
    },
    {
      label: "Admins globais",
      value: String(adminsCount),
      detail: `${usersWithoutChurch} conta(s) sem igreja vinculada`,
      icon: Shield,
    },
  ]

  const alerts = [
    churchesWithoutStaffCount > 0
      ? {
          title: "Igrejas sem staff definido",
          description: `${churchesWithoutStaffCount} igreja(s) ainda nao possuem usuario com status STAFF.`,
          href: "/admin/churches",
        }
      : null,
    usersWithoutChurch > 0
      ? {
          title: "Usuarios sem vinculo de igreja",
          description: `${usersWithoutChurch} usuario(s) precisam de associacao ou revisao do onboarding.`,
          href: "/admin/users?church=sem-igreja",
        }
      : null,
  ].filter((item): item is { title: string; description: string; href: string } => item !== null)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Controle global"
        description="Resumo operacional do ecossistema NovaIgreja com os principais indicadores da plataforma."
        badge="Plataforma"
        actions={
          <div className="flex flex-wrap gap-2">
            {adminNavItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-2xl border border-border bg-background px-4 text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label} className="rounded-[2rem] border">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="mt-2 text-3xl font-semibold">{item.value}</CardTitle>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="rounded-[2rem] border">
          <CardHeader>
            <CardTitle>Ultimas igrejas cadastradas</CardTitle>
            <CardDescription>Visao rapida das estruturas mais recentes criadas na plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {churches.map((church) => (
              <div key={church.id} className="flex flex-col gap-3 rounded-[1.5rem] border bg-background px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{church.name}</p>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                      /{church.label}
                    </Badge>
                    {!church.pixKeyValue ? (
                      <Badge className="rounded-full bg-amber-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-600">
                        PIX pendente
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Criada em {formatDate(church.createdAt)} • {church._count.users} usuario(s) • {church._count.persons} pessoa(s)
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                  <div className="rounded-2xl border px-3 py-2">
                    <p className="font-semibold text-foreground">{church._count.ministries}</p>
                    <p>Ministerios</p>
                  </div>
                  <div className="rounded-2xl border px-3 py-2">
                    <p className="font-semibold text-foreground">{church._count.schedules}</p>
                    <p>Agenda</p>
                  </div>
                  <div className="rounded-2xl border px-3 py-2">
                    <p className="font-semibold text-foreground">{church._count.persons}</p>
                    <p>Pessoas</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem] border">
            <CardHeader>
              <CardTitle>Alertas operacionais</CardTitle>
              <CardDescription>Pontos que merecem acompanhamento do dono da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <Link
                    key={alert.title}
                    href={alert.href}
                    className="flex items-start gap-3 rounded-[1.5rem] border bg-background px-4 py-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium">{alert.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed px-4 py-5 text-sm text-muted-foreground">
                  Nenhum alerta critico encontrado no momento.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border">
            <CardHeader>
              <CardTitle>Proximos modulos administrativos</CardTitle>
              <CardDescription>Base ja preparada para evolucoes do plano global.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Detalhe individual da igreja com suporte operacional",
                "Auditoria completa de alteracoes administrativas",
                "Parametros persistidos de feature flags e limites",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[1.5rem] border bg-background px-4 py-3 text-sm">
                  <span>{item}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
