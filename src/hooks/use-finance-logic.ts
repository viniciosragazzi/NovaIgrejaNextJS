"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PixConfig, Income } from "@/@types/finance.types"
import { PixConfigFormData, ManualIncomeFormData } from "@/lib/validations"
import { registerIncomeAction, updatePixConfigAction, deleteIncomeAction } from "@/actions/finance.actions"

interface UseFinanceLogicProps {
  churchId: string
  initialPixConfig?: PixConfig | null
  initialIncomes?: Income[]
}

export function useFinanceLogic({
  churchId,
  initialPixConfig,
  initialIncomes = [],
}: UseFinanceLogicProps) {
  const [pixConfig, setPixConfig] = useState<PixConfig | null>(initialPixConfig || null)
  const [incomes, setIncomes] = useState<Income[]>(initialIncomes)
  const [copied, setCopied] = useState(false)
  const [isPixDialogOpen, setIsPixDialogOpen] = useState(false)
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false)

  const handleCopyPix = () => {
    if (pixConfig?.copyPasteCode) {
      navigator.clipboard.writeText(pixConfig.copyPasteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const onPixSubmit = async (data: PixConfigFormData) => {
    const result = await updatePixConfigAction(churchId, data)
    if (result.success) {
      const copyPasteCode = data.copyPasteCode || `00020126580014br.gov.bcb.pix0136${data.pixKeyValue}`
      setPixConfig({ ...data, copyPasteCode })
      setIsPixDialogOpen(false)
      toast.success("Configuração PIX atualizada!")
    } else {
      toast.error(result.error)
    }
  }

  const onIncomeSubmit = async (data: ManualIncomeFormData) => {
    const result = await registerIncomeAction(churchId, data)
    if (result.success) {
      if (result.data) {
        setIncomes((current) => [result.data as Income, ...current])
      }
      setIsIncomeDialogOpen(false)
      toast.success("Entrada registrada!")
      return true
    } else {
      toast.error(result.error)
      return false
    }
  }

  const deleteIncome = async (id: string) => {
    const result = await deleteIncomeAction(churchId, id)
    if (result.success) {
      setIncomes(incomes.filter((i) => i.id !== id))
      toast.success("Entrada removida!")
    } else {
      toast.error(result.error)
    }
  }

  const totalMonth = incomes.reduce((acc, i) => acc + i.amount, 0)
  const totalTithe = incomes
    .filter((i) => i.category === "tithe")
    .reduce((acc, i) => acc + i.amount, 0)
  const totalOffering = incomes
    .filter((i) => i.category === "offering")
    .reduce((acc, i) => acc + i.amount, 0)

  return {
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
    stats: {
      totalMonth,
      totalTithe,
      totalOffering,
    },
  }
}
