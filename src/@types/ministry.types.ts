export interface Ministry {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  churchId?: string;
}

export interface Schedule {
  id: string;
  eventDate: string;
  eventName: string;
  ministryId: string;
  confirmed: boolean;
  role: string;
  person: {
    fullName: string;
    whatsapp: string;
  };
}

export interface ScheduleFormData {
  eventDate: string;
  eventName: string;
  ministryId: string;
  volunteerId: string;
  role: string;
}
