"use client"

import { DollarSign, TrendingUp, Calendar } from "lucide-react"

interface FinanceStatsProps {
  stats: {
    totalMonth: number
    totalTithe: number
    totalOffering: number
  }
}

export function FinanceStats({ stats }: FinanceStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="flex items-center gap-4 rounded-3xl bg-card p-6 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ee4af]">
          <DollarSign className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total do Mes</p>
          <p className="text-2xl font-bold">R$ {stats.totalMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-3xl bg-card p-6 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9a8d4]">
          <TrendingUp className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Dizimos</p>
          <p className="text-2xl font-bold">R$ {stats.totalTithe.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-3xl bg-card p-6 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
          <Calendar className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Ofertas</p>
          <p className="text-2xl font-bold">R$ {stats.totalOffering.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  )
}
