"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeftRight, Circle } from "lucide-react"

const scheduleData = [
  {
    id: 1,
    code: "DOM",
    title: "Culto Dominical",
    type: "Celebração",
    time: "18:00",
    details: "Louvor e Palavra",
  },
  {
    id: 2,
    code: "EBD",
    title: "Escola Bíblica",
    type: "Estudo",
    time: "09:00",
    details: "Classes por idade",
  },
  {
    id: 3,
    code: "CEL",
    title: "Célula nos Lares",
    type: "Comunhão",
    time: "19:30",
    details: "Diversos horários",
  },
  {
    id: 4,
    code: "ORA",
    title: "Reunião de Oração",
    type: "Intercessão",
    time: "06:00",
    details: "Terça e Quinta",
  },
]

export function WeeklySchedule() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Programação</h2>

      <div className="grid grid-cols-2 gap-3">
        {scheduleData.map((item) => (
          <Card
            key={item.id}
            className="border-0 bg-card p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <ArrowLeftRight className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">{item.code}</span>
            </div>

            {/* Type */}
            <p className="mt-2 text-xs text-muted-foreground">{item.type}</p>

            {/* Time Details */}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Circle className="h-2.5 w-2.5 fill-accent stroke-none" />
                <span>{item.time}</span>
              </div>
              <span className="text-muted-foreground/50">|</span>
              <span>{item.details}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
