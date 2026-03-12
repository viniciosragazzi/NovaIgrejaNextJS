"use client"

import { useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { personSchema } from "@/lib/validations"
import { Person, PersonFormData } from "@/@types/person.types"
import { createPersonAction, updatePersonAction } from "@/actions/person.actions"

interface UsePersonFormProps {
  churchId: string
  onSuccess: (newPerson: Person) => void
  editingPerson?: Person | null
}

export function usePersonForm({
  churchId,
  onSuccess,
  editingPerson,
}: UsePersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      fullName: editingPerson?.fullName || "",
      whatsapp: editingPerson?.whatsapp || "",
      email: editingPerson?.email || "",
      address: editingPerson?.address || "",
      birthDate: editingPerson?.birthDate || "",
      firstVisitDate: editingPerson?.firstVisitDate || "",
      notes: editingPerson?.notes || "",
      type: (editingPerson?.type as any) || "visitor",
      ministry: editingPerson?.ministry || "",
      role: editingPerson?.role || "",
    },
  })

  async function onSubmit(data: PersonFormData) {
    setIsSubmitting(true)
    try {
      let result
      if (editingPerson) {
        result = await updatePersonAction(churchId, editingPerson.id, data)
      } else {
        result = await createPersonAction(churchId, data)
      }

      if (result.success) {
        toast.success(editingPerson ? "Atualizado!" : "Cadastrado!")
        onSuccess({
          id: editingPerson?.id || Math.random().toString(),
          ...data,
          type: data.type as any,
        })
        if (!editingPerson) form.reset()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Erro ao processar")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  }
}
