"use client"

import { useState } from "react"
import { CheckCircle2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { PrayerRequestEntry } from "@/@types/church.types"
import { deletePrayerRequestAction, updatePrayerRequestStatusAction } from "@/actions/public.actions"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrayersPage({
  churchId,
  initialItems,
}: {
  churchId: string
  initialItems: PrayerRequestEntry[]
}) {
  const [items, setItems] = useState(initialItems)

  async function handleStatusChange(requestId: string, status: "pending" | "reviewed") {
    const result = await updatePrayerRequestStatusAction(churchId, requestId, status)
    if (!result.success) {
      toast.error(result.error || "Nao foi possivel atualizar o pedido.")
      return
    }

    setItems((current) => current.map((item) => (item.id === requestId ? { ...item, status } : item)))
    toast.success("Pedido atualizado.")
  }

  async function handleDelete(requestId: string) {
    const result = await deletePrayerRequestAction(churchId, requestId)
    if (!result.success) {
      toast.error(result.error || "Nao foi possivel remover o pedido.")
      return
    }

    setItems((current) => current.filter((item) => item.id !== requestId))
    toast.success("Pedido removido.")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pedidos de Oracao"
        description="Acompanhe os pedidos enviados pela pagina publica da igreja."
        badge={`${items.length} pedidos`}
      />

      <div className="grid gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.contact || "Sem contato"} • {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {item.status === "reviewed" ? "Atendido" : "Pendente"}
                  </span>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">{item.request}</p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() => handleStatusChange(item.id, item.status === "reviewed" ? "pending" : "reviewed")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {item.status === "reviewed" ? "Marcar como pendente" : "Marcar como atendido"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-2xl text-destructive hover:text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Nenhum pedido de oracao recebido ate o momento.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
