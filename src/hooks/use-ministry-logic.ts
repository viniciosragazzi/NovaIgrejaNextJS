"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Schedule, ScheduleFormData } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"
import {
  createScheduleAction,
  deleteScheduleAction,
  updateScaleVolunteerAction,
} from "@/actions/ministry.actions"

interface UseMinistryLogicProps {
  churchId: string
  volunteers: Volunteer[]
  onSchedulesCreated: (schedules: Schedule[]) => void
  onScheduleDeleted: (scheduleId: string) => void
  onScheduleUpdated: (schedule: Schedule) => void
}

export function useMinistryLogic({
  churchId,
  volunteers,
  onSchedulesCreated,
  onScheduleDeleted,
  onScheduleUpdated,
}: UseMinistryLogicProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<string>("all")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableVolunteers = volunteers.filter((volunteer) => volunteer.type === "volunteer")

  const handleScheduleSubmit = async (data: ScheduleFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createScheduleAction(churchId, data)

      if (result.success && result.data) {
        onSchedulesCreated(result.data)
        toast.success(result.data.length > 1 ? `${result.data.length} voluntarios escalados!` : "Voluntario escalado!")
        setIsScheduleDialogOpen(false)
        return true
      }

      toast.error(result.error)
      return false
    } catch {
      toast.error("Erro ao salvar escala")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPeopleToScale = async (baseSchedule: Schedule, volunteerIds: string[]) => {
    if (volunteerIds.length === 0) {
      toast.error("Selecione pelo menos um voluntario.")
      return false
    }

    const result = await createScheduleAction(churchId, {
      eventDate: baseSchedule.eventDate.split("T")[0],
      eventName: baseSchedule.eventName,
      ministryId: baseSchedule.ministryId,
      volunteerIds,
      role: baseSchedule.role,
    })

    if (!result.success || !result.data) {
      toast.error(result.error)
      return false
    }

    onSchedulesCreated(result.data)
    toast.success("Pessoas adicionadas a escala!")
    return true
  }

  const handleReplaceVolunteer = async (scaleId: string, volunteerId: string) => {
    const result = await updateScaleVolunteerAction(churchId, scaleId, volunteerId)

    if (!result.success || !result.data) {
      toast.error(result.error)
      return false
    }

    onScheduleUpdated(result.data)
    toast.success("Pessoa da escala atualizada!")
    return true
  }

  const handleDeleteSchedule = async (scheduleId: string) => {
    const result = await deleteScheduleAction(churchId, scheduleId)

    if (!result.success) {
      toast.error(result.error)
      return false
    }

    onScheduleDeleted(scheduleId)
    toast.success("Escala excluida!")
    return true
  }

  const sendWhatsApp = (
    volunteer: { fullName: string; whatsapp: string },
    role: string,
    event: string,
    date: string
  ) => {
    const message = encodeURIComponent(
      `Ola ${volunteer.fullName}, voce foi escalado para ${role} no ${event} (${date}). Confirma?`
    )
    window.open(
      `https://wa.me/55${volunteer.whatsapp.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    )
  }

  return {
    selectedMinistry,
    setSelectedMinistry,
    isScheduleDialogOpen,
    setIsScheduleDialogOpen,
    isSubmitting,
    availableVolunteers,
    handleScheduleSubmit,
    handleAddPeopleToScale,
    handleReplaceVolunteer,
    handleDeleteSchedule,
    sendWhatsApp,
  }
}
