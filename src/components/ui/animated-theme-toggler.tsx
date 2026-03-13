"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

type ViewTransition = {
  ready?: Promise<void>
}

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  children,
  ...props
}: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  const toggleTheme = React.useCallback(() => {
    const button = buttonRef.current

    if (!button) {
      return
    }

    const nextTheme = isDark ? "light" : "dark"
    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      setTheme(nextTheme)
    }

    const documentWithTransition = document as DocumentWithTransition

    if (typeof documentWithTransition.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(applyTheme)
    })

    transition.ready?.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }, [duration, isDark, setTheme])

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      {...props}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {children}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
