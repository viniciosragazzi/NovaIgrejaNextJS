"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeftRight, Circle } from "lucide-react"
import { DayOfWeek } from "@prisma/generated/prisma/client"

type WeeklyScheduleProps = {
  schedules: Array<{
    id: string
    title: string
    dayOfWeek: DayOfWeek
    time: string
    description: string | null
  }>
}

const dayLabels: Record<DayOfWeek, string> = {
  DOMINGO: "Dom",
  SEGUNDA: "Seg",
  TERCA: "Ter",
  QUARTA: "Qua",
  QUINTA: "Qui",
  SEXTA: "Sex",
  SABADO: "Sab",
}

export function WeeklySchedule({ schedules }: WeeklyScheduleProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Programacao</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {schedules.length > 0 ? schedules.map((item) => (
          <Card
            key={item.id}
            className="border-0 bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <ArrowLeftRight className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">
                {dayLabels[item.dayOfWeek]}
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">{item.title}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Circle className="h-2.5 w-2.5 fill-accent stroke-none" />
                <span>{item.time}</span>
              </div>
              {item.description ? (
                <>
                  <span className="text-muted-foreground/50">|</span>
                  <span>{item.description}</span>
                </>
              ) : null}
            </div>
          </Card>
        )) : (
          <Card className="col-span-2 border-0 bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Nenhuma programacao cadastrada.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
