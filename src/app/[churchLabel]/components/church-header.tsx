"use client"

import Image from "next/image"
import { Mail, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

type ChurchHeaderProps = {
  church: {
    id: string
    name: string
    memberCount: number
    eventCount: number
    nextSchedule: string | null
    slogan?: string
    logoUrl?: string
    coverUrl?: string
    pastorName?: string
  }
}

export function ChurchHeader({ church }: ChurchHeaderProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {church.coverUrl ? (
        <div className="overflow-hidden rounded-[2rem]">
          <Image src={church.coverUrl} alt={church.name} width={960} height={360} unoptimized className="h-36 w-full object-cover sm:h-44" />
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" size="icon" className="rounded-full text-foreground">
          <Search className="h-5 w-5" />
        </Button>

        <div className="flex h-12 w-12 items-center justify-center">
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-foreground" fill="currentColor">
            <path d="M20 4L8 16v20h24V16L20 4zm0 4l8 8v14H12V16l8-8z" />
            <path d="M18 22h4v10h-4z" />
            <circle cx="14" cy="18" r="2" />
            <circle cx="26" cy="18" r="2" />
          </svg>
        </div>

        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" className="rounded-full text-foreground">
            <Mail className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-full text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        {church.logoUrl ? (
          <div className="overflow-hidden rounded-full border bg-card p-2 shadow-sm">
            <Image src={church.logoUrl} alt={church.name} width={64} height={64} unoptimized className="h-14 w-14 object-cover sm:h-16 sm:w-16" />
          </div>
        ) : null}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Seja bem-vindo</span>
          <span className="flex h-5 items-center gap-1 rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">
            Igreja
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-5xl">
          {church.name}
        </h1>
        {church.slogan ? <p className="max-w-xs text-sm leading-6 text-muted-foreground text-pretty">{church.slogan}</p> : null}
        {church.pastorName ? <p className="max-w-full px-4 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">Pastor principal: {church.pastorName}</p> : null}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-8">
        <div className="flex min-w-0 flex-col items-center gap-2 text-center">
          <Button type="button" variant="ghost" size="icon-lg" className="rounded-full bg-secondary text-secondary-foreground sm:h-14 sm:w-14">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </Button>
          <span className="text-xs font-medium text-foreground sm:text-sm">Comunidade</span>
          <span className="text-xs text-muted-foreground sm:text-sm">{church.memberCount} pessoas</span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2 text-center">
          <Button type="button" variant="ghost" size="icon-lg" className="rounded-full bg-primary sm:h-14 sm:w-14">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
            </svg>
          </Button>
          <span className="text-xs font-medium text-foreground sm:text-sm">Eventos</span>
          <span className="text-xs text-muted-foreground sm:text-sm">{church.eventCount} ativos</span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2 text-center">
          <Button type="button" variant="ghost" size="icon-lg" className="rounded-full bg-[hsl(var(--status-success))] text-[hsl(var(--status-success-foreground))] sm:h-14 sm:w-14">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </Button>
          <span className="text-xs font-medium text-foreground sm:text-sm">Proximo</span>
          <span className="text-xs text-muted-foreground sm:text-sm">{church.nextSchedule || "A definir"}</span>
        </div>
      </div>
    </div>
  )
}
