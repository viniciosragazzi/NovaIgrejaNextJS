"use client"

import { motion } from "framer-motion"
import { PermissionStatusKey } from "@/@types/church.types"
import { Phone, Briefcase, HeartHandshake, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Person } from "@/@types/person.types"

const accessStatusLabels: Record<PermissionStatusKey, string> = {
  STAFF: "Staff",
  VOLUNTEER: "Voluntario",
  MEMBER: "Membro",
  VISITOR: "Visitante",
}

interface MemberCardProps {
  person: Person
  isStaff: boolean
  isUpdatingAccess?: boolean
  typeLabels: Record<string, string>
  typeColors: Record<string, string>
  onEdit: (person: Person) => void
  onDelete?: (id: string) => void
  onAccessStatusChange?: (personId: string, status: PermissionStatusKey) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export function MemberCard({
  person,
  isStaff,
  isUpdatingAccess,
  typeLabels,
  typeColors,
  onEdit,
  onDelete,
  onAccessStatusChange,
}: MemberCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex flex-col gap-4 p-4 transition-all hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl font-bold text-xl sm:h-16 sm:w-16",
            person.type === "volunteer"
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {person.type === "volunteer" ? (
            <HeartHandshake />
          ) : (
            person.fullName.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold tracking-tight text-foreground">
            {person.fullName}
          </h3>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {person.whatsapp}
            </span>
            {person.type === "volunteer" && person.ministry && (
              <span className="flex items-center gap-1 font-bold text-secondary-foreground">
                <Briefcase className="h-3 w-3" /> {person.ministry} ({person.role})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-0 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter",
              typeColors[person.type]
            )}
          >
            {typeLabels[person.type]}
          </span>
          {isStaff ? (
            person.hasLinkedUser && person.accessStatus ? (
              <Select
                value={person.accessStatus}
                onValueChange={(value) => {
                  if (!value || value === person.accessStatus || !onAccessStatusChange) {
                    return
                  }

                  onAccessStatusChange(person.id, value)
                }}
              >
                <SelectTrigger
                  size="sm"
                  disabled={isUpdatingAccess}
                  className="min-w-full rounded-xl sm:min-w-32"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(accessStatusLabels) as PermissionStatusKey[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      {accessStatusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="text-[11px] font-medium text-muted-foreground">Sem conta</span>
            )
          ) : null}
        </div>
        {isStaff && (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" />}>
                <MoreHorizontal className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-border shadow-xl"
              >
                <DropdownMenuItem
                  onClick={() => onEdit(person)}
                  className="p-3 text-xs font-bold"
                >
                  Editar Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3 text-xs font-bold text-destructive focus:text-destructive"
                  onClick={() => onDelete?.(person.id)}
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </motion.div>
  )
}
