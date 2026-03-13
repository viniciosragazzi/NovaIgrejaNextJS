"use client"

import { Card } from "@/components/ui/card"
import { ChurchLink } from "@prisma/generated/prisma/client"
import {
  ExternalLink,
  Globe,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Youtube,
  type LucideIcon,
} from "lucide-react"

const linkConfigs: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  instagram: { icon: Instagram, color: "text-primary", bg: "bg-primary/10" },
  youtube: { icon: Youtube, color: "text-destructive", bg: "bg-destructive/10" },
  whatsapp: { icon: MessageCircle, color: "text-[hsl(var(--status-success-foreground))]", bg: "bg-[hsl(var(--status-success))]" },
  contato: { icon: Phone, color: "text-[hsl(var(--status-info-foreground))]", bg: "bg-[hsl(var(--status-info))]" },
  telefone: { icon: Phone, color: "text-[hsl(var(--status-info-foreground))]", bg: "bg-[hsl(var(--status-info))]" },
  localizacao: { icon: MapPin, color: "text-destructive", bg: "bg-destructive/10" },
  endereco: { icon: MapPin, color: "text-destructive", bg: "bg-destructive/10" },
  mapa: { icon: MapPin, color: "text-destructive", bg: "bg-destructive/10" },
  doacao: { icon: Heart, color: "text-secondary-foreground", bg: "bg-secondary" },
  pix: { icon: Heart, color: "text-secondary-foreground", bg: "bg-secondary" },
  site: { icon: Globe, color: "text-foreground", bg: "bg-muted" },
  spotify: { icon: Music2, color: "text-primary", bg: "bg-primary/10" },
}

export function QuickLinks({ links }: { links: ChurchLink[] }) {
  return (
    <div className="space-y-4">
      <h2 className="px-1 text-lg font-semibold text-foreground">Conecte-se</h2>

      <div className="space-y-3">
        {links.map((link) => {
          const searchTerm = (link.icon || link.title).toLowerCase().trim()
          const configKey = Object.keys(linkConfigs).find((key) => searchTerm.includes(key))
          const config = configKey
            ? linkConfigs[configKey]
            : { icon: Globe, color: "text-primary", bg: "bg-primary/10" }

          const IconComponent = config.icon

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline group"
            >
              <Card className="flex items-center gap-3 border bg-card p-4 shadow-sm transition-all hover:bg-muted/40 hover:shadow-md active:scale-[0.98] sm:gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 sm:h-12 sm:w-12 ${config.bg} ${config.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-tight text-foreground">{link.title}</h3>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground sm:max-w-[220px]">
                    {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </p>
                </div>

                <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-accent sm:flex">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Card>
            </a>
          )
        })}
      </div>
    </div>
  )
}
