"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Person } from "@/@types/person.types"
import { MemberCard } from "@/components/domain/members/MemberCard"
import { MemberStats } from "@/components/domain/members/MemberStats"
import { MemberFilter } from "@/components/domain/members/MemberFilter"
import { PersonForm } from "@/components/domain/members/PersonForm"
import { usePersonForm } from "@/hooks/use-person-form"

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
  member: "bg-emerald-100 text-emerald-700",
  visitor: "bg-blue-100 text-blue-700",
  volunteer: "bg-amber-100 text-amber-700",
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
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const isMobile = useIsMobile()

  // Hook para criação
  const createForm = usePersonForm({
    churchId,
    onSuccess: (newPerson) => {
      setPeople([newPerson, ...people])
      setIsModalOpen(false)
    },
  })

  // Hook para edição
  const editForm = usePersonForm({
    churchId,
    editingPerson,
    onSuccess: (updatedPerson) => {
      setPeople(prev => prev.map(p => p.id === updatedPerson.id ? updatedPerson : p))
      setIsEditOpen(false)
    },
  })

  const stats = {
    total: people.length,
    members: people.filter((p) => p.type.toLowerCase() === "member").length,
    visitors: people.filter((p) => p.type.toLowerCase() === "visitor").length,
    volunteers: people.filter((p) => p.type.toLowerCase() === "volunteer").length,
  }

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || person.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Membros e Visitantes</h1>
          <p className="text-muted-foreground">Gerencie as pessoas da sua comunidade</p>
        </div>
        {isStaff && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger  >
              <Button className="h-12 rounded-2xl bg-zinc-900 px-6 shadow-lg shadow-zinc-900/20 hover:scale-105 transition-all">
                <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[32px] sm:max-w-lg border-0 shadow-2xl">
              <DialogHeader><DialogTitle>Adicionar Pessoa</DialogTitle></DialogHeader>
              <PersonForm {...createForm} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <MemberStats stats={stats} />

      <MemberFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={(v) => setFilterType(v || "all")}
      />

      {/* Listagem Estilo Apple */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-[40px] border-0 shadow-sm overflow-hidden bg-white">
          <div className="divide-y divide-zinc-50">
            <AnimatePresence mode="popLayout">
              {filteredPeople.map((person) => (
                <MemberCard
                  key={person.id}
                  person={person}
                  isStaff={isStaff}
                  typeLabels={typeLabels}
                  typeColors={typeColors}
                  onEdit={(p) => {
                    setEditingPerson(p)
                    setIsEditOpen(true)
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Modais de Edição */}
      {editingPerson && (
        isMobile ? (
          <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DrawerContent className="px-6 pb-10">
              <DrawerHeader><DrawerTitle>Editar Perfil</DrawerTitle></DrawerHeader>
              <PersonForm {...editForm} isEditing />
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="rounded-[32px] sm:max-w-lg border-0 shadow-2xl">
              <DialogHeader><DialogTitle>Editar Perfil</DialogTitle></DialogHeader>
              <PersonForm {...editForm} isEditing />
            </DialogContent>
          </Dialog>
        )
      )}
    </motion.div>
  )
}
