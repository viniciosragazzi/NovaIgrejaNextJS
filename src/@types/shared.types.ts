export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export const dayOfWeekLabels: Record<DayOfWeek, string> = {
  sunday: "Domingo",
  monday: "Segunda",
  tuesday: "Terca",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sabado",
};

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
};

export interface ScheduleEvent {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  time: string;
  description?: string;
}

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};
