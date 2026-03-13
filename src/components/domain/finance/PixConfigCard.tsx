"use client"

import { useState } from "react"
import { QrCode, Edit2, Upload, Check, Copy } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
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
import { pixConfigSchema, PixConfigFormData, pixKeyTypeLabels } from "@/lib/validations"
import { PixConfig } from "@/@types/finance.types"

interface PixConfigCardProps {
  config: PixConfig | null
  onSubmit: (data: PixConfigFormData) => Promise<void>
  onCopy: () => void
  copied: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function PixConfigCard({
  config,
  onSubmit,
  onCopy,
  copied,
  isOpen,
  onOpenChange,
}: PixConfigCardProps) {
  const form = useForm<PixConfigFormData>({
    resolver: zodResolver(pixConfigSchema),
    defaultValues: config || {
      pixKeyType: "email",
      pixKeyValue: "",
    },
  })

  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--status-success))]">
            <QrCode className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Configuracao PIX</h2>
            <p className="text-sm text-muted-foreground">Configure sua chave para receber doacoes</p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogTrigger >
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl">
              <Edit2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Configurar PIX</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Chave</Label>
                <Select
                  value={form.watch("pixKeyType")}
                  onValueChange={(v) => form.setValue("pixKeyType", v as PixConfigFormData["pixKeyType"])}
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(pixKeyTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Chave PIX</Label>
                <Input
                  placeholder="Digite sua chave PIX"
                  className="h-12 rounded-2xl"
                  {...form.register("pixKeyValue")}
                />
                {form.formState.errors.pixKeyValue && (
                  <p className="text-xs text-destructive">{form.formState.errors.pixKeyValue.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>QR Code (opcional)</Label>
                <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arraste ou clique para enviar</p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="h-12 w-full rounded-2xl bg-primary text-primary-foreground">
                Salvar Configuracao
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {config ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-2xl bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Tipo de Chave</p>
              <p className="font-medium">{pixKeyTypeLabels[config.pixKeyType]}</p>
            </div>
            <div className="flex-1 rounded-2xl bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Chave</p>
              <p className="font-medium">{config.pixKeyValue}</p>
            </div>
          </div>

          {config.copyPasteCode && (
            <div className="rounded-2xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Copia e Cola</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 rounded-xl text-xs"
                  onClick={onCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
              <p className="break-all font-mono text-xs text-muted-foreground">{config.copyPasteCode}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Nenhuma chave PIX configurada</p>
          <Button
            variant="outline"
            className="mt-4 rounded-2xl"
            onClick={() => onOpenChange(true)}
          >
            Configurar Agora
          </Button>
        </div>
      )}
    </div>
  )
}
