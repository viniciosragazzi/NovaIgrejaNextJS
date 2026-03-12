"use client"

import { motion } from "framer-motion"
import { Users, Calendar, TrendingUp, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    label: "Total de Membros",
    value: "248",
    change: "+12%",
    icon: Users,
    color: "bg-primary",
  },
  {
    label: "Visitantes este Mes",
    value: "32",
    change: "+8%",
    icon: Heart,
    color: "bg-secondary",
  },
  {
    label: "Eventos Agendados",
    value: "8",
    change: "+2",
    icon: Calendar,
    color: "bg-[#8ee4af]",
  },
  {
    label: "Taxa de Retencao",
    value: "78%",
    change: "+5%",
    icon: TrendingUp,
    color: "bg-primary",
  },
]

const recentVisitors = [
  { name: "Maria Silva", date: "Hoje", status: "Visitante" },
  { name: "Joao Santos", date: "Ontem", status: "Visitante" },
  { name: "Ana Costa", date: "3 dias atras", status: "Novo Membro" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel de gestao da sua igreja
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={item}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="rounded-2xl border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Recent Visitors & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Visitantes Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentVisitors.map((visitor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                      {visitor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{visitor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {visitor.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${visitor.status === "Novo Membro"
                        ? "bg-[#8ee4af] text-foreground"
                        : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {visitor.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Proximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Culto de Celebracao", day: "Domingo", time: "10:00" },
                { name: "Estudo Biblico", day: "Quarta", time: "19:30" },
                { name: "Reuniao de Oracao", day: "Sexta", time: "20:00" },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                      <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.day}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {event.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
