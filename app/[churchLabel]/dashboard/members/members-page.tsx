"use client"

import { useState, useEffect, ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Users, Plus, Search, Filter, MoreHorizontal, Phone, Mail, X,
  UserPlus, Trash2, Calendar, MapPin, Briefcase, HeartHandshake
} from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

import { personSchema, type PersonFormData } from "@/lib/validations"
import { createPersonAction, updatePersonAction } from "./actions"
import { cn } from "@/lib/utils"

type Person = {
  id: string
  fullName: string
  whatsapp: string
  email?: string
  address?: string
  birthDate?: string
  firstVisitDate?: string
  notes?: string
  type: "member" | "visitor" | "volunteer"
  ministry?: string
  role?: string
}

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()

  const formCreate = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: { type: "visitor", whatsapp: "", email: "", address: "", birthDate: "", ministry: "", role: "", firstVisitDate: "", notes: "" },
  })

  const formEdit = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
  })

  function formatWhatsApp(value: string): string {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  // Estatísticas dinâmicas baseadas no estado local 'people'
  const stats = {
    total: people.length,
    members: people.filter((p) => p.type.toLowerCase() === "member").length,
    visitors: people.filter((p) => p.type.toLowerCase() === "visitor").length,
    volunteers: people.filter((p) => p.type.toLowerCase() === "volunteer").length,
  }
  useEffect(() => {
    if (editingPerson) {
      formEdit.reset({
        fullName: editingPerson.fullName,
        whatsapp: editingPerson.whatsapp,
        email: editingPerson.email || "",
        address: editingPerson.address || "",
        birthDate: editingPerson.birthDate || "",
        firstVisitDate: editingPerson.firstVisitDate || "",
        notes: editingPerson.notes || "",
        type: editingPerson.type as any,
        ministry: editingPerson.ministry || "",
        role: editingPerson.role || "",
      })
    }
  }, [editingPerson, formEdit])

  async function onSubmit(data: PersonFormData) {
    setIsSubmitting(true)
    const result = await createPersonAction(churchId, data)

    if (result.success) {
      toast.success("Cadastrado com sucesso!")

      // Criamos o objeto exatamente como a interface 'Person' espera para a listagem
      const newPerson: Person = {
        id: Math.random().toString(), // O banco gera um real, mas para o estado local usamos esse
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        address: data.address,
        birthDate: data.birthDate,
        type: data.type as any,
        ministry: data.ministry, // GARANTE QUE O MINISTÉRIO APAREÇA NA LISTA IMEDIATAMENTE
        role: data.role,         // GARANTE QUE A FUNÇÃO APAREÇA NA LISTA IMEDIATAMENTE
      }

      setPeople([newPerson, ...people])
      setIsModalOpen(false)
      formCreate.reset()
    } else {
      toast.error(result.error)
    }
    setIsSubmitting(false)
  }

  async function onEditSubmit(data: PersonFormData) {
    if (!editingPerson?.id) return
    setIsSubmitting(true)
    try {
      const result = await updatePersonAction(churchId, editingPerson.id, data)
      if (result.success) {
        toast.success("Dados atualizados!")

        // Atualiza o estado local mapeando todos os campos novos
        setPeople(prev => prev.map(p =>
          p.id === editingPerson.id
            ? {
              ...p,
              fullName: data.fullName,
              whatsapp: data.whatsapp,
              email: data.email,
              address: data.address,
              birthDate: data.birthDate,
              type: data.type as any,
              ministry: data.ministry,
              role: data.role
            }
            : p
        ))
        setIsEditOpen(false)
      } else {
        toast.error(result.error)
      }
    } catch (e) {
      toast.error("Erro interno ao atualizar")
    } finally {
      setIsSubmitting(false)
    }
  }
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: { type: "visitor", whatsapp: "", email: "", address: "", birthDate: "", ministry: "", role: "", firstVisitDate: "", notes: "" },
  })

  const {
    register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit },
    reset: resetEdit, setValue: setValueEdit, watch: watchEdit
  } = useForm<PersonFormData>({ resolver: zodResolver(personSchema) })




  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || person.type === filterType
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    if (editingPerson) {
      resetEdit({
        fullName: editingPerson.fullName,
        whatsapp: editingPerson.whatsapp,
        email: editingPerson.email || "",
        address: editingPerson.address || "",
        birthDate: editingPerson.birthDate || "",
        firstVisitDate: editingPerson.firstVisitDate || "",
        notes: editingPerson.notes || "",
        type: editingPerson.type,
        ministry: editingPerson.ministry || "",
        role: editingPerson.role || "",
      })
    }
  }, [editingPerson, resetEdit])


  const PersonForm = ({ isEditing = false }: { isEditing?: boolean }) => {
    const f = isEditing ? formEdit : formCreate
    const currentType = f.watch("type")

    return (
      <form onSubmit={f.handleSubmit(isEditing ? onEditSubmit : onSubmit)} className="mt-4 space-y-4 pb-6">
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">Nome Completo *</Label>
          <Input {...f.register("fullName")} className="h-12 rounded-xl bg-zinc-50 border-0" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">WhatsApp *</Label>
            <Input
              {...f.register("whatsapp")}
              onChange={(e) => f.setValue("whatsapp", formatWhatsApp(e.target.value))}
              className="h-12 rounded-xl bg-zinc-50 border-0"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">E-mail</Label>
            <Input {...f.register("email")} className="h-12 rounded-xl bg-zinc-50 border-0" />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase text-zinc-400">Vínculo</Label>
          <Select
            value={currentType}
            onValueChange={(v) => f.setValue("type", v as any)}
          >
            <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-0">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-0 shadow-2xl">
              <SelectItem value="visitor">Visitante</SelectItem>
              <SelectItem value="member">Membro</SelectItem>
              <SelectItem value="volunteer">Voluntário</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {currentType === "volunteer" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase text-amber-600">Ministério</Label>
                  <Input {...f.register("ministry")} placeholder="Ex: Louvor" className="h-12 rounded-xl bg-amber-50/30 border-0" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase text-amber-600">Função</Label>
                  <Input {...f.register("role")} placeholder="Ex: Guitarra" className="h-12 rounded-xl bg-amber-50/30 border-0" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">Endereço</Label>
            <Input {...f.register("address")} className="h-12 rounded-xl bg-zinc-50 border-0" />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">Nascimento</Label>
            <Input {...f.register("birthDate")} type="date" className="h-12 rounded-xl bg-zinc-50 border-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">Primeira Visita</Label>
            <Input {...f.register("firstVisitDate")} type="date" className="h-12 rounded-xl bg-zinc-50 border-0" />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-zinc-400">Observações</Label>
            <Input {...f.register("notes")} className="h-12 rounded-xl bg-zinc-50 border-0" />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-2xl bg-zinc-900 text-white font-bold">
          {isSubmitting ? <Spinner /> : isEditing ? "Salvar Alterações" : "Confirmar Cadastro"}
        </Button>
      </form>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Membros e Visitantes</h1>
          <p className="text-muted-foreground">
            Gerencie as pessoas da sua comunidade
          </p>
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
              <PersonForm />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Estatísticas Premium */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total, color: "bg-zinc-900" },
          { label: "Membros", value: stats.members, color: "bg-emerald-400" },
          { label: "Visitantes", value: stats.visitors, color: "bg-blue-500" },
          { label: "Voluntários", value: stats.volunteers, color: "bg-amber-400" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-0 shadow-sm overflow-hidden bg-white">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white", stat.color)}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Busca */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar pelo nome..."
            className="h-14 rounded-2xl border-0 bg-white shadow-sm pl-12"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType as any}>
          <SelectTrigger className="h-14 w-48 rounded-2xl border-0 bg-white shadow-sm"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="member">Membros</SelectItem><SelectItem value="visitor">Visitantes</SelectItem><SelectItem value="volunteer">Voluntários</SelectItem></SelectContent>
        </Select>
      </motion.div>

      {/* Listagem Estilo Apple */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-[40px] border-0 shadow-sm overflow-hidden bg-white">
          <div className="divide-y divide-zinc-50">
            <AnimatePresence mode="popLayout">
              {filteredPeople.map((person) => (
                <motion.div key={person.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center font-bold text-xl", person.type === "volunteer" ? "bg-amber-100 text-amber-600" : "bg-zinc-100 text-zinc-400")}>
                      {person.type === "volunteer" ? <HeartHandshake /> : person.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 tracking-tight">{person.fullName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[11px] text-zinc-400 font-medium">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {person.whatsapp}</span>
                        {person.type === "volunteer" && person.ministry && (
                          <span className="flex items-center gap-1 font-bold text-amber-600/80"><Briefcase className="h-3 w-3" /> {person.ministry} ({person.role})</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter", typeColors[person.type])}>
                      {typeLabels[person.type]}
                    </span>
                    {isStaff && (
                      <DropdownMenu>
                        <DropdownMenuTrigger ><Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl"><MoreHorizontal className="h-5 w-5" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-zinc-100 shadow-xl">
                          <DropdownMenuItem onClick={() => { setEditingPerson(person); setIsEditOpen(true); }} className="text-xs font-bold p-3">Editar Perfil</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold p-3 text-red-500">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Modais de Edição */}
      {editingPerson && (
        isMobile ? (
          <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}><DrawerContent className="px-6 pb-10"><DrawerHeader><DrawerTitle>Editar Perfil</DrawerTitle></DrawerHeader><PersonForm isEditing /></DrawerContent></Drawer>
        ) : (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}><DialogContent className="rounded-[32px] sm:max-w-lg border-0 shadow-2xl"><DialogHeader><DialogTitle>Editar Perfil</DialogTitle></DialogHeader><PersonForm isEditing /></DialogContent></Dialog>
        )
      )}
    </motion.div>
  )
}
