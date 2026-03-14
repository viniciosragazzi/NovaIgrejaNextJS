"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MemberStatsProps {
  stats: {
    total: number
    members: number
    visitors: number
    volunteers: number
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export function MemberStats({ stats }: MemberStatsProps) {
  const statItems = [
    { label: "Total", value: stats.total, color: "bg-primary text-primary-foreground" },
    {
      label: "Membros",
      value: stats.members,
      color: "bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))]",
    },
    {
      label: "Visitantes",
      value: stats.visitors,
      color: "bg-[hsl(var(--status-info))] text-[hsl(var(--status-info-foreground))]",
    },
    {
      label: "Voluntarios",
      value: stats.volunteers,
      color: "bg-secondary text-secondary-foreground",
    },
  ]

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className="overflow-hidden rounded-3xl border shadow-sm">
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12", stat.color)}>
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight sm:text-2xl">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  )
}
