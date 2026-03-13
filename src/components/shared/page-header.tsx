"use client"

import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, badge, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="min-w-0 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{title}</h1>
          {badge ? <Badge className="rounded-full px-3 py-1 text-[11px]">{badge}</Badge> : null}
        </div>
        {description ? <p className="max-w-2xl text-sm leading-6 text-muted-foreground text-pretty">{description}</p> : null}
      </div>
      {actions ? <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">{actions}</div> : null}
    </div>
  )
}
