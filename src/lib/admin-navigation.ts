import {
  Building2,
  LayoutDashboard,
  Settings2,
  Users,
  type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
  href: string
  label: string
  icon: LucideIcon
  description: string
}

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visao geral da plataforma",
  },
  {
    href: "/admin/churches",
    label: "Igrejas",
    icon: Building2,
    description: "Gestao global das igrejas",
  },
  {
    href: "/admin/users",
    label: "Usuarios",
    icon: Users,
    description: "Gestao de contas e vinculos",
  },
  {
    href: "/admin/system-settings",
    label: "Parametros",
    icon: Settings2,
    description: "Configuracoes globais do sistema",
  },
]
