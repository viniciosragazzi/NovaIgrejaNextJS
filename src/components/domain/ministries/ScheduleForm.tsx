"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { volunteerScaleSchema } from "@/lib/validations"
import { Ministry, ScheduleFormData } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"

interface ScheduleFormProps {
  ministries: Ministry[]
  availableVolunteers: Volunteer[]
  onSubmit: (data: ScheduleFormData) => Promise<boolean | void>
  isSubmitting: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleForm({
  ministries,
  availableVolunteers,
  onSubmit,
  isSubmitting,
  isOpen,
  onOpenChange,
}: ScheduleFormProps) {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(volunteerScaleSchema),
    defaultValues: {
      eventDate: new Date().toISOString().split("T")[0],
      volunteerIds: [],
    },
  })

  const selectedVolunteerIds = form.watch("volunteerIds") || []
  const selectedMinistryId = form.watch("ministryId")

  const filteredVolunteers = useMemo(() => {
    if (!selectedMinistryId) {
      return availableVolunteers
    }

    const selectedMinistry = ministries.find((ministry) => ministry.id === selectedMinistryId)
    if (!selectedMinistry) {
      return availableVolunteers
    }

    return availableVolunteers.filter(
      (volunteer) => !volunteer.ministry || volunteer.ministry === selectedMinistry.name
    )
  }, [availableVolunteers, ministries, selectedMinistryId])

  const toggleVolunteer = (volunteerId: string) => {
    const current = form.getValues("volunteerIds") || []
    const nextValues = current.includes(volunteerId)
      ? current.filter((id) => id !== volunteerId)
      : [...current, volunteerId]

    form.setValue("volunteerIds", nextValues, { shouldValidate: true })
  }

  const handleSubmit = async (data: ScheduleFormData) => {
    const success = await onSubmit(data)
    if (success) {
      form.reset({
        eventDate: new Date().toISOString().split("T")[0],
        eventName: "",
        ministryId: "",
        volunteerIds: [],
        role: "",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button className="gap-2 rounded-2xl bg-primary px-6 text-primary-foreground">
          <Plus className="h-4 w-4" />
          Nova Escala
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Escalar Voluntarios</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Data do Evento</Label>
            <Input type="date" className="h-12 rounded-2xl" {...form.register("eventDate")} />
          </div>

          <div className="space-y-2">
            <Label>Nome do Evento</Label>
            <Input placeholder="Ex: Culto Domingo" className="h-12 rounded-2xl" {...form.register("eventName")} />
          </div>

          <div className="space-y-2">
            <Label>Ministerio</Label>
            <Select
              onValueChange={(value) =>
                form.setValue("ministryId", String(value ?? ""), { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-12 rounded-2xl">
                <SelectValue placeholder="Selecione o ministerio" />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((ministry) => (
                  <SelectItem key={ministry.id} value={ministry.id}>
                    {ministry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Voluntarios</Label>
            <div className="max-h-56 space-y-2 overflow-y-auto rounded-2xl border border-border p-3">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((volunteer) => {
                  const isSelected = selectedVolunteerIds.includes(volunteer.id)
                  return (
                    <Button
                      key={volunteer.id}
                      type="button"
                      variant="ghost"
                      onClick={() => toggleVolunteer(volunteer.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition-colors",
                        isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium">{volunteer.fullName}</p>
                        <p className="text-xs text-muted-foreground">{volunteer.ministry || "Sem ministerio"}</p>
                      </div>
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        )}
                      >
                        {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
                      </div>
                    </Button>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum voluntario disponivel para este ministerio.</p>
              )}
            </div>
            {form.formState.errors.volunteerIds ? (
              <p className="text-xs text-destructive">{form.formState.errors.volunteerIds.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Funcao</Label>
            <Input placeholder="Ex: Camera" className="h-12 rounded-2xl" {...form.register("role")} />
          </div>

          <Button type="submit" className="h-12 w-full rounded-2xl bg-primary text-primary-foreground" disabled={isSubmitting}>
            {isSubmitting ? "Processando..." : "Escalar Voluntarios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
