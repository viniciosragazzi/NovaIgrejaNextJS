"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StringListFieldProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
  emptyMessage: string
}

export function StringListField({
  label,
  items,
  onChange,
  placeholder,
  emptyMessage,
}: StringListFieldProps) {
  const [value, setValue] = useState("")

  function addItem() {
    const nextValue = value.trim()
    if (!nextValue) {
      return
    }

    onChange([...items, nextValue])
    setValue("")
  }

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-x-hidden">
      <Label>{label}</Label>
      <div className="flex min-w-0 max-w-full flex-col gap-2 sm:flex-row">
        <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} className="h-11 min-w-0 rounded-xl" />
        <Button type="button" className="h-11 w-full rounded-xl sm:w-auto sm:px-5" onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="min-w-0 max-w-full space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={`${item}-${index}`} className="flex min-w-0 max-w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border bg-muted/30 px-4 py-3">
              <span className="min-w-0 break-all text-sm leading-6">{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed px-4 py-6 text-sm text-muted-foreground">{emptyMessage}</div>
        )}
      </div>
    </div>
  )
}
