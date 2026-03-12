"use client"

import { Search, Mail, MoreHorizontal } from "lucide-react"

export function ChurchHeader({ church }: { church?: any }) {
  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground">
          <Search className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex h-12 w-12 items-center justify-center">
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-foreground" fill="currentColor">
            <path d="M20 4L8 16v20h24V16L20 4zm0 4l8 8v14H12V16l8-8z" />
            <path d="M18 22h4v10h-4z" />
            <circle cx="14" cy="18" r="2" />
            <circle cx="26" cy="18" r="2" />
          </svg>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground">
            <Mail className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Balance/Welcome Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Seja bem-vindo</span>
          <span className="flex h-5 items-center gap-1 rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">
            Igreja
          </span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          {church?.name || "Igreja Nova"}
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-8">
        {/* Cultos - Pink */}
        <div className="flex flex-col items-center gap-2">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5b8f5]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </button>
          <span className="text-sm font-medium text-foreground">Cultos</span>
          <span className="text-sm text-muted-foreground">Dom 18h</span>
        </div>

        {/* Eventos - Black */}
        <div className="flex flex-col items-center gap-2">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
            </svg>
          </button>
          <span className="text-sm font-medium text-foreground">Eventos</span>
          <span className="text-sm text-muted-foreground">5 este mês</span>
        </div>

        {/* Células - Green */}
        <div className="flex flex-col items-center gap-2">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8ee4af]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>
          <span className="text-sm font-medium text-foreground">Células</span>
          <span className="text-sm text-muted-foreground">Qua 19h30</span>
        </div>
      </div>
    </div>
  )
}
