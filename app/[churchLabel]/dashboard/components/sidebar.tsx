"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Church,
  Users,
  Settings,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  HandCoins,
  MessageSquareHeart,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Perfil da Igreja", icon: Church, requiredStaff: true },
  { href: "/dashboard/members", label: "Membros & Visitantes", icon: Users, requiredStaff: true },
  { href: "/dashboard/ministerios", label: "Ministérios", icon: Users, requiredStaff: true },
  { href: "/dashboard/schedule", label: "Agenda", icon: Calendar, requiredStaff: true },

  { href: "/dashboard/offering", label: "Ofertas", icon: HandCoins },
  { href: "/dashboard/prayers", label: "Pedidos de Oração", icon: MessageSquareHeart },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings, requiredStaff: true },
]

interface SidebarProps {
  churchLabel: string;
  churchName: string;
  userName?: string;
  isStaff?: boolean;
}

export function DashboardSidebar({ churchLabel, churchName, userName, isStaff }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ou um esqueleto/placeholder
  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-sm lg:hidden border"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col bg-card border-r transition-all duration-75",
          "lg:relative lg:z-0 shadow-xl lg:shadow-none"
        )}
      >
        {/* Header - Informações da Igreja vindas do Server Context */}
        <div className="flex h-20 items-center justify-between px-4 border-b overflow-x-hidden">
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Church className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold truncate max-w-[150px]">{churchName}</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{isStaff ? "Admin" : "Membro"}</p>
              </div>
            </motion.div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 rounded-lg"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-x-hidden">
          {navItems.map((item) => {
            const fullPath = `/${churchLabel}${item.href}`
            const isActive = pathname === fullPath
            const Icon = item.icon
            const shouldShow = !item.requiredStaff || (item.requiredStaff && isStaff)
            if (!shouldShow) return null

            return (
              <Link
                key={item.href}
                href={fullPath}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0 z-10", isActive && "text-primary-foreground")} />
                {!isCollapsed && <span className="z-10 text-nowrap">{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-2xl bg-primary shadow-md shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Identificação do Maestro/Admin */}
        <div className="border-t p-4">
          {!isCollapsed && (
            <div className="mb-4 px-2">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Operador</p>
              <p className="text-xs font-semibold truncate text-zinc-700">{userName}</p>
            </div>
          )}
          <LogoutButton churchLabel={churchLabel} isCollapsed={isCollapsed} />
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
