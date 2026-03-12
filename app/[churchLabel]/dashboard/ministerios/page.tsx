"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Users, Plus, Calendar, Music, Baby, MonitorPlay, Heart,
  MessageCircle, Check, X, AlertTriangle, ChevronRight,
  MoreHorizontal, Trash2, HeartHandshake
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { createScheduleAction } from "./actions"

// --- Tipagem Real ---
type Ministry = {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

type Volunteer = {
  id: string
  fullName: string
  whatsapp: string
  ministry?: string
  role?: string
}

interface MinistriesPageProps {
  churchId: string
  isStaff: boolean
  ministries: Ministry[]
  volunteers: Volunteer[]
  initialSchedules: any[]
}

const scheduleSchema = z.object({
  eventDate: z.string().min(1, "Data obrigatória"),
  eventName: z.string().min(2, "Nome do evento obrigatório"),
  ministryId: z.string().min(1, "Ministério obrigatório"),
  volunteerId: z.string().min(1, "Voluntário obrigatório"),
  role: z.string().min(1, "Função obrigatória"),
})

type ScheduleFormData = z.infer<typeof scheduleSchema>

export default function MinistriesPage({
  churchId,
  isStaff,
  ministries = [], // Valor padrão vazio
  volunteers = [], // Valor padrão vazio
  initialSchedules = [] // Valor padrão vazio
}: MinistriesPageProps) {  const [schedules, setSchedules] = useState(initialSchedules)
  const [selectedMinistry, setSelectedMinistry] = useState<string>("all")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const scheduleForm = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { eventDate: new Date().toISOString().split("T")[0] },
  })

  // Helpers de filtro
  const availableVolunteers = volunteers
  const filteredVolunteers = selectedMinistry === "all"
    ? availableVolunteers
    : availableVolunteers.filter(v => v.ministry === ministries.find(m => m.id === selectedMinistry)?.name)

  async function onScheduleSubmit(data: ScheduleFormData) {
    setIsSubmitting(true)
    const result = await createScheduleAction(churchId, data)
    if (result.success) {
      toast.success("Voluntário escalado!")
      setIsScheduleDialogOpen(false)
      scheduleForm.reset()
    } else {
      toast.error(result.error)
    }
    setIsSubmitting(false)
  }

  const sendWhatsApp = (v: Volunteer, role: string, event: string, date: string) => {
    const msg = encodeURIComponent(`Olá ${v.fullName}, você foi escalado para ${role} no ${event} (${date}). Confirma?`)
    window.open(`https://wa.me/55${v.whatsapp.replace(/\D/g, "")}?text=${msg}`, "_blank")
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-8 max-w-6xl mx-auto pb-24">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Ministérios</h1>
          <p className="text-zinc-500 text-sm font-medium">Gestão de equipes e escalas de serviço.</p>
        </div>
        {isStaff && (
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger >
              <Button className="h-12 rounded-2xl bg-zinc-900 shadow-xl hover:scale-105 transition-all">
                <Plus className="mr-2 h-4 w-4" /> Nova Escala
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[32px] border-0 shadow-2xl">
              <DialogHeader><DialogTitle>Escalar Voluntário</DialogTitle></DialogHeader>
              <form onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-zinc-400">Data</Label>
                    <Input type="date" {...scheduleForm.register("eventDate")} className="h-12 rounded-xl bg-zinc-50 border-0" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-zinc-400">Evento</Label>
                    <Input placeholder="Culto..." {...scheduleForm.register("eventName")} className="h-12 rounded-xl bg-zinc-50 border-0" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase text-zinc-400">Voluntário</Label>
                  <Select onValueChange={(v) => scheduleForm.setValue("volunteerId", v)}>
                    <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-0"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {availableVolunteers.map(v => <SelectItem key={v.id} value={v.id}>{v.fullName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-zinc-900 text-white font-bold">
                  {isSubmitting ? "Salvando..." : "Confirmar Escala"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="ministries" className="space-y-8">
        <TabsList className="h-14 w-full justify-start rounded-[20px] bg-white p-1.5 shadow-sm border border-zinc-100">
          <TabsTrigger value="ministries" className="rounded-xl px-6 data-[state=active]:bg-zinc-900 data-[state=active]:text-white">Equipes</TabsTrigger>
          <TabsTrigger value="volunteers" className="rounded-xl px-6 data-[state=active]:bg-zinc-900 data-[state=active]:text-white">Voluntários</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-xl px-6 data-[state=active]:bg-zinc-900 data-[state=active]:text-white">Escalas</TabsTrigger>
        </TabsList>

        {/* --- ABA EQUIPES --- */}
        <TabsContent value="ministries" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 outline-none">
          {ministries.map((m) => (
            <Card key={m.id} className="rounded-[32px] border-0 shadow-sm overflow-hidden hover:scale-[1.02] transition-transform">
              <CardContent className="p-6">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner", m.color)}>
                  <Users className="text-white" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{m.description}</p>
                <div className="mt-6 pt-4 border-t border-zinc-50 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Ver Membros</span>
                  <ChevronRight className="h-4 w-4 text-zinc-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* --- ABA VOLUNTÁRIOS --- */}
        <TabsContent value="volunteers" className="space-y-4 outline-none">
          <Card className="rounded-[40px] border-0 shadow-sm overflow-hidden bg-white">
            <div className="divide-y divide-zinc-50">
              {filteredVolunteers.map((v) => (
                <div key={v.id} className="flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <HeartHandshake className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900">{v.fullName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="rounded-full text-[9px] uppercase border-amber-200 text-amber-700 bg-amber-50">
                          {v.ministry || "Sem Equipe"}
                        </Badge>
                        <span className="text-[11px] text-zinc-400 font-medium">{v.whatsapp}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    onClick={() => sendWhatsApp(v, "sua função", "próximo evento", "nesta data")}>
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* --- ABA ESCALAS --- */}
        <TabsContent value="schedule" className="space-y-4 outline-none">
          {schedules.map((s) => (
            <Card key={s.id} className="rounded-[32px] border-0 shadow-sm bg-white p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                    {new Date(s.eventDate).getDate()}
                  </div>
                  <div>
                    <h3 className="font-bold">{s.eventName}</h3>
                    <p className="text-xs text-zinc-400 capitalize">
                      {new Date(s.eventDate).toLocaleDateString('pt-BR', { weekday: 'long', month: 'long' })}
                    </p>
                  </div>
                </div>
                <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Escalado</Badge>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
