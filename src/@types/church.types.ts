export interface Church {
  id: string;
  name: string;
  label: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  logo?: string;
  theme?: string;
}

export interface ChurchLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  active?: boolean;
}

export interface ChurchProfileFormData {
  name: string;
  slug: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
}
