"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  href: string
  group: string
}

interface CommandPaletteProps {
  churchLabel: string
  items: CommandPaletteItem[]
}

export function CommandPalette({ churchLabel, items }: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    function handleOpenEvent() {
      setOpen(true)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-command-palette", handleOpenEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-command-palette", handleOpenEvent)
    }
  }, [])

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return items.slice(0, 10)
    }

    return items.filter((item) => {
      const haystack = `${item.label} ${item.description || ""} ${item.group}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [items, query])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-[28px] border-0 p-0 shadow-2xl sm:max-w-2xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-3 text-base">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Search className="h-5 w-5" />
            </div>
            Busca Global
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Buscar em ${churchLabel}...`}
              className="h-12 rounded-2xl pl-11"
              autoFocus
            />
          </div>

          <div className="max-h-[420px] space-y-2 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setQuery("")
                    router.push(`/${churchLabel}${item.href}`)
                  }}
                  className={cn(
                    "flex w-full items-start justify-between gap-4 rounded-2xl border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/40"
                  )}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    {item.description ? <p className="text-xs text-muted-foreground">{item.description}</p> : null}
                  </div>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-wide">
                    {item.group}
                  </Badge>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Ctrl/Cmd + K para abrir</span>
            <Button type="button" variant="ghost" size="sm" className="rounded-xl" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
