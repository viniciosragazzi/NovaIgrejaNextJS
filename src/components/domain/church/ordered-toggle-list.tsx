"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface OrderedToggleListItem<T extends string> {
  key: T
  enabled: boolean
}

interface OrderedToggleListProps<T extends string> {
  label: string
  items: OrderedToggleListItem<T>[]
  labels: Record<T, string>
  onChange: (items: OrderedToggleListItem<T>[]) => void
}

export function OrderedToggleList<T extends string>({
  label,
  items,
  labels,
  onChange,
}: OrderedToggleListProps<T>) {
  function moveItem(index: number, direction: -1 | 1) {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= items.length) {
      return
    }

    const nextItems = [...items]
    const [current] = nextItems.splice(index, 1)
    nextItems.splice(nextIndex, 0, current)
    onChange(nextItems)
  }

  function toggleItem(index: number, checked: boolean) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              enabled: checked,
            }
          : item
      )
    )
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.key} className="flex flex-col gap-3 rounded-2xl border bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium break-words">{labels[item.key]}</p>
              <p className="text-xs text-muted-foreground">Posicao {index + 1}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Switch checked={item.enabled} onCheckedChange={(checked) => toggleItem(index, checked)} />
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => moveItem(index, -1)}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => moveItem(index, 1)}>
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
