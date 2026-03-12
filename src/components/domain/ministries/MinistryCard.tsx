"use client"

import { motion } from "framer-motion"
import { Users, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Ministry } from "@/@types/ministry.types"
import { Person as Volunteer } from "@/@types/person.types"

interface MinistryCardProps {
  ministry: Ministry
  volunteers: Volunteer[]
}

export function MinistryCard({ ministry, volunteers }: MinistryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-3xl bg-card p-5 shadow-sm"
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: ministry.color || "#e5e5e5" }}
      >
        <Users className="h-5 w-5" />
      </div>

      <h3 className="font-semibold">{ministry.name}</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {ministry.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <Badge variant="secondary" className="rounded-full">
          {volunteers.filter((v) => v.ministry === ministry.name).length} voluntários
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </motion.div>
  )
}
