"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function OnboardingProgressIndicator({
  steps,
  currentStep,
  variant = "full",
}: {
  steps: Array<{ title: string }>
  currentStep: number
  variant?: "full" | "compact"
}) {
  const progress = ((currentStep + 1) / steps.length) * 100
  const activeStep = steps[currentStep]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>Etapa {currentStep + 1}</span>
        <span>{steps.length} etapas</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      {variant === "compact" ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Passo {currentStep + 1}
          </p>
          <p className="mt-1 font-medium text-foreground">{activeStep?.title}</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "rounded-2xl border px-3 py-3 text-sm transition-colors",
                index === currentStep && "border-primary bg-primary/5 text-foreground",
                index < currentStep && "border-emerald-200 bg-emerald-50 text-emerald-800",
                index > currentStep && "border-border bg-background text-muted-foreground"
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">Passo {index + 1}</p>
              <p className="mt-1 font-medium">{step.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
