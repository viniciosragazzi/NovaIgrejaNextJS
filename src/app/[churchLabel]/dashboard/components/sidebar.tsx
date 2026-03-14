"use client"

import type { ModuleAccessMap } from "@/lib/authorization"
import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useIsMobile } from "@/hooks/use-mobile"
import { dashboardNavGroupLabels, dashboardNavItems } from "@/lib/dashboard-navigation"
import { cn } from "@/lib/utils"

interface SidebarProps {
  churchLabel: string
  churchName: string
  userName?: string
  isStaff?: boolean
  moduleAccess?: ModuleAccessMap
}

export function DashboardSidebar({ churchLabel, churchName, userName, isStaff, moduleAccess }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isMobile = useIsMobile()

  const groupedItems = useMemo(() => {
    return Object.entries(dashboardNavGroupLabels).map(([group, label]) => ({
      group,
      label,
      items: dashboardNavItems.filter(
        (item) =>
          item.group === group &&
          (!item.requiredModule || moduleAccess?.[item.requiredModule])
      ),
    }))
  }, [moduleAccess])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border bg-card shadow-sm lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          width: isCollapsed ? 86 : 292,
        }}
        className="hidden h-screen shrink-0 lg:block"
      />

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 86 : 292,
          x: isMobile && !isMobileOpen ? -292 : 0,
        }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-card transition-all duration-100",
          "shadow-xl lg:z-30 lg:shadow-none"
        )}
      >
        <div className="border-b px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            {!isCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{churchName}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {isStaff ? "Administracao" : "Membro"}
                </p>
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden h-9 w-9 rounded-xl lg:flex"
                onClick={() => setIsCollapsed((current) => !current)}
              >
                <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
                  <ChevronLeft className="h-4 w-4" />
                </motion.div>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl lg:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isCollapsed ? (
            <Button
              type="button"
              variant="outline"
              className="mt-4 h-11 w-full justify-between rounded-2xl px-4 text-muted-foreground"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </span>
              <span className="rounded-lg bg-muted px-2 py-1 text-[10px]">Ctrl K</span>
            </Button>
          ) : null}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-6">
            {groupedItems.map((section) =>
              section.items.length > 0 ? (
                <div key={section.group} className="space-y-2">
                  {!isCollapsed ? (
                    <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {section.label}
                    </p>
                  ) : null}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const fullPath = `/${churchLabel}${item.href}`
                      const isActive = pathname === fullPath
                      const Icon = item.icon

                      return (
                        <Link
                          key={item.href}
                          href={fullPath}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-foreground")} />
                          {!isCollapsed ? <span className="truncate">{item.label}</span> : null}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </nav>

        <div className="border-t p-4">
          {!isCollapsed ? (
            <div className="mb-4 rounded-2xl bg-muted/50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Operador
              </p>
              <p className="truncate text-sm font-semibold">{userName}</p>
            </div>
          ) : null}
          <AnimatedThemeToggler
            className={cn(
              "mb-3 inline-flex h-11 w-full items-center rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              isCollapsed && "justify-center px-0"
            )}
          >
            {!isCollapsed ? <span className="ml-2">Alternar tema</span> : null}
          </AnimatedThemeToggler>
          <LogoutButton churchLabel={churchLabel} isCollapsed={isCollapsed} />
        </div>
      </motion.aside>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
