"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { ChevronRight, Search, Waypoints } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dashboardNavItems } from "@/lib/dashboard-navigation"

interface DashboardTopbarProps {
  churchLabel: string
  churchName: string
}

function formatSegment(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function DashboardTopbar({ churchLabel, churchName }: DashboardTopbarProps) {
  const pathname = usePathname()

  const breadcrumbItems = useMemo(() => {
    const routeWithoutPrefix = pathname.replace(`/${churchLabel}`, "")
    const matchedItem = dashboardNavItems.find((item) => item.href === routeWithoutPrefix)

    if (matchedItem) {
      return matchedItem.href === "/dashboard" ? ["Dashboard"] : ["Dashboard", matchedItem.label]
    }

    return routeWithoutPrefix
      .split("/")
      .filter(Boolean)
      .map((segment) => formatSegment(segment))
  }, [churchLabel, pathname])

  return (
    <div className="sticky top-0 z-20 mb-6 flex flex-col gap-4 rounded-[2rem] border bg-background/90 px-4 py-4 backdrop-blur lg:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Waypoints className="h-3.5 w-3.5" />
            {breadcrumbItems.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{churchName}</h2>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-wide">
              Painel Administrativo
            </Badge>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 justify-between rounded-2xl px-4 text-muted-foreground lg:min-w-72"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
        >
          <span className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Busca global
          </span>
          <span className="rounded-lg bg-muted px-2 py-1 text-[10px]">Ctrl K</span>
        </Button>
      </div>
    </div>
  )
}
