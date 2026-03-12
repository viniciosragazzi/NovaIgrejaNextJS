"use client"

import { motion } from "framer-motion"
import { Phone, Briefcase, HeartHandshake, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Person } from "@/@types/person.types"

interface MemberCardProps {
  person: Person
  isStaff: boolean
  typeLabels: Record<string, string>
  typeColors: Record<string, string>
  onEdit: (person: Person) => void
  onDelete?: (id: string) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export function MemberCard({
  person,
  isStaff,
  typeLabels,
  typeColors,
  onEdit,
  onDelete,
}: MemberCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "h-16 w-16 rounded-3xl flex items-center justify-center font-bold text-xl",
            person.type === "volunteer"
              ? "bg-amber-100 text-amber-600"
              : "bg-zinc-100 text-zinc-400"
          )}
        >
          {person.type === "volunteer" ? (
            <HeartHandshake />
          ) : (
            person.fullName.charAt(0)
          )}
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">
            {person.fullName}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[11px] text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {person.whatsapp}
            </span>
            {person.type === "volunteer" && person.ministry && (
              <span className="flex items-center gap-1 font-bold text-amber-600/80">
                <Briefcase className="h-3 w-3" /> {person.ministry} ({person.role})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter",
            typeColors[person.type]
          )}
        >
          {typeLabels[person.type]}
        </span>
        {isStaff && (
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-2xl border-zinc-100 shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => onEdit(person)}
                className="text-xs font-bold p-3"
              >
                Editar Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-bold p-3 text-red-500"
                onClick={() => onDelete?.(person.id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.div>
  )
}
