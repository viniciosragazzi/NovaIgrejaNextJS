"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, Menu, ShieldCheck, X } from "lucide-react"
import { LogoutButton } from "@/components/logout"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { adminNavItems } from "@/lib/admin-navigation"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  userName?: string
}

export function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

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
          width: isCollapsed ? 86 : 304,
        }}
        className="hidden h-screen shrink-0 lg:block"
      />

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 86 : 304,
          x: isMobile && !isMobileOpen ? -304 : 0,
        }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-card shadow-xl transition-all duration-100 lg:z-30 lg:shadow-none"
        )}
      >
        <div className="border-b px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            {!isCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">NovaIgreja Control</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Plataforma
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
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed ? (
                    <div className="min-w-0">
                      <p className="truncate">{item.label}</p>
                      <p className={cn("truncate text-[11px]", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                        {item.description}
                      </p>
                    </div>
                  ) : null}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t p-4">
          {!isCollapsed ? (
            <div className="mb-4 rounded-2xl bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Operador Global
                  </p>
                  <p className="truncate text-sm font-semibold">{userName}</p>
                </div>
              </div>
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
          <LogoutButton isCollapsed={isCollapsed} />
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
