"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Users,
  Plus,
  Calendar,
  MessageCircle,
  ChevronRight,
  Music,
  Baby,
  Monitor,
  Heart
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { toast } from "sonner"
import { cn } from "@/lib/utils"

import {
  createScheduleAction,
  toggleConfirmationAction
} from "./actions"



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
  type: string
}

interface Schedule {
  id: string
  eventDate: string
  eventName: string
  ministryId: string
  confirmed: boolean
  role: string
  person: { fullName: string; whatsapp: string }
}

interface MinistriesPageProps {
  churchId: string
  isStaff: boolean
  ministries: Ministry[]
  volunteers: Volunteer[]
  initialSchedules: Schedule[]
}



const ministryIcons: Record<string, any> = {
  Louvor: Music,
  Infantil: Baby,
  Midia: Monitor,
  Mídia: Monitor,
  Diaconia: Heart,
}



const scheduleSchema = z.object({
  eventDate: z.string().min(1),
  eventName: z.string().min(2),
  ministryId: z.string().min(1),
  volunteerId: z.string().min(1),
  role: z.string().min(1),
})

type ScheduleFormData = z.infer<typeof scheduleSchema>



export default function MinistriesPage({
  churchId,
  isStaff,
  ministries = [],
  volunteers = [],
  initialSchedules = []
}: MinistriesPageProps) {

  const [selectedMinistry, setSelectedMinistry] = useState<string>("all")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const scheduleForm = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      eventDate: new Date().toISOString().split("T")[0]
    },
  })



  const availableVolunteers = volunteers.filter(
    v => v.type === "VOLUNTEER" || v.type === "volunteer"
  )



  const filteredVolunteers =
    selectedMinistry === "all"
      ? availableVolunteers
      : availableVolunteers.filter(
        v => v.ministry === ministries.find(m => m.id === selectedMinistry)?.name
      )



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



  const sendWhatsApp = (
    v: any,
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



  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 pb-24 lg:p-8"
    >

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold tracking-tight">
            Ministérios
          </h1>

          <p className="text-sm text-muted-foreground">
            Gerencie voluntários e escalas
          </p>

        </div>


        {isStaff && (

          <Dialog
            open={isScheduleDialogOpen}
            onOpenChange={setIsScheduleDialogOpen}
          >

            <DialogTrigger >

              <Button className="gap-2 rounded-2xl bg-primary px-6 text-primary-foreground">

                <Plus className="h-4 w-4" />

                Nova Escala

              </Button>

            </DialogTrigger>



            <DialogContent className="rounded-3xl sm:max-w-md">

              <DialogHeader>

                <DialogTitle>
                  Escalar Voluntário
                </DialogTitle>

              </DialogHeader>



              <form
                onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)}
                className="space-y-4"
              >

                <div className="space-y-2">

                  <Label>Data do Evento</Label>

                  <Input
                    type="date"
                    className="h-12 rounded-2xl"
                    {...scheduleForm.register("eventDate")}
                  />

                </div>



                <div className="space-y-2">

                  <Label>Nome do Evento</Label>

                  <Input
                    placeholder="Ex: Culto Domingo"
                    className="h-12 rounded-2xl"
                    {...scheduleForm.register("eventName")}
                  />

                </div>



                <div className="space-y-2">

                  <Label>Ministério</Label>

                  <Select
                    onValueChange={(v) =>
                      scheduleForm.setValue("ministryId", v as string)
                    }
                  >

                    <SelectTrigger className="h-12 rounded-2xl">

                      <SelectValue placeholder="Selecione o ministério" />

                    </SelectTrigger>

                    <SelectContent>

                      {ministries.map((m) => (

                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>

                      ))}

                    </SelectContent>

                  </Select>

                </div>



                <div className="space-y-2">

                  <Label>Voluntário</Label>

                  <Select
                    onValueChange={(v) =>
                      scheduleForm.setValue("volunteerId", v as string)
                    }
                  >

                    <SelectTrigger className="h-12 rounded-2xl">

                      <SelectValue placeholder="Selecione o voluntário" />

                    </SelectTrigger>

                    <SelectContent>

                      {availableVolunteers.map((v) => (

                        <SelectItem key={v.id} value={v.id}>
                          {v.fullName}
                        </SelectItem>

                      ))}

                    </SelectContent>

                  </Select>

                </div>



                <div className="space-y-2">

                  <Label>Função</Label>

                  <Input
                    placeholder="Ex: Câmera"
                    className="h-12 rounded-2xl"
                    {...scheduleForm.register("role")}
                  />

                </div>



                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-primary text-primary-foreground"
                  disabled={isSubmitting}
                >

                  {isSubmitting
                    ? "Processando..."
                    : "Escalar Voluntário"}

                </Button>

              </form>

            </DialogContent>

          </Dialog>

        )}

      </div>



      <Tabs defaultValue="ministries" className="space-y-6">

        <TabsList className="h-12 rounded-2xl bg-muted p-1">

          <TabsTrigger value="ministries" className="rounded-xl">
            Ministérios
          </TabsTrigger>

          <TabsTrigger value="volunteers" className="rounded-xl">
            Voluntários
          </TabsTrigger>

          <TabsTrigger value="schedule" className="rounded-xl">
            Escalas
          </TabsTrigger>

        </TabsList>



        {/* MINISTRIES */}

        <TabsContent value="ministries">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {ministries.map((m) => (

              <motion.div
                key={m.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl bg-card p-5 shadow-sm"
              >

                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: m.color || "#e5e5e5" }}
                >

                  <Users className="h-5 w-5" />

                </div>

                <h3 className="font-semibold">
                  {m.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {m.description}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <Badge variant="secondary" className="rounded-full">
                    {
                      volunteers.filter(
                        v => v.ministry === m.name
                      ).length
                    } voluntários
                  </Badge>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />

                </div>

              </motion.div>

            ))}

          </div>

        </TabsContent>



        {/* VOLUNTEERS */}

        <TabsContent value="volunteers">

          {/* FILTROS */}

          <div className="flex flex-wrap gap-2 mb-4">

            <Button
              size="sm"
              onClick={() => setSelectedMinistry("all")}
              className={cn(
                "rounded-full",
                selectedMinistry === "all"
                  ? "bg-black text-white"
                  : "bg-muted"
              )}
            >
              Todos
            </Button>

            {ministries.map((m) => {

              const Icon = ministryIcons[m.name] || Users

              return (

                <Button
                  key={m.id}
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMinistry(m.id)}
                  className={cn(
                    "gap-2 rounded-full",
                    selectedMinistry === m.id &&
                    "bg-black text-white border-black"
                  )}
                >

                  <Icon className="h-4 w-4" />

                  {m.name}

                </Button>

              )
            })}

          </div>



          <div className="space-y-3">

            {filteredVolunteers.map((v) => (

              <div
                key={v.id}
                className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-sm font-semibold">

                    {v.fullName
                      .split(" ")
                      .map(n => n[0])
                      .join("")}

                  </div>

                  <div>

                    <p className="font-medium">
                      {v.fullName}
                    </p>

                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs"
                    >

                      {v.ministry || "Disponível"}

                    </Badge>

                  </div>

                </div>

                <Button
                  size="sm"
                  className="gap-2 rounded-xl bg-[#25d366] text-white hover:bg-[#20bd5a]"
                  onClick={() =>
                    sendWhatsApp(
                      v,
                      "sua função",
                      "próximo culto",
                      "domingo"
                    )
                  }
                >

                  <MessageCircle className="h-4 w-4" />

                </Button>

              </div>

            ))}

          </div>

        </TabsContent>



        {/* SCHEDULE */}

        <TabsContent value="schedule">

          <div className="space-y-4">

            {initialSchedules.map((s) => (

              <motion.div
                key={s.id}
                className="rounded-3xl bg-card p-5 shadow-sm"
              >

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">

                      <Calendar className="h-5 w-5" />

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {s.eventName}
                      </h3>

                      <p className="text-sm text-muted-foreground">

                        {new Date(s.eventDate).toLocaleDateString(
                          "pt-BR",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                          }
                        )}

                      </p>

                    </div>

                  </div>

                  <Badge
                    className={cn(
                      "rounded-full",
                      s.confirmed
                        ? "bg-[#8ee4af]"
                        : "bg-[#f9a8d4]"
                    )}
                  >

                    {s.confirmed ? "Confirmado" : "Pendente"}

                  </Badge>

                </div>



                <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">

                  <div>

                    <p className="text-sm font-medium">
                      {s.person.fullName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {s.role}
                    </p>

                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-2 rounded-lg text-xs"
                    onClick={() =>
                      sendWhatsApp(
                        s.person,
                        s.role,
                        s.eventName,
                        s.eventDate
                      )
                    }
                  >

                    <MessageCircle className="h-3 w-3" />

                    Confirmar

                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </TabsContent>

      </Tabs>

    </motion.div>
  )
}
