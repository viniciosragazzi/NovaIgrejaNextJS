"use client"

import { motion } from "framer-motion"
import { Income, PixConfig } from "@/@types/finance.types"
import { useFinanceLogic } from "@/hooks/use-finance-logic"
import { FinanceStats } from "@/components/domain/finance/FinanceStats"
import { PixConfigCard } from "@/components/domain/finance/PixConfigCard"
import { IncomeList } from "@/components/domain/finance/IncomeList"
import { IncomeForm } from "@/components/domain/finance/IncomeForm"

interface FinancePageProps {
  churchId: string
  initialPixConfig: PixConfig | null
  initialIncomes: Income[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FinancePage({
  churchId,
  initialPixConfig,
  initialIncomes,
}: FinancePageProps) {
  const {
    pixConfig,
    incomes,
    copied,
    isPixDialogOpen,
    setIsPixDialogOpen,
    isIncomeDialogOpen,
    setIsIncomeDialogOpen,
    handleCopyPix,
    onPixSubmit,
    onIncomeSubmit,
    deleteIncome,
    stats,
  } = useFinanceLogic({ churchId, initialPixConfig, initialIncomes })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-4 pb-24 lg:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground">Gerencie contribuicoes e configuracoes de PIX</p>
        </div>
        <IncomeForm
          onSubmit={onIncomeSubmit}
          isOpen={isIncomeDialogOpen}
          onOpenChange={setIsIncomeDialogOpen}
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <FinanceStats stats={stats} />
      </motion.div>

      {/* PIX Configuration */}
      <motion.div variants={itemVariants}>
        <PixConfigCard
          config={pixConfig}
          onSubmit={onPixSubmit}
          onCopy={handleCopyPix}
          copied={copied}
          isOpen={isPixDialogOpen}
          onOpenChange={setIsPixDialogOpen}
        />
      </motion.div>

      {/* Recent Entries */}
      <motion.div variants={itemVariants}>
        <IncomeList incomes={incomes} onDelete={deleteIncome} />
      </motion.div>
    </motion.div>
  )
}
