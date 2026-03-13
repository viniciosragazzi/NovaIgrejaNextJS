"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { personSchema } from "@/lib/validations"
import { Person, PersonFormData, PersonType } from "@/@types/person.types"
import { createPersonAction, updatePersonAction } from "@/actions/person.actions"

interface UsePersonFormProps {
  churchId: string
  onSuccess: (newPerson: Person) => void
  editingPerson?: Person | null
  defaultValues?: Partial<PersonFormData>
}

export function usePersonForm({
  churchId,
  onSuccess,
  editingPerson,
  defaultValues,
}: UsePersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const initialValues = useMemo<PersonFormData>(() => ({
    fullName: editingPerson?.fullName || defaultValues?.fullName || "",
    whatsapp: editingPerson?.whatsapp || defaultValues?.whatsapp || "",
    email: editingPerson?.email || defaultValues?.email || "",
    address: editingPerson?.address || defaultValues?.address || "",
    birthDate: editingPerson?.birthDate || defaultValues?.birthDate || "",
    firstVisitDate: editingPerson?.firstVisitDate || defaultValues?.firstVisitDate || "",
    notes: editingPerson?.notes || defaultValues?.notes || "",
    type: editingPerson?.type || defaultValues?.type || "visitor",
    ministry: editingPerson?.ministry || defaultValues?.ministry || "",
    role: editingPerson?.role || defaultValues?.role || "",
  }), [
    defaultValues?.address,
    defaultValues?.birthDate,
    defaultValues?.email,
    defaultValues?.firstVisitDate,
    defaultValues?.fullName,
    defaultValues?.ministry,
    defaultValues?.notes,
    defaultValues?.role,
    defaultValues?.type,
    defaultValues?.whatsapp,
    editingPerson?.address,
    editingPerson?.birthDate,
    editingPerson?.email,
    editingPerson?.firstVisitDate,
    editingPerson?.fullName,
    editingPerson?.ministry,
    editingPerson?.notes,
    editingPerson?.role,
    editingPerson?.type,
    editingPerson?.whatsapp,
  ])

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [form, initialValues])

  async function onSubmit(data: PersonFormData) {
    setIsSubmitting(true)
    try {
      const result = editingPerson
        ? await updatePersonAction(churchId, editingPerson.id, data)
        : await createPersonAction(churchId, data)

      if (result.success) {
        toast.success(editingPerson ? "Pessoa atualizada com sucesso." : "Pessoa cadastrada com sucesso.")

        if (result.data) {
          onSuccess({
            ...result.data,
            type: result.data.type as PersonType,
          })
        }

        if (!editingPerson) {
          form.reset(initialValues)
        }
      } else {
        toast.error(result.error || "Nao foi possivel salvar os dados da pessoa.")
      }
    } catch {
      toast.error("Erro inesperado ao processar o formulario.")
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
