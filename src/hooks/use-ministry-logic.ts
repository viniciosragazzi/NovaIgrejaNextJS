"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ScheduleFormData } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"
import { createScheduleAction } from "@/actions/ministry.actions"

interface UseMinistryLogicProps {
  churchId: string
  volunteers: Volunteer[]
}

export function useMinistryLogic({
  churchId,
  volunteers,
}: UseMinistryLogicProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<string>("all")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableVolunteers = volunteers.filter(
    (v) => v.type === "volunteer"
  )

  const handleScheduleSubmit = async (data: ScheduleFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createScheduleAction(churchId, data)

      if (result.success) {
        toast.success("Voluntário escalado!")
        setIsScheduleDialogOpen(false)
        return true
      } else {
        toast.error(result.error)
        return false
      }
    } catch (error) {
      toast.error("Erro ao salvar escala")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendWhatsApp = (
    v: { fullName: string; whatsapp: string },
    role: string,
    event: string,
    date: string
  ) => {
    const msg = encodeURIComponent(
      `Olá ${v.fullName}, você foi escalado para ${role} no ${event} (${date}). Confirma?`
    )
    window.open(
      `https://wa.me/55${v.whatsapp.replace(/\D/g, "")}?text=${msg}`,
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
    sendWhatsApp,
  }
}
