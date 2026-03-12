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
    { label: "Total", value: stats.total, color: "bg-zinc-900" },
    { label: "Membros", value: stats.members, color: "bg-emerald-400" },
    { label: "Visitantes", value: stats.visitors, color: "bg-blue-500" },
    { label: "Voluntários", value: stats.volunteers, color: "bg-amber-400" },
  ]

  return (
    <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-4">
      {statItems.map((stat, i) => (
        <Card
          key={i}
          className="rounded-3xl border-0 shadow-sm overflow-hidden bg-white"
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div
              className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center text-white",
                stat.color
              )}
            >
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  )
}
