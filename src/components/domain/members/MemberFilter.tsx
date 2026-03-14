"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MemberFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterType: string
  onFilterChange: (value: string | null) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export function MemberFilter({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}: MemberFilterProps) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:gap-4 lg:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar pelo nome..."
          className="h-12 rounded-2xl border bg-card pl-12 shadow-sm sm:h-14"
        />
      </div>
      <Select value={filterType} onValueChange={(v) => onFilterChange(v as string)}>
        <SelectTrigger className="h-12 w-full rounded-2xl border bg-card shadow-sm sm:h-14 lg:w-56">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="member">Membros</SelectItem>
          <SelectItem value="visitor">Visitantes</SelectItem>
          <SelectItem value="volunteer">Voluntários</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  )
}
