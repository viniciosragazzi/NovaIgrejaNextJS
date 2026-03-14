"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { manualIncomeSchema, ManualIncomeFormData, incomeCategoryLabels } from "@/lib/validations"

interface IncomeFormProps {
  onSubmit: (data: ManualIncomeFormData) => Promise<boolean>
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function IncomeForm({ onSubmit, isOpen, onOpenChange }: IncomeFormProps) {
  const form = useForm<ManualIncomeFormData>({
    resolver: zodResolver(manualIncomeSchema),
    defaultValues: {
      amount: 0,
      category: "offering",
      date: new Date().toISOString().split("T")[0],
    },
  })

  const handleSubmit = async (data: ManualIncomeFormData) => {
    const success = await onSubmit(data)
    if (success) form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={<Button className="gap-2 rounded-2xl bg-primary px-6 text-primary-foreground" />}
      >
        <Plus className="h-4 w-4" />
        Registrar Entrada
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Entrada</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Valor (R$)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0,00"
              className="h-12 rounded-2xl"
              {...form.register("amount", { valueAsNumber: true })}
            />
            {form.formState.errors.amount && (
              <p className="text-xs text-destructive">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={form.watch("category")}
              onValueChange={(v) => form.setValue("category", v as ManualIncomeFormData["category"])}
            >
              <SelectTrigger className="h-12 rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(incomeCategoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data</Label>
            <Input
              type="date"
              className="h-12 rounded-2xl"
              {...form.register("date")}
            />
          </div>

          <div className="space-y-2">
            <Label>Nome do Doador (opcional)</Label>
            <Input
              placeholder="Nome"
              className="h-12 rounded-2xl"
              {...form.register("donorName")}
            />
          </div>

          <div className="space-y-2">
            <Label>Descricao (opcional)</Label>
            <Input
              placeholder="Observacoes"
              className="h-12 rounded-2xl"
              {...form.register("description")}
            />
          </div>

          <Button type="submit" className="h-12 w-full rounded-2xl bg-primary text-primary-foreground">
            Registrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
