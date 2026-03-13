"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { submitPublicOfferingAction } from "@/actions/public.actions"
import { publicOfferingSchema, type PublicOfferingFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PublicOfferingPage({
  churchLabel,
  intro,
  pixKeyValue,
}: {
  churchLabel: string
  intro: string
  pixKeyValue: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pixPayload, setPixPayload] = useState("")
  const [pixLink, setPixLink] = useState("")
  const form = useForm<PublicOfferingFormData>({
    resolver: zodResolver(publicOfferingSchema),
    defaultValues: { amount: 20, donorName: "", description: "" },
  })

  async function handleSubmit(data: PublicOfferingFormData) {
    setIsSubmitting(true)
    const result = await submitPublicOfferingAction(churchLabel, data)
    setIsSubmitting(false)

    if (!result.success || !result.data) {
      toast.error(result.error || "Nao foi possivel gerar o PIX.")
      return
    }

    setPixPayload(result.data.pixPayload)
    setPixLink(result.data.pixLink)
    toast.success("PIX gerado com o valor informado.")
  }

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(pixPayload)
      toast.success("Codigo PIX copiado.")
    } catch {
      toast.error("Nao foi possivel copiar o codigo PIX.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
        <p className="text-sm leading-6 text-white/72">{intro}</p>
        <p className="mt-3 text-sm text-white/60">Chave PIX atual: {pixKeyValue}</p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Valor da oferta</Label>
          <Input
            type="number"
            step="0.01"
            {...form.register("amount", { valueAsNumber: true })}
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
          />
          {form.formState.errors.amount ? <p className="text-xs text-rose-300">{form.formState.errors.amount.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label className="text-white">Nome do ofertante</Label>
          <Input {...form.register("donorName")} className="h-11 rounded-xl border-white/10 bg-white/5 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Observacao</Label>
          <Textarea {...form.register("description")} className="min-h-24 rounded-xl border-white/10 bg-white/5 text-white" />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
          {isSubmitting ? "Gerando PIX..." : "Gerar PIX com valor"}
        </Button>
      </form>

      {pixPayload ? (
        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.04] p-4">
          <div>
            <p className="font-medium text-white">PIX gerado</p>
            <p className="mt-1 text-sm text-white/60">Use o botao abaixo para copiar o codigo com o valor escolhido.</p>
          </div>
          <Textarea value={pixPayload} readOnly className="min-h-28 rounded-xl border-white/10 bg-white/5 text-white" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={handleCopyPix} className="flex-1 rounded-xl">
              <Copy className="mr-2 h-4 w-4" />
              Copiar codigo PIX
            </Button>
            <a
              href={pixLink}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white no-underline"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Tentar abrir app PIX
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
