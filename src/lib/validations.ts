import { z } from "zod"

// Church Profile Schema
export const churchProfileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minusculas, numeros e hifen"),
  address: z.string().min(5, "Endereco deve ter pelo menos 5 caracteres"),
  phone: z.string().optional(),
  email: z.string().email("Email invalido").optional().or(z.literal("")),
  description: z.string().optional(),
})

// Quick Link Schema
export const quickLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Titulo obrigatorio"),
  url: z.string().url("URL invalida"),
})

// Member/Visitor Schema
export const personSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
  type: z.enum(["member", "visitor", "volunteer"]),
  ministry: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  firstVisitDate: z.string().optional().or(z.literal("")),
});

// Volunteer Scale Schema (used in Ministries page)
export const volunteerScaleSchema = z.object({
  eventDate: z.string().min(1, "Data obrigatória"),
  eventName: z.string().min(2, "Nome do evento obrigatório"),
  ministryId: z.string().min(1, "Ministério obrigatório"),
  volunteerId: z.string().min(1, "Voluntário obrigatório"),
  role: z.string().min(1, "Função obrigatória"),
})

// Schedule Event Schema (used in Schedule page)
export const scheduleEventSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  dayOfWeek: z.enum([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]),
  time: z.string().min(5, "Horario obrigatorio"),
  description: z.string().optional(),
})

