"use client"

import { LucideIcon, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Person as Volunteer } from "@/@types/person.types"

interface VolunteerCardProps {
  volunteer: Volunteer
  onSendWhatsApp: (v: Volunteer) => void
  ministryIcon?: LucideIcon
}

export function VolunteerCard({
  volunteer,
  onSendWhatsApp,
  ministryIcon: _Icon = Users,
}: VolunteerCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-sm font-semibold">
          {volunteer.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <p className="font-medium">{volunteer.fullName}</p>
          <Badge variant="secondary" className="rounded-full text-xs">
            {volunteer.ministry || "Disponível"}
          </Badge>
        </div>
      </div>

      <Button
        size="sm"
        className="gap-2 rounded-xl bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))] hover:opacity-90"
        onClick={() => onSendWhatsApp(volunteer)}
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}
