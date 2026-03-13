"use client"

import { AnimatePresence, motion } from "framer-motion"
import { DollarSign, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { incomeCategoryLabels } from "@/lib/validations"
import { Income } from "@/@types/finance.types"

interface IncomeListProps {
  incomes: Income[]
  onDelete: (id: string) => void
}

export function IncomeList({ incomes, onDelete }: IncomeListProps) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm">
      <h2 className="mb-4 font-semibold">Entradas Recentes</h2>
      <div className="space-y-3">
        <AnimatePresence>
          {incomes.map((income) => (
            <motion.div
              key={income.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center justify-between rounded-2xl bg-muted/50 p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    income.category === "tithe"
                      ? "bg-[#8ee4af]"
                      : income.category === "offering"
                      ? "bg-[#f9a8d4]"
                      : income.category === "missions"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">
                    {incomeCategoryLabels[income.category]}
                    {income.donorName && ` - ${income.donorName}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(income.date).toLocaleDateString("pt-BR")}
                    {income.description && ` - ${income.description}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#22c55e]">
                  +R$ {income.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(income.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {incomes.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            Nenhuma entrada registrada
          </div>
        )}
      </div>
    </div>
  )
}
