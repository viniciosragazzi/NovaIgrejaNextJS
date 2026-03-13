import {
  type PermissionModuleKey,
} from "@/@types/church.types"
import {
  Calendar,
  Church,
  HandCoins,
  LayoutDashboard,
  Map,
  MessageSquareHeart,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

export type DashboardNavItem = {
  href: string
  label: string
  icon: LucideIcon
  requiredModule?: PermissionModuleKey
  group: "principal" | "gestao" | "configuracoes"
}

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "principal" },
  { href: "/dashboard/jornada", label: "Minha Jornada", icon: Map, group: "principal" },
  { href: "/dashboard/members", label: "Membros & Visitantes", icon: Users, requiredModule: "membros", group: "principal" },
  { href: "/dashboard/jornada/gestao", label: "Jornada do Membro", icon: Map, requiredModule: "membros", group: "gestao" },
  { href: "/dashboard/ministerios", label: "Ministerios", icon: Users, group: "principal" },
  { href: "/dashboard/schedule", label: "Agenda", icon: Calendar, requiredModule: "agenda", group: "gestao" },
  { href: "/dashboard/financeiro", label: "Financeiro", icon: HandCoins, requiredModule: "financeiro", group: "gestao" },
  { href: "/dashboard/prayers", label: "Pedidos de Oracao", icon: MessageSquareHeart, requiredModule: "paginaPublica", group: "gestao" },
  { href: "/dashboard/profile", label: "Perfil da Igreja", icon: Church, requiredModule: "perfil", group: "configuracoes" },
  { href: "/dashboard/settings", label: "Configuracoes", icon: Settings, requiredModule: "configuracoes", group: "configuracoes" },
]

export const dashboardNavGroupLabels: Record<DashboardNavItem["group"], string> = {
  principal: "Principal",
  gestao: "Gestao",
  configuracoes: "Configuracoes",
}
