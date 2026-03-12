"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
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
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger >
        <Button className="gap-2 rounded-2xl bg-primary px-6 text-primary-foreground">
          <Plus className="h-4 w-4" />
          Nova Escala
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escalar Voluntário</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Data do Evento</Label>
            <Input
              type="date"
              className="h-12 rounded-2xl"
              {...form.register("eventDate")}
            />
          </div>

          <div className="space-y-2">
            <Label>Nome do Evento</Label>
            <Input
              placeholder="Ex: Culto Domingo"
              className="h-12 rounded-2xl"
              {...form.register("eventName")}
            />
          </div>

          <div className="space-y-2">
            <Label>Ministério</Label>
            <Select
              onValueChange={(v) => form.setValue("ministryId", v as string)}
            >
              <SelectTrigger className="h-12 rounded-2xl">
                <SelectValue placeholder="Selecione o ministério" />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Voluntário</Label>
            <Select
              onValueChange={(v) => form.setValue("volunteerId", v as string)}
            >
              <SelectTrigger className="h-12 rounded-2xl">
                <SelectValue placeholder="Selecione o voluntário" />
              </SelectTrigger>
              <SelectContent>
                {availableVolunteers.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Função</Label>
            <Input
              placeholder="Ex: Câmera"
              className="h-12 rounded-2xl"
              {...form.register("role")}
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl bg-primary text-primary-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Escalar Voluntário"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
