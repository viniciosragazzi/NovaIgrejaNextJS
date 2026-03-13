"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import { CalendarCheck2, CheckCircle2, HeartHandshake, MessageSquareHeart, Users } from "lucide-react"
import type { JourneyTaskProgress } from "@/@types/journey.types"
import {
  completeMemberSelfJourneyTriggerAction,
  confirmMyScaleAction,
  registerMemberJourneyInterestAction,
  submitMemberPrayerRequestAction,
} from "@/actions/journey.actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type JourneyOption = {
  id: string
  name: string
  description?: string
  meta?: string
}

type PendingScale = {
  id: string
  eventName: string
  eventDate: string
  role: string
  ministryName: string
  confirmed: boolean
}

type MemberJourneyActionsProps = {
  churchId: string
  churchLabel: string
  memberName: string
  memberContact: string
  tasks: JourneyTaskProgress[]
  ministries: JourneyOption[]
  groups: JourneyOption[]
  pendingScales: PendingScale[]
}

function OptionPicker({
  options,
  selected,
  onToggle,
}: {
  options: JourneyOption[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = selected.includes(option.name)
        return (
          <Button
            key={option.id}
            type="button"
            variant="ghost"
            onClick={() => onToggle(option.name)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors",
              active ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-muted/50"
            )}
          >
            <p className="font-medium">{option.name}</p>
            {option.description ? (
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
            ) : null}
            {option.meta ? <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{option.meta}</p> : null}
          </Button>
        )
      })}
    </div>
  )
}

