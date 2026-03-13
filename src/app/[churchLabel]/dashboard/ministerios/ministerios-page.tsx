"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Baby, Heart, Monitor, Music, Users, type LucideIcon } from "lucide-react"
import { Ministry, Schedule } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"
import { MinistryCard } from "@/components/domain/ministries/MinistryCard"
import { ScheduleCard, ScheduleGroup } from "@/components/domain/ministries/ScheduleCard"
import { ScheduleForm } from "@/components/domain/ministries/ScheduleForm"
import { VolunteerCard } from "@/components/domain/ministries/VolunteerCard"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMinistryLogic } from "@/hooks/use-ministry-logic"
import { cn } from "@/lib/utils"

const ministryIcons: Record<string, LucideIcon> = {
  Louvor: Music,
  Infantil: Baby,
  Midia: Monitor,
  "Mídia": Monitor,
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
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules)
  const [people, setPeople] = useState<Volunteer[]>(volunteers)

  const {
    selectedMinistry,
    setSelectedMinistry,
    isScheduleDialogOpen,
    setIsScheduleDialogOpen,
    isSubmitting,
    availableVolunteers,
    handleScheduleSubmit,
    handleAddPeopleToScale,
    handleReplaceVolunteer,
    handleDeleteSchedule,
    sendWhatsApp,
  } = useMinistryLogic({
    churchId,
    volunteers: people,
    onSchedulesCreated: (createdSchedules) => {
      setSchedules((current) => [...createdSchedules, ...current])
    },
    onScheduleDeleted: (scheduleId) => {
      setSchedules((current) => current.filter((schedule) => schedule.id !== scheduleId))
    },
    onScheduleUpdated: (updatedSchedule) => {
      setSchedules((current) =>
        current.map((schedule) => (schedule.id === updatedSchedule.id ? updatedSchedule : schedule))
      )
    },
  })

  const filteredVolunteers =
    selectedMinistry === "all"
      ? availableVolunteers
      : availableVolunteers.filter(
          (volunteer) =>
            volunteer.ministry === ministries.find((ministry) => ministry.id === selectedMinistry)?.name
        )

  const handleVolunteerSaved = (person: Volunteer) => {
    setPeople((current) => {
      const exists = current.some((volunteer) => volunteer.id === person.id)
      if (exists) {
        return current.map((volunteer) => (volunteer.id === person.id ? person : volunteer))
      }

      return [person, ...current]
    })

    setSchedules((current) =>
      current.map((schedule) =>
        schedule.person.id === person.id
          ? {
              ...schedule,
              person,
            }
          : schedule
      )
    )
  }

  const groupedSchedules = schedules.reduce<ScheduleGroup[]>((groups, schedule) => {
    const groupId = [
      schedule.eventDate.split("T")[0],
      schedule.eventName,
      schedule.ministryId,
      schedule.role,
    ].join("__")

    const existingGroup = groups.find((group) => group.groupId === groupId)

    if (existingGroup) {
      existingGroup.schedules.push(schedule)
      return groups
    }

    groups.push({
      groupId,
      eventDate: schedule.eventDate,
      eventName: schedule.eventName,
      ministryId: schedule.ministryId,
      ministryName: schedule.ministryName,
      role: schedule.role,
      schedules: [schedule],
    })

    return groups
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-4 pb-24 lg:p-8">
      <PageHeader
        title="Ministerios"
        description="Centralize equipes, voluntarios e escalas em um fluxo unico e consistente."
        badge={`${ministries.length} ministerios`}
        actions={
          isStaff ? (
            <ScheduleForm
              ministries={ministries}
              availableVolunteers={availableVolunteers}
              onSubmit={handleScheduleSubmit}
              isSubmitting={isSubmitting}
              isOpen={isScheduleDialogOpen}
              onOpenChange={setIsScheduleDialogOpen}
            />
          ) : null
        }
      />

      <Tabs defaultValue="ministries" className="space-y-6">
        <TabsList className="h-12 rounded-2xl bg-muted p-1">
          <TabsTrigger value="ministries" className="rounded-xl">
            Ministerios
          </TabsTrigger>
          <TabsTrigger value="volunteers" className="rounded-xl">
            Voluntarios
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-xl">
            Escalas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ministries">
          {ministries.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ministries.map((ministry) => (
                <MinistryCard key={ministry.id} ministry={ministry} volunteers={people} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Users className="h-5 w-5" />}
              title="Nenhum ministerio cadastrado"
              description="Cadastre ministerios para organizar voluntarios, funcoes e escalas da igreja."
            />
          )}
        </TabsContent>

        <TabsContent value="volunteers">
          <div className="mb-4 flex flex-wrap gap-2">
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
            {ministries.map((ministry) => {
              const Icon = ministryIcons[ministry.name] || Users
              return (
                <Button
                  key={ministry.id}
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMinistry(ministry.id)}
                  className={cn(
                    "gap-2 rounded-full",
                    selectedMinistry === ministry.id && "border-black bg-black text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {ministry.name}
                </Button>
              )
            })}
          </div>

          <div className="space-y-3">
            {filteredVolunteers.length > 0 ? (
              filteredVolunteers.map((volunteer) => (
                <VolunteerCard
                  key={volunteer.id}
                  volunteer={volunteer}
                  onSendWhatsApp={(person) =>
                    sendWhatsApp(person, "sua funcao", "proximo culto", "domingo")
                  }
                />
              ))
            ) : (
              <EmptyState
                icon={<Users className="h-5 w-5" />}
                title="Nenhum voluntario encontrado"
                description="Adicione pessoas com papel de voluntario para preencher os ministerios e suas escalas."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-4">
            {groupedSchedules.length > 0 ? (
              groupedSchedules.map((scheduleGroup) => (
                <ScheduleCard
                  key={scheduleGroup.groupId}
                  churchId={churchId}
                  scheduleGroup={scheduleGroup}
                  availableVolunteers={availableVolunteers}
                  onDelete={handleDeleteSchedule}
                  onAddPeople={handleAddPeopleToScale}
                  onReplaceVolunteer={handleReplaceVolunteer}
                  onVolunteerSaved={handleVolunteerSaved}
                  onSendWhatsApp={sendWhatsApp}
                />
              ))
            ) : (
              <EmptyState
                icon={<Users className="h-5 w-5" />}
                title="Nenhuma escala montada"
                description="Monte a primeira escala para distribuir voluntarios por evento, ministerio e funcao."
                action={
                  isStaff ? (
                    <Button className="rounded-2xl" onClick={() => setIsScheduleDialogOpen(true)}>
                      Nova Escala
                    </Button>
                  ) : null
                }
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
