"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MessageCircle, Pencil, Plus, Trash2, UserPlus, Users } from "lucide-react"
import { Person, PersonType } from "@/@types/person.types"
import { Schedule } from "@/@types/ministry.types"
import { usePersonForm } from "@/hooks/use-person-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { PersonForm } from "@/components/domain/members/PersonForm"

export interface ScheduleGroup {
  groupId: string
  eventDate: string
  eventName: string
  ministryId: string
  ministryName?: string
  role: string
  schedules: Schedule[]
}

interface ScheduleCardProps {
  churchId: string
  scheduleGroup: ScheduleGroup
  availableVolunteers: Person[]
  onDelete?: (scheduleId: string) => Promise<boolean> | boolean
  onAddPeople?: (schedule: Schedule, volunteerIds: string[]) => Promise<boolean> | boolean
  onReplaceVolunteer?: (scheduleId: string, volunteerId: string) => Promise<boolean> | boolean
  onVolunteerSaved?: (person: Person) => void
  onSendWhatsApp: (
    person: { fullName: string; whatsapp: string },
    role: string,
    eventName: string,
    eventDate: string
  ) => void
}

export function ScheduleCard({
  churchId,
  scheduleGroup,
  availableVolunteers,
  onDelete,
  onAddPeople,
  onReplaceVolunteer,
  onVolunteerSaved,
  onSendWhatsApp,
}: ScheduleCardProps) {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false)
  const [isEditPersonOpen, setIsEditPersonOpen] = useState(false)
  const [isCreatePersonOpen, setIsCreatePersonOpen] = useState(false)
  const [selectedVolunteerIds, setSelectedVolunteerIds] = useState<string[]>([])
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>(scheduleGroup.schedules[0])
  const [replacementVolunteerId, setReplacementVolunteerId] = useState<string>(
    scheduleGroup.schedules[0]?.person.id || ""
  )

  const assignedVolunteerIds = useMemo(
    () => new Set(scheduleGroup.schedules.map((schedule) => schedule.person.id)),
    [scheduleGroup.schedules]
  )

  const compatibleVolunteers = useMemo(
    () =>
      availableVolunteers.filter(
        (volunteer) =>
          !assignedVolunteerIds.has(volunteer.id) &&
          (!scheduleGroup.ministryName ||
            !volunteer.ministry ||
            volunteer.ministry === scheduleGroup.ministryName)
      ),
    [availableVolunteers, assignedVolunteerIds, scheduleGroup.ministryName]
  )

  const createVolunteerDefaults = useMemo(
    () => ({
      type: "volunteer" as const,
      ministry: scheduleGroup.ministryName || selectedSchedule.person.ministry || "",
      role: scheduleGroup.role,
    }),
    [scheduleGroup.ministryName, scheduleGroup.role, selectedSchedule.person.ministry]
  )

  const editPersonForm = usePersonForm({
    churchId,
    editingPerson: selectedSchedule.person,
    onSuccess: (person) => {
      onVolunteerSaved?.({
        ...person,
        type: person.type as PersonType,
      })
      setIsEditPersonOpen(false)
    },
  })

  const createPersonForm = usePersonForm({
    churchId,
    defaultValues: createVolunteerDefaults,
    onSuccess: (person) => {
      onVolunteerSaved?.({
        ...person,
        type: person.type as PersonType,
      })
      void onAddPeople?.(selectedSchedule, [person.id])
      setIsCreatePersonOpen(false)
    },
  })

  const toggleVolunteerSelection = (volunteerId: string) => {
    setSelectedVolunteerIds((current) =>
      current.includes(volunteerId)
        ? current.filter((id) => id !== volunteerId)
        : [...current, volunteerId]
    )
  }

  const hasAnyConfirmed = scheduleGroup.schedules.some((schedule) => schedule.confirmed)
  const hasSwapRequest = scheduleGroup.schedules.some(
    (schedule) => schedule.responseStatus === "swap_requested"
  )
  const hasDeclined = scheduleGroup.schedules.some(
    (schedule) => schedule.responseStatus === "declined"
  )

  return (
    <motion.div className="rounded-3xl bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{scheduleGroup.eventName}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(scheduleGroup.eventDate).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="rounded-full bg-muted text-muted-foreground">
            <Users className="mr-1 h-3.5 w-3.5" />
            {scheduleGroup.schedules.length} pessoas
          </Badge>
          <Badge
            className={cn(
              "rounded-full",
              hasSwapRequest
                ? "bg-[hsl(var(--status-info))] text-[hsl(var(--status-info-foreground))]"
                : hasDeclined
                  ? "bg-destructive/15 text-destructive"
                  : hasAnyConfirmed
                    ? "bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))]"
                    : "bg-secondary text-secondary-foreground"
            )}
          >
            {hasSwapRequest
              ? "Com pedido de troca"
              : hasDeclined
                ? "Com recusas"
                : hasAnyConfirmed
                  ? "Com confirmacoes"
                  : "Pendentes"}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-muted/50 p-3">
        {scheduleGroup.schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="rounded-2xl border border-border bg-card p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{schedule.person.fullName}</p>
                <p className="text-xs text-muted-foreground">{schedule.role}</p>
                {schedule.responseNote ? (
                  <p className="mt-1 text-xs text-muted-foreground">Obs: {schedule.responseNote}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap justify-end gap-2">
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

                {onReplaceVolunteer ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 rounded-lg text-xs"
                    onClick={() => {
                      setSelectedSchedule(schedule)
                      setReplacementVolunteerId(schedule.person.id)
                      setIsEditPersonOpen(true)
                    }}
                  >
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Editar Pessoa
                  </Button>
                ) : null}

                {onDelete ? (
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" />}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir pessoa da escala?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação remove {schedule.person.fullName} desta escala.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => onDelete(schedule.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-2 pt-1">
          {onAddPeople ? (
            <Dialog open={isAddPeopleOpen} onOpenChange={setIsAddPeopleOpen}>
              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-xl"
                onClick={() => setIsAddPeopleOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Pessoas
              </Button>
              <DialogContent className="rounded-3xl sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Adicionar pessoas a esta escala</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-border p-3">
                    {compatibleVolunteers.length > 0 ? compatibleVolunteers.map((volunteer) => {
                      const isSelected = selectedVolunteerIds.includes(volunteer.id)
                      return (
                        <Button
                          key={volunteer.id}
                          type="button"
                          variant="ghost"
                          onClick={() => toggleVolunteerSelection(volunteer.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition-colors",
                            isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                          )}
                        >
                          <div>
                            <p className="text-sm font-medium">{volunteer.fullName}</p>
                            <p className="text-xs text-muted-foreground">
                              {volunteer.ministry || "Sem ministério"}
                            </p>
                          </div>
                          <span className={cn("text-xs font-semibold", isSelected ? "text-primary" : "text-muted-foreground")}>
                            {isSelected ? "Selecionado" : "Selecionar"}
                          </span>
                        </Button>
                      )
                    }) : (
                      <p className="text-sm text-muted-foreground">Nenhum voluntário compatível disponível.</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="h-11 w-full rounded-2xl"
                    onClick={async () => {
                      const success = await onAddPeople?.(scheduleGroup.schedules[0], selectedVolunteerIds)
                      if (success) {
                        setSelectedVolunteerIds([])
                        setIsAddPeopleOpen(false)
                      }
                    }}
                  >
                    Adicionar Selecionados
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : null}

          {onAddPeople ? (
            <Dialog open={isCreatePersonOpen} onOpenChange={setIsCreatePersonOpen}>
              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-xl"
                onClick={() => {
                  setSelectedSchedule(scheduleGroup.schedules[0])
                  setIsCreatePersonOpen(true)
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Voluntário
              </Button>
              <DialogContent className="rounded-3xl sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Criar novo voluntário para esta escala</DialogTitle>
                </DialogHeader>
                <PersonForm {...createPersonForm} />
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      </div>

      {onReplaceVolunteer ? (
        <Dialog open={isEditPersonOpen} onOpenChange={setIsEditPersonOpen}>
          <DialogContent className="rounded-3xl sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Editar ou trocar pessoa da escala</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Trocar por outro voluntário existente</p>
                <Select
                  value={replacementVolunteerId}
                  onValueChange={(value) => setReplacementVolunteerId(String(value ?? ""))}
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Selecione o voluntário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVolunteers.map((volunteer) => (
                      <SelectItem key={volunteer.id} value={volunteer.id}>
                        {volunteer.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-2xl"
                  onClick={async () => {
                    const success = await onReplaceVolunteer(selectedSchedule.id, replacementVolunteerId)
                    if (success) {
                      setIsEditPersonOpen(false)
                    }
                  }}
                >
                  Salvar troca
                </Button>
              </div>

              <div className="rounded-2xl border border-border p-4">
                <p className="mb-3 text-sm font-medium">Editar dados da pessoa atual</p>
                <PersonForm {...editPersonForm} isEditing />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </motion.div>
  )
}
