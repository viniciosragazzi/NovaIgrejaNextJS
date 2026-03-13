"use client"

import { AnimatePresence, motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { PersonFormData, PersonType } from "@/@types/person.types"

interface PersonFormProps {
  form: UseFormReturn<PersonFormData>
  onSubmit: () => void
  isSubmitting: boolean
  isEditing?: boolean
}

export function PersonForm({
  form,
  onSubmit,
  isSubmitting,
  isEditing = false,
}: PersonFormProps) {
  const currentType = form.watch("type")

  function formatWhatsApp(value: string): string {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4 pb-6">
      <div className="space-y-1">
        <Label className="text-[10px] font-bold uppercase text-zinc-400">
          Nome Completo *
        </Label>
        <Input
          {...form.register("fullName")}
          className="h-12 rounded-xl bg-zinc-50 border-0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            WhatsApp *
          </Label>
          <Input
            {...form.register("whatsapp")}
            onChange={(e) =>
              form.setValue("whatsapp", formatWhatsApp(e.target.value))
            }
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            E-mail
          </Label>
          <Input
            {...form.register("email")}
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-[10px] font-bold uppercase text-zinc-400">
          Vínculo
        </Label>
        <Select
          value={currentType}
          onValueChange={(v) => form.setValue("type", v as PersonType)}
        >
          <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-0">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 shadow-2xl">
            <SelectItem value="visitor">Visitante</SelectItem>
            <SelectItem value="member">Membro</SelectItem>
            <SelectItem value="volunteer">Voluntário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        {currentType === "volunteer" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 overflow-hidden border-t pt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] font-bold uppercase text-amber-600">
                  Ministério
                </Label>
                <Input
                  {...form.register("ministry")}
                  placeholder="Ex: Louvor"
                  className="h-12 rounded-xl bg-amber-50/30 border-0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-bold uppercase text-amber-600">
                  Função
                </Label>
                <Input
                  {...form.register("role")}
                  placeholder="Ex: Guitarra"
                  className="h-12 rounded-xl bg-amber-50/30 border-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            Endereço
          </Label>
          <Input
            {...form.register("address")}
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            Nascimento
          </Label>
          <Input
            {...form.register("birthDate")}
            type="date"
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            Primeira Visita
          </Label>
          <Input
            {...form.register("firstVisitDate")}
            type="date"
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">
            Observações
          </Label>
          <Input
            {...form.register("notes")}
            className="h-12 rounded-xl bg-zinc-50 border-0"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-14 w-full rounded-2xl bg-zinc-900 text-white font-bold"
      >
        {isSubmitting ? (
          <Spinner />
        ) : isEditing ? (
          "Salvar Alterações"
        ) : (
          "Confirmar Cadastro"
        )}
      </Button>
    </form>
  )
}
