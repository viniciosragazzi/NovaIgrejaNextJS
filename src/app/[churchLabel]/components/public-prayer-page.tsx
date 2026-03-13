"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { submitPrayerRequestAction } from "@/actions/public.actions"
import { publicPrayerRequestSchema, type PublicPrayerRequestFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PublicPrayerPage({
  churchLabel,
  intro,
  successMessage,
}: {
  churchLabel: string
  intro: string
  successMessage: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<PublicPrayerRequestFormData>({
    resolver: zodResolver(publicPrayerRequestSchema),
    defaultValues: { name: "", contact: "", request: "" },
  })

  async function handleSubmit(data: PublicPrayerRequestFormData) {
    setIsSubmitting(true)
    const result = await submitPrayerRequestAction(churchLabel, data)
    setIsSubmitting(false)

    if (!result.success) {
      toast.error(result.error || "Nao foi possivel enviar o pedido.")
      return
    }

    form.reset()
    toast.success(successMessage || "Pedido de oracao enviado com sucesso.")
  }

  return (
    <div className="space-y-5">
      {intro ? <p className="text-sm leading-6 text-white/72">{intro}</p> : null}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Nome</Label>
          <Input {...form.register("name")} className="h-11 rounded-xl border-white/10 bg-white/5 text-white" />
          {form.formState.errors.name ? <p className="text-xs text-rose-300">{form.formState.errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label className="text-white">Contato</Label>
          <Input {...form.register("contact")} className="h-11 rounded-xl border-white/10 bg-white/5 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Pedido</Label>
          <Textarea {...form.register("request")} className="min-h-32 rounded-xl border-white/10 bg-white/5 text-white" />
          {form.formState.errors.request ? <p className="text-xs text-rose-300">{form.formState.errors.request.message}</p> : null}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
          {isSubmitting ? "Enviando..." : "Enviar pedido de oracao"}
        </Button>
      </form>
    </div>
  )
}
