"use client"

import Link from "next/link"
import { Calendar, Heart, Home, User } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VisitorFormTrigger } from "./visitor-form"

const menuItems = [
  { icon: Home, label: "Inicio", navigateTo: "" },
  { icon: Calendar, label: "Agenda", navigateTo: "/agenda" },
]

const rightMenuItems = [
  { icon: Heart, label: "Favoritos", navigateTo: "/favorites" },
  { icon: User, label: "Perfil", navigateTo: "/login" },
]

export function FloatingMenu({
  churchLabel,
}: {
  churchLabel?: string
  socialLinks: unknown[]
}) {
  const basePath = churchLabel ? `/${churchLabel}` : ""

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-5 sm:px-4 sm:pb-8">
      <div className="mx-auto flex w-full max-w-sm items-center justify-between rounded-full bg-card px-2 py-2 shadow-xl shadow-black/10 ring-1 ring-border/10 sm:max-w-md sm:px-3 sm:py-3">
        <div className="flex items-center gap-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                href={`${basePath}${item.navigateTo}`}
                key={item.label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-10 w-10 rounded-full bg-muted text-foreground sm:h-11 sm:w-11"
                )}
              >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            )
          })}
        </div>

        <div className="-mt-7 sm:-mt-8">
          <VisitorFormTrigger churchLabel={churchLabel ?? ""} />
        </div>

        <div className="flex items-center gap-1">
          {rightMenuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                href={`${basePath}${item.navigateTo}`}
                key={item.label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-10 w-10 rounded-full text-muted-foreground hover:text-foreground sm:h-11 sm:w-11"
                )}
              >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
