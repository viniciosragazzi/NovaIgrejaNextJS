"use client"

import { motion } from "framer-motion"
import { Users, Music, Baby, Monitor, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { Ministry, Schedule } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"
import { useMinistryLogic } from "@/hooks/use-ministry-logic"
import { MinistryCard } from "@/components/domain/ministries/MinistryCard"
import { VolunteerCard } from "@/components/domain/ministries/VolunteerCard"
import { ScheduleCard } from "@/components/domain/ministries/ScheduleCard"
import { ScheduleForm } from "@/components/domain/ministries/ScheduleForm"

const ministryIcons: Record<string, any> = {
  Louvor: Music,
  Infantil: Baby,
  Midia: Monitor,
  Mídia: Monitor,
  Diaconia: Heart,
}

interface MinistriesPageProps {
  churchId: string
  isStaff: boolean
  ministries: Ministry[]
  volunteers: Volunteer[]
  initialSchedules: Schedule[]
}

export default function MinistriesPage({
  churchId,
  isStaff,
  ministries = [],
  volunteers = [],
  initialSchedules = [],
}: MinistriesPageProps) {
  const {
    selectedMinistry,
    setSelectedMinistry,
    isScheduleDialogOpen,
    setIsScheduleDialogOpen,
    isSubmitting,
    availableVolunteers,
    handleScheduleSubmit,
    sendWhatsApp,
  } = useMinistryLogic({ churchId, volunteers })

  const filteredVolunteers =
    selectedMinistry === "all"
      ? availableVolunteers
      : availableVolunteers.filter(
          (v) =>
            v.ministry === ministries.find((m) => m.id === selectedMinistry)?.name
        )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 pb-24 lg:p-8"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ministérios</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie voluntários e escalas
          </p>
        </div>

        {isStaff && (
          <ScheduleForm
            ministries={ministries}
            availableVolunteers={availableVolunteers}
            onSubmit={handleScheduleSubmit}
            isSubmitting={isSubmitting}
            isOpen={isScheduleDialogOpen}
            onOpenChange={setIsScheduleDialogOpen}
          />
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
              <MinistryCard key={m.id} ministry={m} volunteers={volunteers} />
            ))}
          </div>
        </TabsContent>

        {/* VOLUNTEERS */}
        <TabsContent value="volunteers">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              size="sm"
              onClick={() => setSelectedMinistry("all")}
              className={cn(
                "rounded-full",
                selectedMinistry === "all" ? "bg-black text-white" : "bg-muted"
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
              <VolunteerCard
                key={v.id}
                volunteer={v}
                onSendWhatsApp={(v) =>
                  sendWhatsApp(v, "sua função", "próximo culto", "domingo")
                }
              />
            ))}
          </div>
        </TabsContent>

        {/* SCHEDULE */}
        <TabsContent value="schedule">
          <div className="space-y-4">
            {initialSchedules.map((s) => (
              <ScheduleCard
                key={s.id}
                schedule={s}
                onSendWhatsApp={sendWhatsApp}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
