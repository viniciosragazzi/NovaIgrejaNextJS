"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { moveJourneyStageAction, triggerJourneyEventAction } from "@/actions/journey.actions"

type Board = Record<
  string,
  Array<{
    personId: string
    name: string
    type: string
    currentStageName: string
    currentStageKey: string
    score: number
    level: number
    progress: number
    lastActivityAt?: string
  }>
>

export default function JourneyManagementPage({
  churchId,
  board,
  stages,
}: {
  churchId: string
  board: Board
  stages: Array<{
    id: string
    key: string
    name: string
    description: string
    order: number
  }>
}) {
  const router = useRouter()
  const [pendingPersonId, setPendingPersonId] = useState<string | null>(null)
  const [selectedStages, setSelectedStages] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()

  const totalPeople = Object.values(board).reduce((total, items) => total + items.length, 0)

  function handleMove(personId: string) {
    const stageId = selectedStages[personId]
    if (!stageId) {
      toast.error("Selecione uma etapa antes de mover a pessoa.")
      return
    }

    setPendingPersonId(personId)
    startTransition(async () => {
      const result = await moveJourneyStageAction(churchId, {
        personId,
        stageId,
      })
      setPendingPersonId(null)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel mover a etapa.")
        return
      }

      toast.success("Etapa da jornada atualizada.")
      router.refresh()
    })
  }

  function handleTrigger(personId: string, trigger: "FIRST_ATTENDANCE" | "ATTENDANCE_STREAK" | "JOINED_MINISTRY") {
    setPendingPersonId(personId)
    startTransition(async () => {
      const result = await triggerJourneyEventAction(churchId, personId, trigger)
      setPendingPersonId(null)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel aplicar o gatilho.")
        return
      }

      toast.success("Gatilho da jornada aplicado.")
      router.refresh()
    })
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Jornada do Membro"
        description="Acompanhe o funil da igreja, identifique membros travados e avance etapas manualmente quando necessario."
        badge={`${totalPeople} pessoas`}
      />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-7">
        {stages.map((stage) => (
          <Card key={stage.id} className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Etapa {stage.order}</p>
              <h3 className="mt-2 font-semibold">{stage.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{board[stage.key]?.length || 0} pessoas</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {stages.map((stage) => (
          <Card key={stage.id} className="rounded-3xl border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{stage.name}</CardTitle>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {board[stage.key]?.length || 0}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {board[stage.key]?.length ? (
                board[stage.key].map((person) => (
                  <div key={person.personId} className="rounded-3xl bg-muted/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Nivel {person.level} • {person.score} pts • {person.progress}% da etapa
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full px-3 py-1">
                        {person.type}
                      </Badge>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${person.progress}%` }} />
                    </div>

                    <div className="mt-4 grid gap-3">
                      <div className="space-y-2">
                        <Label>Mover para etapa</Label>
                        <div className="flex gap-2">
                          <Select
                            value={selectedStages[person.personId] || ""}
                            onValueChange={(value) =>
                              setSelectedStages((current) => ({
                                ...current,
                                [person.personId]: String(value ?? ""),
                              }))
                            }
                          >
                            <SelectTrigger className="h-11 flex-1 rounded-2xl">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            className="rounded-2xl"
                            disabled={isPending && pendingPersonId === person.personId}
                            onClick={() => handleMove(person.personId)}
                          >
                            Mover
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Atalhos de gatilho</Label>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-2xl"
                            disabled={isPending && pendingPersonId === person.personId}
                            onClick={() => handleTrigger(person.personId, "FIRST_ATTENDANCE")}
                          >
                            1a presenca
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-2xl"
                            disabled={isPending && pendingPersonId === person.personId}
                            onClick={() => handleTrigger(person.personId, "ATTENDANCE_STREAK")}
                          >
                            Constancia
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-2xl"
                            disabled={isPending && pendingPersonId === person.personId}
                            onClick={() => handleTrigger(person.personId, "JOINED_MINISTRY")}
                          >
                            Entrou em ministerio
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">
                  Nenhuma pessoa nesta etapa no momento.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