export function MemberJourneyActions({
  churchId,
  churchLabel,
  memberName,
  memberContact,
  tasks,
  ministries,
  groups,
  pendingScales,
}: MemberJourneyActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [prayerName, setPrayerName] = useState(memberName)
  const [prayerContact, setPrayerContact] = useState(memberContact)
  const [prayerRequest, setPrayerRequest] = useState("")
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [interestMessage, setInterestMessage] = useState("")

  const incompleteTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks])

  function runAction(action: () => Promise<{ success: boolean; error?: string }>, successMessage: string) {
    startTransition(async () => {
      const result = await action()
      if (!result.success) {
        toast.error(result.error || "Nao foi possivel concluir esta etapa.")
        return
      }

      toast.success(successMessage)
      router.refresh()
    })
  }

  function toggleValue(values: string[], nextValue: string, setter: (values: string[]) => void) {
    setter(values.includes(nextValue) ? values.filter((value) => value !== nextValue) : [...values, nextValue])
  }

  if (incompleteTasks.length === 0) {
    return null
  }

  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Concluir tarefas da etapa atual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incompleteTasks.map((task) => {
          if (task.key === "complete_onboarding" || task.key === "complete_profile") {
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <p className="font-semibold">{task.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                <Button className="mt-4 rounded-2xl">
                  <Link href={`/${churchLabel}/welcome`}>Atualizar meu cadastro</Link>
                </Button>
              </div>
            )
          }

          if (task.key === "first_prayer_request") {
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <MessageSquareHeart className="h-5 w-5 text-primary" />
                  <p className="font-semibold">{task.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Input value={prayerName} onChange={(event) => setPrayerName(event.target.value)} placeholder="Seu nome" className="rounded-2xl" />
                  <Input value={prayerContact} onChange={(event) => setPrayerContact(event.target.value)} placeholder="Contato" className="rounded-2xl" />
                </div>
                <Textarea
                  value={prayerRequest}
                  onChange={(event) => setPrayerRequest(event.target.value)}
                  placeholder="Compartilhe seu pedido de oracao"
                  className="mt-3 min-h-28 rounded-2xl"
                />
                <Button
                  type="button"
                  className="mt-4 rounded-2xl"
                  disabled={isPending || prayerRequest.trim().length < 8}
                  onClick={() =>
                    runAction(
                      () =>
                        submitMemberPrayerRequestAction(churchId, {
                          name: prayerName,
                          contact: prayerContact,
                          request: prayerRequest,
                        }),
                      "Pedido enviado e jornada atualizada."
                    )
                  }
                >
                  Enviar pedido
                </Button>
              </div>
            )
          }

          if (task.key === "joined_ministry_interest") {
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  <p className="font-semibold">{task.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                {ministries.length > 0 ? (
                  <>
                    <div className="mt-4">
                      <OptionPicker
                        options={ministries}
                        selected={selectedMinistries}
                        onToggle={(value) =>
                          toggleValue(selectedMinistries, value, setSelectedMinistries)
                        }
                      />
                    </div>
                    <Textarea
                      value={interestMessage}
                      onChange={(event) => setInterestMessage(event.target.value)}
                      placeholder="Se quiser, conte como voce gostaria de servir."
                      className="mt-3 min-h-24 rounded-2xl"
                    />
                    <Button
                      type="button"
                      className="mt-4 rounded-2xl"
                      disabled={isPending || selectedMinistries.length === 0}
                      onClick={() =>
                        runAction(
                          () =>
                            registerMemberJourneyInterestAction(churchId, "JOINED_MINISTRY", {
                              selections: selectedMinistries,
                              message: interestMessage,
                            }),
                          "Interesse em ministerio registrado."
                        )
                      }
                    >
                      Registrar interesse
                    </Button>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Ainda nao ha ministerios publicados. Assim que a igreja cadastrar, essa tarefa podera ser concluida aqui.
                  </p>
                )}
              </div>
            )
          }

          if (task.key === "joined_group") {
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="font-semibold">{task.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                {groups.length > 0 ? (
                  <>
                    <div className="mt-4">
                      <OptionPicker
                        options={groups}
                        selected={selectedGroups}
                        onToggle={(value) => toggleValue(selectedGroups, value, setSelectedGroups)}
                      />
                    </div>
                    <Button
                      type="button"
                      className="mt-4 rounded-2xl"
                      disabled={isPending || selectedGroups.length === 0}
                      onClick={() =>
                        runAction(
                          () =>
                            registerMemberJourneyInterestAction(churchId, "JOINED_GROUP", {
                              selections: selectedGroups,
                              message: "",
                            }),
                          "Interesse em grupo registrado."
                        )
                      }
                    >
                      Quero participar
                    </Button>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Nenhum grupo ou celula foi configurado ainda pela igreja.
                  </p>
                )}
              </div>
            )
          }

          if (task.key === "confirm_scale") {
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <CalendarCheck2 className="h-5 w-5 text-primary" />
                  <p className="font-semibold">{task.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                <div className="mt-4 space-y-3">
                  {pendingScales.length > 0 ? (
                    pendingScales.map((scale) => (
                      <div key={scale.id} className="rounded-2xl bg-background p-4">
                        <p className="font-medium">{scale.eventName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {scale.ministryName} / {scale.role}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {new Date(scale.eventDate).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <Button
                          type="button"
                          className="mt-3 rounded-2xl"
                          disabled={isPending}
                          onClick={() =>
                            runAction(
                              () => confirmMyScaleAction(churchId, scale.id),
                              "Escala confirmada com sucesso."
                            )
                          }
                        >
                          Confirmar escala
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Ainda nao existe uma escala pendente para voce confirmar.
                    </p>
                  )}
                </div>
              </div>
            )
          }

          if (task.key === "first_attendance" || task.key === "attendance_streak") {
            const trigger = task.triggerType === "FIRST_ATTENDANCE" ? "FIRST_ATTENDANCE" : "ATTENDANCE_STREAK"
            return (
              <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="font-semibold">{task.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                <Button
                  type="button"
                  className="mt-4 rounded-2xl"
                  disabled={isPending}
                  onClick={() =>
                    runAction(
                      () => completeMemberSelfJourneyTriggerAction(churchId, trigger),
                      "Presenca registrada na sua jornada."
                    )
                  }
                >
                  Registrar agora
                </Button>
              </div>
            )
          }

          return (
            <div key={task.id} className="rounded-3xl border bg-muted/30 p-5">
              <p className="font-semibold">{task.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
