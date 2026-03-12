"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Calendar,
  Plus,
  Clock,
  Trash2,
  Edit2,
  Eye,
  X,
  Save,
  BookOpen,
  Users,
  Heart,
  Music,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
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
import {
  scheduleEventSchema
} from "@/lib/validations"
import { ScheduleEvent, DayOfWeek } from "@/@types/shared.types"
import { dayOfWeekLabels } from "@/lib/constants"

const mockEvents: ScheduleEvent[] = [
  {
    id: "1",
    name: "Escola Biblica",
    dayOfWeek: "sunday",
    time: "09:00",
    description: "Estudo biblico para todas as idades",
  },
  {
    id: "2",
    name: "Culto de Celebracao",
    dayOfWeek: "sunday",
    time: "10:30",
    description: "Culto principal com louvor e pregacao",
  },
  {
    id: "3",
    name: "Estudo Biblico",
    dayOfWeek: "wednesday",
    time: "19:30",
    description: "Aprofundamento nas escrituras",
  },
  {
    id: "4",
    name: "Reuniao de Oracao",
    dayOfWeek: "friday",
    time: "20:00",
    description: "Momento de oracao e intercessao",
  },
]

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

const eventIcons: Record<string, React.ReactNode> = {
  escola: <BookOpen className="h-5 w-5" />,
  culto: <Music className="h-5 w-5" />,
  estudo: <BookOpen className="h-5 w-5" />,
  oracao: <Heart className="h-5 w-5" />,
  reuniao: <Users className="h-5 w-5" />,
  celula: <Users className="h-5 w-5" />,
}

function getEventIcon(name: string) {
  const lowerName = name.toLowerCase()
  for (const [key, icon] of Object.entries(eventIcons)) {
    if (lowerName.includes(key)) return icon
  }
  return <Calendar className="h-5 w-5" />
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

type EventFormData = Omit<ScheduleEvent, "id">

export default function SchedulePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>(mockEvents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(scheduleEventSchema.omit({ id: true })),
    defaultValues: {
      dayOfWeek: "sunday",
    },
  })

  const watchedValues = watch()

  const eventsByDay = dayOrder.reduce(
    (acc, day) => {
      acc[day] = events
        .filter((e) => e.dayOfWeek === day)
        .sort((a, b) => a.time.localeCompare(b.time))
      return acc
    },
    {} as Record<string, ScheduleEvent[]>
  )

  async function onSubmit(data: EventFormData) {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id ? { ...data, id: e.id } : e
        )
      )
    } else {
      const newEvent: ScheduleEvent = {
        id: Date.now().toString(),
        ...data,
      }
      setEvents([...events, newEvent])
    }

    setIsModalOpen(false)
    setEditingEvent(null)
    reset()
    setIsSubmitting(false)
  }

  function openEditModal(event: ScheduleEvent) {
    setEditingEvent(event)
    setValue("name", event.name)
    setValue("dayOfWeek", event.dayOfWeek)
    setValue("time", event.time)
    setValue("description", event.description || "")
    setIsModalOpen(true)
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id))
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingEvent(null)
    reset()
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Programacao Semanal</h1>
          <p className="text-muted-foreground">
            Configure os cultos e eventos da sua igreja
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-12 rounded-2xl"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Ocultar Preview" : "Ver Preview"}
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger >
              <Button
                className="h-12 rounded-2xl bg-primary"
                onClick={() => {
                  setEditingEvent(null)
                  reset()
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {editingEvent ? "Editar Evento" : "Novo Evento"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Evento *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="h-12 rounded-xl border-0 bg-muted/50"
                    placeholder="Ex: Culto de Celebracao"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dayOfWeek">Dia da Semana *</Label>
                    <Select
                      defaultValue={editingEvent?.dayOfWeek || "sunday"}
                      onValueChange={(value) =>
                        setValue(
                          "dayOfWeek",
                          value as ScheduleEvent["dayOfWeek"]
                        )
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-0 bg-muted/50">
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        {dayOrder.map((day) => (
                          <SelectItem key={day} value={day}>
                            {dayOfWeekLabels[day as DayOfWeek]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horario *</Label>
                    <Input
                      id="time"
                      type="time"
                      {...register("time")}
                      className="h-12 rounded-xl border-0 bg-muted/50"
                    />
                    {errors.time && (
                      <p className="text-xs text-destructive">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descricao</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="min-h-20 rounded-xl border-0 bg-muted/50 resize-none"
                    placeholder="Uma breve descricao do evento..."
                  />
                </div>

                {/* Live Preview */}
                {watchedValues.name && (
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Preview do Card
                    </p>
                    <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                        {getEventIcon(watchedValues.name || "")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {watchedValues.name || "Nome do Evento"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dayOfWeekLabels[watchedValues.dayOfWeek || "sunday"]}{" "}
                          - {watchedValues.time || "00:00"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 flex-1 rounded-xl"
                    onClick={closeModal}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 flex-1 rounded-xl bg-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Preview Card */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="rounded-2xl border-0 bg-primary shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-primary-foreground">
                  <span>Preview - Pagina Inicial</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={() => setShowPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl bg-card p-4">
                  <h3 className="mb-4 font-semibold text-foreground">
                    Programacao Semanal
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {events.slice(0, 4).map((event) => (
                      <div
                        key={event.id}
                        className="flex min-w-40 flex-col gap-2 rounded-xl bg-muted/50 p-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          {getEventIcon(event.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{event.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {dayOfWeekLabels[event.dayOfWeek as DayOfWeek]} - {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events by Day */}
      <motion.div variants={item} className="space-y-4">
        {dayOrder.map((day) => {
          const dayEvents = eventsByDay[day]
          if (dayEvents.length === 0) return null

          return (
            <Card key={day} className="rounded-2xl border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {dayOfWeekLabels[day as DayOfWeek]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {dayEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between gap-4 rounded-xl bg-muted/50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          {getEventIcon(event.name)}
                        </div>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {event.time}
                            {event.description && (
                              <span className="hidden sm:inline">
                                - {event.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditModal(event)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => deleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          )
        })}

        {events.length === 0 && (
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Calendar className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                Nenhum evento cadastrado
              </p>
              <Button
                className="mt-4 rounded-xl bg-primary"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.div>
  )
}
