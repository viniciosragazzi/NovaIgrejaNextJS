"use client"

import { motion } from "framer-motion"
import { Calendar, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Schedule } from "@/@types/ministry.types"

interface ScheduleCardProps {
  schedule: Schedule
  onSendWhatsApp: (person: { fullName: string; whatsapp: string }, role: string, eventName: string, eventDate: string) => void
}

export function ScheduleCard({ schedule, onSendWhatsApp }: ScheduleCardProps) {
  return (
    <motion.div className="rounded-3xl bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{schedule.eventName}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(schedule.eventDate).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
        <Badge
          className={cn(
            "rounded-full",
            schedule.confirmed ? "bg-[#8ee4af]" : "bg-[#f9a8d4]"
          )}
        >
          {schedule.confirmed ? "Confirmado" : "Pendente"}
        </Badge>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
        <div>
          <p className="text-sm font-medium">{schedule.person.fullName}</p>
          <p className="text-xs text-muted-foreground">{schedule.role}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-2 rounded-lg text-xs"
          onClick={() =>
            onSendWhatsApp(
              schedule.person,
              schedule.role,
              schedule.eventName,
              schedule.eventDate
            )
          }
        >
          <MessageCircle className="h-3 w-3" />
          Confirmar
        </Button>
      </div>
    </motion.div>
  )
}
