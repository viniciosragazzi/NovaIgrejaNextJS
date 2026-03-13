import type { Prisma } from "@prisma/generated/prisma/client"

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "")
}

export function formatPhone(value: string) {
  const numbers = normalizePhone(value)
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

export function buildPersonMatchWhere(
  churchId: string,
  options: {
    email?: string | null
    phone?: string | null
  }
): Prisma.PersonWhereInput {
  const email = options.email?.trim() || ""
  const phone = options.phone?.trim() || ""
  const formattedPhone = phone ? formatPhone(phone) : ""
  const normalizedPhone = phone ? normalizePhone(phone) : ""

  const orConditions: Prisma.PersonWhereInput[] = []

  if (email) {
    orConditions.push({ email })
  }

  if (formattedPhone) {
    orConditions.push({ contact: { has: formattedPhone } })
  }

  if (normalizedPhone && normalizedPhone !== formattedPhone) {
    orConditions.push({ contact: { has: normalizedPhone } })
  }

  if (orConditions.length === 0) {
    return { churchId, id: "__no-person__" }
  }

  return {
    churchId,
    OR: orConditions,
  }
}
