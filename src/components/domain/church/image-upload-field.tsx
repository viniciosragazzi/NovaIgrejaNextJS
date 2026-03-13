"use client"

import { ChangeEvent, useRef } from "react"
import Image from "next/image"
import { ImagePlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon"]
const maxFileSize = 1024 * 1024

interface ImageUploadFieldProps {
  label: string
  value: string
  altValue?: string
  onChange: (value: string) => void
  onAltChange?: (value: string) => void
  placeholder?: string
  hint?: string
}

export function ImageUploadField({
  label,
  value,
  altValue = "",
  onChange,
  onAltChange,
  placeholder,
  hint,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (!allowedTypes.includes(file.type) || file.size > maxFileSize) {
      event.target.value = ""
      return
    }

    const encoded = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
      reader.onerror = () => reject(new Error("Falha ao processar imagem"))
      reader.readAsDataURL(file)
    })

    onChange(encoded)
    event.target.value = ""
  }

  return (
    <div className="min-w-0 space-y-3">
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
          {value ? (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border bg-background">
                <Image src={value} alt={altValue || label} width={640} height={320} unoptimized className="h-32 w-full object-cover sm:h-40" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={() => inputRef.current?.click()}>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Trocar
                </Button>
                <Button type="button" variant="ghost" className="h-11 rounded-xl text-destructive" onClick={() => onChange("")}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={() => inputRef.current?.click()}
              className="flex h-auto w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ImagePlus className="h-6 w-6" />
              <span>Enviar imagem</span>
              <span className="text-xs">PNG, JPG, WEBP, SVG ou ICO ate 1MB</span>
            </Button>
          )}
          <input ref={inputRef} type="file" className="hidden" accept={allowedTypes.join(",")} onChange={handleFileChange} />
        </div>
        {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
      </div>

      <div className="space-y-2">
        <Label>URL da imagem</Label>
        <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder || "https://"} className="h-11 rounded-xl" />
      </div>

      {onAltChange ? (
        <div className="space-y-2">
          <Label>Texto alternativo</Label>
          <Input value={altValue} onChange={(event) => onAltChange(event.target.value)} placeholder="Descricao da imagem" className="h-11 rounded-xl" />
        </div>
      ) : null}
    </div>
  )
}
