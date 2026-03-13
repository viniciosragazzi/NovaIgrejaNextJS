"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Heart,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { cn } from "@/lib/utils"

const icons = {
  users: Users,
  heart: Heart,
  calendar: Calendar,
  trendingUp: TrendingUp,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

type DashboardClientPageProps = {
  churchLabel: string
  isStaff: boolean
  stats: ReadonlyArray<{
    label: string
    value: string
    change: string
    icon: keyof typeof icons
    color: string
  }>
  alerts: ReadonlyArray<{
    id: string
    title: string
    description: string
    tone: "warning" | "info" | "success"
    href: string
    actionLabel: string
  }>
  recentVisitors: ReadonlyArray<{
    name: string
    date: string
    status: string
  }>
  events: ReadonlyArray<{
    name: string
    day: string
    time: string
  }>
}

const alertToneClasses = {
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
}

export default function DashboardClientPage({
  churchLabel,
  isStaff,
  stats,
  alerts,
  recentVisitors,
  events,
}: DashboardClientPageProps) {
  const quickActions = isStaff
    ? [
        { label: "Novo membro", href: `/${churchLabel}/dashboard/members` },
        { label: "Novo evento", href: `/${churchLabel}/dashboard/schedule` },
        { label: "Novo ministerio", href: `/${churchLabel}/dashboard/ministerios` },
        { label: "Perfil da igreja", href: `/${churchLabel}/dashboard/profile` },
      ]
    : []

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Dashboard"
          description={
            isStaff
              ? "Priorize o que exige acao agora e acesse rapidamente os fluxos mais usados da igreja."
              : "Acompanhe a agenda da igreja e consulte as informacoes disponiveis para membros."
          }
          badge={isStaff ? "Visao Geral" : "Area do Membro"}
          actions={
            quickActions.length > 0
              ? quickActions.map((action) => (
                  <Button key={action.href} variant="outline" className="rounded-2xl">
                    <Link href={action.href} className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      {action.label}
                    </Link>
                  </Button>
                ))
              : undefined
          }
        />
      </motion.div>

      <motion.div variants={item} className={cn("grid gap-4", isStaff ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2")}>
        {stats.map((stat) => {
          const Icon = icons[stat.icon]
          return (
            <Card key={stat.label} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", stat.color)}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {isStaff ? (
        <motion.div variants={item}>
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Acoes Prioritarias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex flex-col gap-3 rounded-2xl border px-4 py-4 lg:flex-row lg:items-center lg:justify-between",
                      alertToneClasses[alert.tone]
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        <p className="font-semibold">{alert.title}</p>
                        <p className="text-sm opacity-80">{alert.description}</p>
                      </div>
                    </div>
                    <Button className="rounded-2xl bg-background text-foreground hover:bg-background/90">
                      <Link href={alert.href} className="flex items-center">
                        {alert.actionLabel}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={<AlertCircle className="h-5 w-5" />}
                  title="Nenhuma pendencia critica"
                  description="O painel esta em dia. Use as acoes rapidas para continuar a operacao da igreja."
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ) : null}

      <div className={cn("grid gap-6", isStaff ? "xl:grid-cols-[1.1fr_0.9fr]" : "xl:grid-cols-1")}>
        {isStaff ? (
          <motion.div variants={item}>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Novos Visitantes</CardTitle>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  Follow-up
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentVisitors.length > 0 ? (
                  recentVisitors.map((visitor) => (
                    <div key={`${visitor.name}-${visitor.date}`} className="flex items-center justify-between rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                          {visitor.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{visitor.name}</p>
                          <p className="text-xs text-muted-foreground">{visitor.date}</p>
                        </div>
                      </div>
                      <Badge className="rounded-full px-3 py-1">{visitor.status}</Badge>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={<Users className="h-5 w-5" />}
                    title="Nenhum visitante recente"
                    description="Quando novos visitantes entrarem no sistema, eles aparecerao aqui para acompanhamento."
                    action={
                      <Button className="rounded-2xl">
                        <Link href={`/${churchLabel}/dashboard/members`}>Ir para membros</Link>
                      </Button>
                    }
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <motion.div variants={item}>
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Proximos Eventos</CardTitle>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Agenda
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={`${event.name}-${event.day}-${event.time}`} className="flex items-center justify-between rounded-2xl bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
                        <Calendar className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-xs text-muted-foreground">{event.day}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-background px-3 py-1 text-xs font-medium shadow-sm">
                      {event.time}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={<Calendar className="h-5 w-5" />}
                  title="Nenhum evento agendado"
                  description={
                    isStaff
                      ? "Cadastre cultos e reunioes para que a agenda da igreja fique completa e visivel."
                      : "A agenda da igreja ainda nao possui eventos publicados."
                  }
                  action={
                    isStaff ? (
                      <Button className="rounded-2xl">
                        <Link href={`/${churchLabel}/dashboard/schedule`}>Criar evento</Link>
                      </Button>
                    ) : null
                  }
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
