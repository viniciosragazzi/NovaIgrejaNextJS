"use client"

import { useState } from "react"
import { ChevronRight, Send, Calendar, Phone, User, MessageSquare, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { registerVisitorAction } from "@/actions/landing.actions"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

function FormContent({
  churchLabel,
  onClose,
}: {
  churchLabel: string
  onClose?: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
    source: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await registerVisitorAction(churchLabel, formData)

    setIsSubmitting(false)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        phone: "",
        birthDate: "",
        source: "",
      })
      onClose?.()
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Cadastro realizado!</h3>
        <p className="text-sm text-muted-foreground">Seja muito bem-vindo!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <User className="h-4 w-4 text-muted-foreground" />
          Nome Completo
        </Label>
        <Input
          id="name"
          placeholder="Digite seu nome"
          required
          value={formData.name}
          onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
          className="h-12 rounded-2xl border-border bg-muted/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Phone className="h-4 w-4 text-muted-foreground" />
          WhatsApp
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={(e) =>
            setFormData((current) => ({ ...current, phone: formatPhone(e.target.value) }))
          }
          maxLength={15}
          required
          className="h-12 rounded-2xl border-border bg-muted/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthdate" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Data de Nascimento
        </Label>
        <Input
          id="birthdate"
          type="date"
          required
          value={formData.birthDate}
          onChange={(e) => setFormData((current) => ({ ...current, birthDate: e.target.value }))}
          className="h-12 rounded-2xl border-border bg-muted/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="source" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          Como nos conheceu?
        </Label>
        <Select
          value={formData.source}
          onValueChange={(value) => setFormData((current) => ({ ...current, source: value ?? "" }))}
        >
          <SelectTrigger id="source" className="h-12 rounded-2xl border-border bg-muted/50">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="friend">Indicação de amigo</SelectItem>
            <SelectItem value="family">Familiar</SelectItem>
            <SelectItem value="social">Redes Sociais</SelectItem>
            <SelectItem value="search">Busca na Internet</SelectItem>
            <SelectItem value="passing">Passando pela rua</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar Cadastro
          </>
        )}
      </Button>
    </form>
  )
}

export function VisitorFormTrigger({ churchLabel }: { churchLabel: string }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  const triggerButton = (
    <Button
      size="lg"
      className="flex h-16 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-xl shadow-black/20 hover:bg-primary/90"
    >
      <UserPlus className="h-5 w-5" />
      <span>Sou Novo</span>
      <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#8ee4af]">
        <ChevronRight className="h-4 w-4 text-foreground" />
      </div>
    </Button>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl">Cadastro de Visitante</DrawerTitle>
            <DrawerDescription>
              Preencha seus dados para nos conhecermos melhor
            </DrawerDescription>
          </DrawerHeader>
          <FormContent churchLabel={churchLabel} onClose={() => setOpen(false)} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" className="h-12 rounded-2xl">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Cadastro de Visitante</DialogTitle>
          <DialogDescription>
            Preencha seus dados para nos conhecermos melhor
          </DialogDescription>
        </DialogHeader>
        <FormContent churchLabel={churchLabel} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
