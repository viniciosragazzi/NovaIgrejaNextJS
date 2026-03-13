"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function OnboardingShell({
  eyebrow,
  title,
  description,
  visual,
  children,
  canGoBack,
  onBack,
  onNext,
  nextLabel,
  isNextDisabled,
  isSubmitting,
  helper,
}: {
  eyebrow: string
  title: string
  description: string
  visual?: ReactNode
  children: ReactNode
  canGoBack?: boolean
  onBack?: () => void
  onNext?: () => void
  nextLabel: string
  isNextDisabled?: boolean
  isSubmitting?: boolean
  helper?: ReactNode
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <div className="space-y-5">
        <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
        {visual ? <div className="rounded-[2rem] bg-muted/30 p-5">{visual}</div> : null}
      </div>

      <div className="space-y-6 rounded-[2rem] bg-card p-5 shadow-sm sm:p-6">
        {children}
        {helper}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="outline" className="rounded-2xl" onClick={onBack} disabled={!canGoBack || isSubmitting}>
            Voltar
          </Button>
          <Button type="button" className="rounded-2xl" onClick={onNext} disabled={isNextDisabled || isSubmitting}>
            {isSubmitting ? "Processando..." : nextLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
