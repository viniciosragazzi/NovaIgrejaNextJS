import {
  Calendar,
  Church,
  HandCoins,
  LayoutDashboard,
  MessageSquareHeart,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

export type DashboardNavItem = {
  href: string
  label: string
  icon: LucideIcon
  requiredStaff?: boolean
  group: "principal" | "gestao" | "configuracoes"
}

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "principal" },
  { href: "/dashboard/members", label: "Membros & Visitantes", icon: Users, requiredStaff: true, group: "principal" },
  { href: "/dashboard/ministerios", label: "Ministerios", icon: Users, requiredStaff: true, group: "gestao" },
  { href: "/dashboard/schedule", label: "Agenda", icon: Calendar, requiredStaff: true, group: "gestao" },
  { href: "/dashboard/financeiro", label: "Financeiro", icon: HandCoins, requiredStaff: true, group: "gestao" },
  { href: "/dashboard/prayers", label: "Pedidos de Oracao", icon: MessageSquareHeart, requiredStaff: true, group: "gestao" },
  { href: "/dashboard/profile", label: "Perfil da Igreja", icon: Church, requiredStaff: true, group: "configuracoes" },
  { href: "/dashboard/settings", label: "Configuracoes", icon: Settings, requiredStaff: true, group: "configuracoes" },
]

export const dashboardNavGroupLabels: Record<DashboardNavItem["group"], string> = {
  principal: "Principal",
  gestao: "Gestao",
  configuracoes: "Configuracoes",
}
