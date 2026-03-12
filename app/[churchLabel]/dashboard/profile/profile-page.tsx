"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Church,
  Link2,
  Plus,
  Trash2,
  GripVertical,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Heart,
  QrCode,
  Music,
  Save,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Server Action
import { updateChurchProfileAction } from "./actions"

// Tipagens do Prisma e Validação
import { Church as ChurchDB, ChurchLink } from "@/prisma/generated/prisma/client"
import { churchProfileSchema, type ChurchProfileFormData } from "@/lib/validations"

const iconComponents: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  whatsapp: <MessageCircle className="h-4 w-4" />,
  globe: <Globe className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  location: <MapPin className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  qr: <QrCode className="h-4 w-4" />,
  music: <Music className="h-4 w-4" />,
}

function getIconForTitle(title: string): React.ReactNode {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("instagram")) return iconComponents.instagram
  if (lowerTitle.includes("whatsapp") || lowerTitle.includes("zap")) return iconComponents.whatsapp
  if (lowerTitle.includes("youtube")) return iconComponents.youtube
  if (lowerTitle.includes("facebook")) return iconComponents.facebook
  if (lowerTitle.includes("mapa") || lowerTitle.includes("local")) return iconComponents.location
  if (lowerTitle.includes("pix") || lowerTitle.includes("doe")) return iconComponents.heart
  return <Link2 className="h-4 w-4" />
}

interface ProfilePageProps {
  isStaff: boolean
  initialData: ChurchDB
  initialLinks: ChurchLink[]
}

export default function ChurchProfilePage({ isStaff, initialData, initialLinks }: ProfilePageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quickLinks, setQuickLinks] = useState<Partial<ChurchLink>[]>(initialLinks)
  const [newLink, setNewLink] = useState({ title: "", url: "" })

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ChurchProfileFormData>({
    resolver: zodResolver(churchProfileSchema),
    defaultValues: {
      name: initialData.name,
      slug: initialData.label,
      address: initialData.address,
    },
  })
  console.log("Erros de Validação:", errors);
  const slugValue = watch("slug")

  async function onSubmit(data: ChurchProfileFormData) {
    if (!isStaff) return

    setIsSubmitting(true)
    try {
      const result = await updateChurchProfileAction(initialData.id, data, quickLinks)
      if (result.success) {
        toast.success("Perfil e links atualizados!")
      } else {
        toast.error(result.error || "Erro ao salvar")
      }
    } catch (error) {
      toast.error("Erro crítico na comunicação com o servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  function addQuickLink() {
    if (newLink.title && newLink.url) {
      setQuickLinks([
        ...quickLinks,
        { id: Math.random().toString(), title: newLink.title, url: newLink.url, active: true },
      ])
      setNewLink({ title: "", url: "" })
    }
  }

  function removeQuickLink(id: string) {
    setQuickLinks(quickLinks.filter((link) => link.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 pb-20 space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações da Igreja</h1>
        <p className="text-muted-foreground">Gerencie a identidade visual e os canais da sua comunidade.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card: Informações Básicas */}
        <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-zinc-50/50 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                <Church className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Dados da Sede</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nome da Igreja</Label>
              <Input {...register("name")} className="rounded-xl bg-muted/30 border-zinc-200 h-12" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Slug da URL (Link único)</Label>
              <div className="flex items-center group">
                <span className="h-12 flex items-center px-3 rounded-l-xl bg-zinc-100 border border-r-0 text-zinc-500 text-sm">/</span>
                <Input {...register("slug")} className="rounded-l-none rounded-r-xl bg-muted/30 border-zinc-200 h-12" disabled />
              </div>
              <p className="text-[10px] text-muted-foreground italic">O link da igreja não pode ser alterado após o onboarding.</p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Endereço Completo</Label>
              <Input {...register("address")} className="rounded-xl bg-muted/30 h-12" placeholder="Rua, número, Bairro - Cidade/UF" />
            </div>
          </CardContent>
        </Card>

        {/* Card: Quick Links */}
        <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-zinc-50/50 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-[#8ee4af] p-2 rounded-lg">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Botões de Ação (Quick Links)</CardTitle>
                <p className="text-xs text-muted-foreground">Estes links aparecem na página inicial da igreja.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <AnimatePresence>
                {quickLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-100 group"
                  >
                    <GripVertical className="h-4 w-4 text-zinc-300 cursor-grab" />
                    <div className="p-2 bg-white rounded-lg shadow-sm">{getIconForTitle(link.title || "")}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{link.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{link.url}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-red-500"
                      onClick={() => removeQuickLink(link.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Inserção de Novo Link */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border-2 border-dashed border-zinc-100 sm:flex-row">
              <div className="flex-1 flex gap-2">
                <Input
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  placeholder="Ex: Instagram"
                  className="h-10 rounded-lg"
                />
                <Input
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="https://..."
                  className="h-10 rounded-lg flex-[2]"
                />
              </div>
              <Button type="button" onClick={addQuickLink} className="h-10 rounded-lg bg-zinc-900 text-white" disabled={!newLink.title || !newLink.url}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botão Flutuante de Save (Desktop/Mobile) */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || !isStaff}
            className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            {isSubmitting ? <><Save className="animate-spin mr-2 h-4 w-4" /> Salvando...</> : <><Save className="mr-2 h-4 w-4" /> Salvar Tudo</>}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
