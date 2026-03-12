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

export type ChurchProfileFormData = z.infer<typeof churchProfileSchema>

// Quick Link Schema
export const quickLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Titulo obrigatorio"),
  url: z.string().url("URL invalida"),
})

export type QuickLink = z.infer<typeof quickLinkSchema>

// Member/Visitor Schema
export const personSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
  type: z.enum(["member", "visitor", "volunteer"]),
  // ADICIONE ESTES DOIS:
  ministry: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  // Se houver mais campos como notes ou firstVisitDate no erro, adicione-os aqui também:
  notes: z.string().optional().or(z.literal("")),
  firstVisitDate: z.string().optional().or(z.literal("")),
});

export type PersonFormData = z.infer<typeof personSchema>

// Schedule Event Schema
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

export type ScheduleEvent = z.infer<typeof scheduleEventSchema>

// Day of week labels
export const dayOfWeekLabels: Record<string, string> = {
  sunday: "Domingo",
  monday: "Segunda",
  tuesday: "Terca",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sabado",
}

// Icon mapping for quick links
export const iconMapping: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "Youtube",
  whatsapp: "MessageCircle",
  twitter: "Twitter",
  tiktok: "Music",
  spotify: "Music",
  site: "Globe",
  website: "Globe",
  email: "Mail",
  telefone: "Phone",
  phone: "Phone",
  localizacao: "MapPin",
  location: "MapPin",
  maps: "MapPin",
  pix: "QrCode",
  doacao: "Heart",
  donation: "Heart",
}
