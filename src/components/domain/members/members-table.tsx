"use client"

import { PermissionStatusKey } from "@/@types/church.types"
import { Briefcase, HeartHandshake, MoreHorizontal, Phone, UserRound } from "lucide-react"
import type { Person } from "@/@types/person.types"
import { Badge } from "@/components/ui/badge"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const accessStatusLabels: Record<PermissionStatusKey, string> = {
  STAFF: "Staff",
  VOLUNTEER: "Voluntario",
  MEMBER: "Membro",
  VISITOR: "Visitante",
}

export function MembersTable({
  people,
  isStaff,
  updatingAccessId,
  typeLabels,
  typeColors,
  onEdit,
  onDelete,
  onAccessStatusChange,
}: {
  people: Person[]
  isStaff: boolean
  updatingAccessId: string | null
  typeLabels: Record<string, string>
  typeColors: Record<string, string>
  onEdit: (person: Person) => void
  onDelete: (id: string) => void
  onAccessStatusChange: (personId: string, status: PermissionStatusKey) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead>Pessoa</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Contato</TableHead>
          <TableHead>Ministerio</TableHead>
          <TableHead>E-mail</TableHead>
          {isStaff ? <TableHead>Status de acesso</TableHead> : null}
          {isStaff ? <TableHead className="w-[80px] text-right">Acoes</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id} className="border-border">
            <TableCell>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    person.type === "volunteer"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {person.type === "volunteer" ? (
                    <HeartHandshake className="h-5 w-5" />
                  ) : (
                    <UserRound className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{person.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {person.birthDate || "Nascimento nao informado"}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={cn("rounded-full px-3 py-1", typeColors[person.type])}>
                {typeLabels[person.type]}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{person.whatsapp || "Sem telefone"}</span>
              </div>
            </TableCell>
            <TableCell>
              {person.ministry ? (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-secondary-foreground" />
                  <span>
                    {person.ministry}
                    {person.role ? ` (${person.role})` : ""}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Nao vinculado</span>
              )}
            </TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">{person.email || "Sem e-mail"}</span>
            </TableCell>
            {isStaff ? (
              <TableCell>
                {person.hasLinkedUser && person.accessStatus ? (
                  <Select
                    value={person.accessStatus}
                    onValueChange={(value) => {
                      if (!value || value === person.accessStatus) {
                        return
                      }

                      onAccessStatusChange(person.id, value)
                    }}
                  >
                    <SelectTrigger
                      size="sm"
                      disabled={updatingAccessId === person.id}
                      className="min-w-32 rounded-xl"
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
                  <span className="text-xs text-muted-foreground">Sem conta vinculada</span>
                )}
              </TableCell>
            ) : null}
            {isStaff ? (
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-xl" />}>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    <DropdownMenuItem onClick={() => onEdit(person)}>Editar perfil</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(person.id)}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
