export type PersonType = "member" | "visitor" | "volunteer";

export interface Person {
  id: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  address?: string;
  birthDate?: string;
  profileImage?: string;
  firstVisitDate?: string;
  notes?: string;
  type: PersonType;
  ministry?: string;
  role?: string;
}

export interface PersonFormData {
  fullName: string;
  whatsapp: string;
  email?: string;
  address?: string;
  birthDate?: string;
  profileImage?: string;
  firstVisitDate?: string;
  notes?: string;
  type: PersonType;
  ministry?: string;
  role?: string;
}
