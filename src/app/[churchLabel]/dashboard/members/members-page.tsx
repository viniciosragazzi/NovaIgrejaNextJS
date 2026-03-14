"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { PermissionStatusKey } from "@/@types/church.types"
import { updatePersonAccessStatusAction, deletePersonAction } from "@/actions/person.actions"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Person } from "@/@types/person.types"
import { MemberCard } from "@/components/domain/members/MemberCard"
import { MemberStats } from "@/components/domain/members/MemberStats"
import { MemberFilter } from "@/components/domain/members/MemberFilter"
import { MembersTable } from "@/components/domain/members/members-table"
import { PersonForm } from "@/components/domain/members/PersonForm"
import { usePersonForm } from "@/hooks/use-person-form"
import { Search, Users } from "lucide-react"

interface MembersPageProps {
  isStaff: boolean
  churchId: string
  initialData: Person[]
}

const typeLabels: Record<string, string> = {
  member: "Membro",
  visitor: "Visitante",
  volunteer: "Voluntário",
}

const typeColors: Record<string, string> = {
  member: "bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))]",
  visitor: "bg-[hsl(var(--status-info))] text-[hsl(var(--status-info-foreground))]",
  volunteer: "bg-secondary text-secondary-foreground",
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export default function MembersPage({ isStaff, churchId, initialData }: MembersPageProps) {
  const [people, setPeople] = useState<Person[]>(initialData)
  const [updatingAccessId, setUpdatingAccessId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const isMobile = useIsMobile()

  const createForm = usePersonForm({
    churchId,
    onSuccess: (newPerson) => {
      setPeople((current) => [newPerson, ...current])
      setIsModalOpen(false)
    },
  })

  const editForm = usePersonForm({
    churchId,
    editingPerson,
    onSuccess: (updatedPerson) => {
      setPeople((current) =>
        current.map((person) => (person.id === updatedPerson.id ? updatedPerson : person))
      )
      setIsEditOpen(false)
    },
  })

  const stats = {
    total: people.length,
    members: people.filter((person) => person.type.toLowerCase() === "member").length,
    visitors: people.filter((person) => person.type.toLowerCase() === "visitor").length,
    volunteers: people.filter((person) => person.type.toLowerCase() === "volunteer").length,
  }

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || person.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleDeletePerson = async (personId: string) => {
    const result = await deletePersonAction(churchId, personId)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    setPeople((current) => current.filter((person) => person.id !== personId))
    toast.success("Pessoa excluída!")
  }

  const handleAccessStatusChange = async (personId: string, status: PermissionStatusKey) => {
    setUpdatingAccessId(personId)

    try {
      const result = await updatePersonAccessStatusAction(churchId, personId, status)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel atualizar o status de acesso.")
        return
      }

      setPeople((current) =>
        current.map((person) =>
          person.id === personId
            ? {
                ...person,
                accessStatus: status,
              }
            : person
        )
      )
      toast.success("Status de acesso atualizado.")
    } finally {
      setUpdatingAccessId(null)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-6xl space-y-6 px-0 py-4 sm:space-y-8 sm:px-0 sm:py-6"
    >
      <PageHeader
        title="Membros e Visitantes"
        description="Busque rapidamente, filtre por tipo e mantenha o cadastro da comunidade sempre organizado."
        badge={`${stats.total} registros`}
        actions={
          isStaff ? (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger
                render={
                  <Button className="h-12 w-full rounded-2xl px-6 shadow-lg sm:w-auto sm:transition-all sm:hover:scale-105" />
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
              </DialogTrigger>
              <DialogContent className="rounded-[32px] border-0 shadow-2xl sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Adicionar Pessoa</DialogTitle>
                </DialogHeader>
                <PersonForm {...createForm} />
              </DialogContent>
            </Dialog>
          ) : null
        }
      />

      <MemberStats stats={stats} />

      <MemberFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={(value) => setFilterType(value || "all")}
      />

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden rounded-[28px] border shadow-sm sm:rounded-[40px]">
          <div className="divide-y divide-border">
            <AnimatePresence mode="popLayout">
              {filteredPeople.length > 0 ? (
                isMobile ? (
                  filteredPeople.map((person) => (
                    <MemberCard
                      key={person.id}
                      person={person}
                      isStaff={isStaff}
                      isUpdatingAccess={updatingAccessId === person.id}
                      typeLabels={typeLabels}
                      typeColors={typeColors}
                      onEdit={(selectedPerson) => {
                        setEditingPerson(selectedPerson)
                        setIsEditOpen(true)
                      }}
                      onDelete={handleDeletePerson}
                      onAccessStatusChange={handleAccessStatusChange}
                    />
                  ))
                ) : (
                  <div className="overflow-x-auto p-2 md:p-4">
                    <MembersTable
                      people={filteredPeople}
                      isStaff={isStaff}
                      updatingAccessId={updatingAccessId}
                      typeLabels={typeLabels}
                      typeColors={typeColors}
                      onEdit={(selectedPerson) => {
                        setEditingPerson(selectedPerson)
                        setIsEditOpen(true)
                      }}
                      onDelete={handleDeletePerson}
                      onAccessStatusChange={handleAccessStatusChange}
                    />
                  </div>
                )
              ) : (
                <EmptyState
                  icon={searchTerm || filterType !== "all" ? <Search className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                  title={searchTerm || filterType !== "all" ? "Nenhum resultado encontrado" : "Nenhuma pessoa cadastrada"}
                  description={
                    searchTerm || filterType !== "all"
                      ? "Tente ajustar a busca ou remover os filtros para encontrar pessoas cadastradas."
                      : "Comece cadastrando membros, visitantes e voluntarios para alimentar os demais modulos do sistema."
                  }
                  action={
                    isStaff ? (
                      <Button className="rounded-2xl" onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Pessoa
                      </Button>
                    ) : null
                  }
                />
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {editingPerson &&
        (isMobile ? (
          <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DrawerContent className="px-4 pb-8 sm:px-6 sm:pb-10">
              <DrawerHeader>
                <DrawerTitle>Editar Perfil</DrawerTitle>
              </DrawerHeader>
              <PersonForm {...editForm} isEditing />
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="rounded-[32px] border-0 shadow-2xl sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Editar Perfil</DialogTitle>
              </DialogHeader>
              <PersonForm {...editForm} isEditing />
            </DialogContent>
          </Dialog>
        ))}
    </motion.div>
  )
}
