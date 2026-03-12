"use client"

import { Home, Calendar, Heart, User } from "lucide-react"
import { VisitorFormTrigger } from "./visitor-form"
import { useRouter } from "next/navigation"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "Início", active: true, navigateTo: "/" },
  { icon: Calendar, label: "Agenda", active: false, navigateTo: "/agenda" },
]

const rightMenuItems = [
  { icon: Heart, label: "Favoritos", active: false, navigateTo: "/favorites" },
  { icon: User, label: "Perfil", active: true, navigateTo: "/login" },
]

export function FloatingMenu({ churchLabel, socialLinks }: { churchLabel?: string; socialLinks: any[] }) {
  const route = useRouter()
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full bg-card px-3 py-3 shadow-xl shadow-black/10 ring-1 ring-border/10">
        {/* Left menu items */}
        <div className="flex items-center gap-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link href={item.navigateTo} key={item.label} className='cursor-pointer'>
                <button
                  key={item.label}

                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${item.active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <IconComponent className="h-5 w-5" />
                </button>
              </Link>
            )
          })}
        </div>

        {/* Center CTA */}
        <div className="-mt-8">
          <VisitorFormTrigger />
        </div>

        {/* Right menu items */}
        <div className="flex items-center gap-1">
          {rightMenuItems.map((item) => {
            const IconComponent = item.icon
            return (
              // ADICIONE O LINK AQUI:
              <Link href={`${churchLabel}${item.navigateTo}`} key={item.label}>
                <button
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${item.active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <IconComponent className="h-5 w-5" />
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
