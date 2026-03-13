"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ThemeMode = "light" | "dark" | "system"
type ToggleDirection = "btt" | "ttb" | "ltr" | "rtl"

const modeIcons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Laptop,
}

const directionMotion: Record<
  ToggleDirection,
  {
    initial: { x?: number; y?: number; opacity: number; scale: number }
    exit: { x?: number; y?: number; opacity: number; scale: number }
  }
> = {
  ltr: {
    initial: { x: -14, opacity: 0, scale: 0.85 },
    exit: { x: 14, opacity: 0, scale: 0.85 },
  },
  rtl: {
    initial: { x: 14, opacity: 0, scale: 0.85 },
    exit: { x: -14, opacity: 0, scale: 0.85 },
  },
  ttb: {
    initial: { y: -14, opacity: 0, scale: 0.85 },
    exit: { y: 14, opacity: 0, scale: 0.85 },
  },
  btt: {
    initial: { y: 14, opacity: 0, scale: 0.85 },
    exit: { y: -14, opacity: 0, scale: 0.85 },
  },
}

function getEffectiveMode(
  theme: string | undefined,
  resolvedTheme: string | undefined,
  modes: ThemeMode[]
): ThemeMode {
  if (theme === "system" && modes.includes("system")) {
    return "system"
  }

  const preferred = (theme === "system" ? resolvedTheme : theme) as ThemeMode | undefined

  if (preferred && modes.includes(preferred)) {
    return preferred
  }

  return modes[0] ?? "light"
}

export interface ThemeTogglerButtonProps
  extends Omit<React.ComponentProps<"button">, "onClick"> {
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: Extract<React.ComponentProps<typeof Button>["size"], "default" | "sm" | "lg">
  modes?: ThemeMode[]
  direction?: ToggleDirection
  showLabel?: boolean
  onImmediateChange?: (theme: ThemeMode) => void
}

export function ThemeTogglerButton({
  variant = "outline",
  size = "default",
  modes = ["light", "dark"],
  direction = "ltr",
  showLabel = true,
  className,
  onImmediateChange,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const availableModes = React.useMemo(() => {
    const normalized = modes.filter(
      (mode, index, list): mode is ThemeMode => ["light", "dark", "system"].includes(mode) && list.indexOf(mode) === index
    )

    return normalized.length > 0 ? normalized : (["light", "dark"] as ThemeMode[])
  }, [modes])

  const currentMode = mounted
    ? getEffectiveMode(theme, resolvedTheme, availableModes)
    : availableModes[0]

  const currentIndex = availableModes.indexOf(currentMode)
  const nextMode = availableModes[(currentIndex + 1) % availableModes.length] ?? availableModes[0]
  const Icon = modeIcons[currentMode]

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        size === "default" && "h-11 px-4",
        size === "sm" && "h-9 px-3",
        size === "lg" && "h-12 px-5",
        !showLabel && "px-0",
        className
      )}
      aria-label={`Alternar tema. Atual: ${currentMode}. Proximo: ${nextMode}.`}
      title={`Tema: ${currentMode}`}
      onClick={() => {
        setTheme(nextMode)
        onImmediateChange?.(nextMode)
      }}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/30 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />

      <span className="relative flex items-center gap-2">
        <span className="relative flex size-5 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentMode}
              initial={directionMotion[direction].initial}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={directionMotion[direction].exit}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Icon className="size-4" />
            </motion.span>
          </AnimatePresence>
        </span>

        {showLabel ? <span className="text-xs font-medium capitalize">{currentMode}</span> : null}
      </span>
    </Button>
  )
}
