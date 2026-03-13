import { Person } from "@/@types/person.types"

export interface Ministry {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
  churchId?: string
}

export interface Schedule {
  id: string
  eventDate: string
  eventName: string
  ministryId: string
  ministryName?: string
  confirmed: boolean
  responseStatus: "pending" | "confirmed" | "declined" | "swap_requested"
  responseNote?: string
  respondedAt?: string
  role: string
  person: Person
}

export interface ScheduleFormData {
  eventDate: string
  eventName: string
  ministryId: string
  volunteerIds: string[]
  role: string
}
