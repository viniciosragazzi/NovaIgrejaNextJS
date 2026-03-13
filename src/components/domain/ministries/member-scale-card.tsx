"use client"

import { useState, useTransition } from "react"
import { Calendar, CheckCircle2, RefreshCcw, XCircle } from "lucide-react"
import type { Schedule } from "@/@types/ministry.types"
import { respondToMyScaleAction } from "@/actions/ministry.actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const responseLabelMap: Record<Schedule["responseStatus"], string> = {
  pending: "Aguardando resposta",
  confirmed: "Confirmada",
  declined: "Recusada",
  swap_requested: "Troca solicitada",
}

const responseBadgeClassMap: Record<Schedule["responseStatus"], string> = {
  pending: "bg-secondary text-secondary-foreground",
  confirmed: "bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))]",
  declined: "bg-destructive/15 text-destructive",
  swap_requested: "bg-[hsl(var(--status-info))] text-[hsl(var(--status-info-foreground))]",
}

export function MemberScaleCard({
  churchId,
  schedule,
  onUpdated,
}: {
  churchId: string
  schedule: Schedule
  onUpdated: (schedule: Schedule) => void
}) {
  const [note, setNote] = useState(schedule.responseNote || "")
  const [isPending, startTransition] = useTransition()

  function handleResponse(status: "confirmed" | "declined" | "swap_requested") {
    startTransition(async () => {
      const result = await respondToMyScaleAction(churchId, {
        scaleId: schedule.id,
        status,
        note,
      })

      if (!result.success || !result.data) {
        toast.error(result.error || "Nao foi possivel atualizar sua escala.")
        return
      }

      onUpdated(result.data)
      toast.success("Resposta registrada com sucesso.")
    })
  }

  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold">{schedule.eventName}</p>
              <p className="text-sm text-muted-foreground">
                {schedule.ministryName || "Ministerio"} / {schedule.role}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {new Date(schedule.eventDate).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <Badge className={`rounded-full ${responseBadgeClassMap[schedule.responseStatus]}`}>
            {responseLabelMap[schedule.responseStatus]}
          </Badge>
        </div>

        <Textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Adicione uma observacao, indisponibilidade ou detalhe da troca."
          className="min-h-24 rounded-2xl"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            className="rounded-2xl"
            disabled={isPending}
            onClick={() => handleResponse("confirmed")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Confirmar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl"
            disabled={isPending}
            onClick={() => handleResponse("declined")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Negar
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="rounded-2xl"
            disabled={isPending}
            onClick={() => handleResponse("swap_requested")}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Solicitar troca
          </Button>
        </div>

        {schedule.respondedAt ? (
          <p className="text-xs text-muted-foreground">
            Ultima resposta em {new Date(schedule.respondedAt).toLocaleDateString("pt-BR")}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
