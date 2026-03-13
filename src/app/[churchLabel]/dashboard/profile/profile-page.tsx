"use client"

import { useMemo, useState, type ReactNode } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Controller, useForm, useWatch } from "react-hook-form"
import {
  Bell,
  BookOpen,
  CalendarDays,
  Church,
  Globe,
  GripVertical,
  Landmark,
  Link2,
  MapPin,
  MessageCircle,
  Palette,
  Plus,
  Save,
  Shield,
  Trash2,
  Users,
} from "lucide-react"
import { DayOfWeek } from "@prisma/generated/prisma/client"
import { toast } from "sonner"
import {
  Church as ChurchData,
  ChurchGroupConfig,
  ChurchLink,
  MinistryCustomization,
  NoticeBoardEntry,
  PermissionModuleKey,
  PermissionStatusKey,
  PrayerRequestEntry,
} from "@/@types/church.types"
import { updateChurchProfileAction } from "@/actions/church.actions"
import { ImageUploadField } from "@/components/domain/church/image-upload-field"
import { OrderedToggleList } from "@/components/domain/church/ordered-toggle-list"
import { StringListField } from "@/components/domain/church/string-list-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  homepageWidgetLabels,
  normalizeChurchCustomization,
  permissionModuleLabels,
  permissionStatusDescriptions,
  permissionStatusLabels,
  publicSectionLabels,
} from "@/lib/church-customization"
import { churchProfileSchema, ChurchProfileSchemaData } from "@/lib/validations"

const dayLabels: Record<DayOfWeek, string> = {
  DOMINGO: "Domingo",
  SEGUNDA: "Segunda",
  TERCA: "Terca",
  QUARTA: "Quarta",
  QUINTA: "Quinta",
  SEXTA: "Sexta",
  SABADO: "Sabado",
}

function createEmptyGroupConfig(prefix: string): ChurchGroupConfig {
  return {
    id: `${prefix}-${crypto.randomUUID()}`,
    nomeGrupo: "",
    liderGrupo: "",
    dia: "",
    horario: "",
    local: "",
    capacidade: "",
    descricao: "",
    status: "ativo",
  }
}

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="w-full overflow-hidden rounded-3xl border-0 shadow-sm">
      <CardHeader className="border-b bg-muted/40">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            {icon}
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base break-words">{title}</CardTitle>
            <p className="text-sm leading-6 text-muted-foreground text-pretty">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">{children}</CardContent>
    </Card>
  )
}

function GroupEditor({
  title,
  items,
  onChange,
}: {
  title: string
  items: ChurchGroupConfig[]
  onChange: (items: ChurchGroupConfig[]) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">Cadastro complementar para organizacao interna.</p>
        </div>
        <Button type="button" variant="outline" className="h-11 rounded-xl sm:px-5" onClick={() => onChange([...items, createEmptyGroupConfig(title.toLowerCase())])}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>

      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={item.id} className="space-y-3 overflow-hidden rounded-3xl border bg-muted/30 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="font-medium break-words">{item.nomeGrupo || `${title} ${index + 1}`}</h4>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-xl text-muted-foreground hover:text-destructive" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {(
                [
                  ["nomeGrupo", "Nome"],
                  ["liderGrupo", "Lider"],
                  ["dia", "Dia"],
                  ["horario", "Horario"],
                  ["local", "Local"],
                  ["capacidade", "Capacidade"],
                  ["status", "Status"],
                ] as const
              ).map(([field, label]) => (
                <div key={field} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={item[field]}
                    onChange={(event) =>
                      onChange(
                        items.map((current, itemIndex) =>
                          itemIndex === index ? { ...current, [field]: event.target.value } : current
                        )
                      )
                    }
                    className="h-11 rounded-xl"
                  />
                </div>
              ))}
              <div className="space-y-2 md:col-span-2">
                <Label>Descricao</Label>
                <Textarea
                  value={item.descricao}
                  onChange={(event) =>
                    onChange(
                      items.map((current, itemIndex) =>
                        itemIndex === index ? { ...current, descricao: event.target.value } : current
                      )
                    )
                  }
                  className="min-h-20 rounded-xl"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">Nenhum item cadastrado.</div>
      )}
    </div>
  )
}

function createEmptyNoticeBoardEntry(): NoticeBoardEntry {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tag: "",
    ctaLabel: "",
    ctaUrl: "",
    published: true,
  }
}

function PrayerRequestManager({
  items,
  onChange,
}: {
  items: PrayerRequestEntry[]
  onChange: (items: PrayerRequestEntry[]) => void
}) {
  return (
    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={item.id} className="rounded-3xl border bg-muted/30 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium break-words">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.contact || "Sem contato"} • {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.status === "reviewed"}
                  onCheckedChange={(checked) =>
                    onChange(
                      items.map((current, itemIndex) =>
                        itemIndex === index ? { ...current, status: checked ? "reviewed" : "pending" } : current
                      )
                    )
                  }
                />
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
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.request}</p>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">
          Nenhum pedido de oracao recebido ainda.
        </div>
      )}
    </div>
  )
}

function NoticeBoardEditor({
  items,
  onChange,
}: {
  items: NoticeBoardEntry[]
  onChange: (items: NoticeBoardEntry[]) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Quadro de avisos</h3>
          <p className="text-sm text-muted-foreground">Avisos exibidos na pagina publica da igreja.</p>
        </div>
        <Button type="button" variant="outline" className="rounded-xl" onClick={() => onChange([...items, createEmptyNoticeBoardEntry()])}>
          <Plus className="mr-2 h-4 w-4" />
          Novo aviso
        </Button>
      </div>

      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={item.id} className="grid gap-4 rounded-3xl border bg-muted/30 p-4 xl:grid-cols-2">
            <div className="space-y-2">
              <Label>Titulo</Label>
              <Input value={item.title} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, title: event.target.value } : current))} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Tag</Label>
              <Input value={item.tag} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, tag: event.target.value } : current))} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2 xl:col-span-2">
              <Label>Conteudo</Label>
              <Textarea value={item.content} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, content: event.target.value } : current))} className="min-h-24 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Texto do botao</Label>
              <Input value={item.ctaLabel} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, ctaLabel: event.target.value } : current))} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>URL do botao</Label>
              <Input value={item.ctaUrl} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, ctaUrl: event.target.value } : current))} className="h-11 rounded-xl" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-3 xl:col-span-2">
              <div>
                <p className="font-medium">Publicado</p>
                <p className="text-sm text-muted-foreground">Controle a visibilidade desse aviso.</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={item.published} onCheckedChange={(published) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, published } : current))} />
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">Nenhum aviso configurado.</div>
      )}
    </div>
  )
}

function PermissionsMatrix({
  customization,
  setCustomization,
}: {
  customization: ChurchProfileSchemaData["customization"]
  setCustomization: <K extends keyof ChurchProfileSchemaData["customization"]>(
    section: K,
    value: ChurchProfileSchemaData["customization"][K]
  ) => void
}) {
  return (
    <SectionCard
      title="Permissoes por importancia"
      description="Os niveis exibidos seguem a importancia do acesso, mas continuam ligados aos status reais do schema."
      icon={<Shield className="h-5 w-5" />}
    >
      <div className="hidden overflow-x-auto rounded-3xl border xl:block">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Modulo</th>
              {(Object.keys(permissionStatusLabels) as PermissionStatusKey[]).map((status) => (
                <th key={status} className="px-4 py-3 text-center font-semibold">
                  <div>{permissionStatusLabels[status]}</div>
                  <div className="text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground">
                    {permissionStatusDescriptions[status]}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y bg-background">
            {(Object.keys(permissionModuleLabels) as PermissionModuleKey[]).map((module) => (
              <tr key={module}>
                <td className="px-4 py-3 font-medium">{permissionModuleLabels[module]}</td>
                {(Object.keys(permissionStatusLabels) as PermissionStatusKey[]).map((status) => (
                  <td key={`${status}-${module}`} className="px-4 py-3 text-center">
                    <Switch
                      checked={customization.permissoes.permissoesPorModulo[status][module]}
                      onCheckedChange={(enabled) =>
                        setCustomization("permissoes", {
                          permissoesPorModulo: {
                            ...customization.permissoes.permissoesPorModulo,
                            [status]: {
                              ...customization.permissoes.permissoesPorModulo[status],
                              [module]: enabled,
                            },
                          },
                        })
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 xl:hidden">
        {(Object.keys(permissionModuleLabels) as PermissionModuleKey[]).map((module) => (
          <div key={module} className="rounded-2xl border bg-muted/30 p-4">
            <p className="mb-3 font-medium">{permissionModuleLabels[module]}</p>
            <div className="space-y-3">
              {(Object.keys(permissionStatusLabels) as PermissionStatusKey[]).map((status) => (
                <div key={`${status}-${module}`} className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-sm text-muted-foreground">{permissionStatusLabels[status]}</span>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                      {permissionStatusDescriptions[status]}
                    </p>
                  </div>
                  <Switch
                    checked={customization.permissoes.permissoesPorModulo[status][module]}
                    onCheckedChange={(enabled) =>
                      setCustomization("permissoes", {
                        permissoesPorModulo: {
                          ...customization.permissoes.permissoesPorModulo,
                          [status]: {
                            ...customization.permissoes.permissoesPorModulo[status],
                            [module]: enabled,
                          },
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

interface ProfilePageProps {
  canManageProfile: boolean
  initialData: ChurchData
  initialLinks: ChurchLink[]
  initialMinistries: Array<{ id: string; name: string; description: string | null }>
  initialSchedules: Array<{ id: string; title: string; dayOfWeek: DayOfWeek; time: string; description: string | null }>
}

type ProfileTabKey = "geral" | "visual" | "organizacao" | "publico" | "doacoes" | "administracao"

const profileTabs: Array<{ key: ProfileTabKey; label: string }> = [
  { key: "geral", label: "Geral" },
  { key: "visual", label: "Visual" },
  { key: "organizacao", label: "Organizacao" },
  { key: "publico", label: "Pagina Publica" },
  { key: "doacoes", label: "Doacoes" },
  { key: "administracao", label: "Administracao" },
]

export default function ChurchProfilePage({
  canManageProfile,
  initialData,
  initialLinks,
  initialMinistries,
  initialSchedules,
}: ProfilePageProps) {
  const [quickLinks, setQuickLinks] = useState<Partial<ChurchLink>[]>(initialLinks)
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("geral")

  const defaultCustomization = useMemo(() => {
    const normalized = normalizeChurchCustomization(initialData.customization, initialMinistries)
    return {
      ...normalized,
      localizacao: {
        ...normalized.localizacao,
        endereco: normalized.localizacao.endereco || initialData.address,
      },
    }
  }, [initialData.address, initialData.customization, initialMinistries])

  const form = useForm<ChurchProfileSchemaData>({
    resolver: zodResolver(churchProfileSchema),
    defaultValues: {
      name: initialData.name,
      slug: initialData.label,
      address: initialData.address,
      customization: defaultCustomization,
    },
  })

  const customization = useWatch({ control: form.control, name: "customization" })

  function setCustomization<K extends keyof ChurchProfileSchemaData["customization"]>(
    section: K,
    value: ChurchProfileSchemaData["customization"][K]
  ) {
    form.setValue(`customization.${section}` as never, value as never, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  async function onSubmit(data: ChurchProfileSchemaData) {
    if (!canManageProfile) {
      return
    }

    setIsSubmitting(true)
    try {
      const result = await updateChurchProfileAction(initialData.id, data, quickLinks)
      if (!result.success) {
        toast.error(result.error || "Erro ao salvar configuracoes")
        return
      }
      toast.success("Personalizacao da igreja atualizada")
    } catch {
      toast.error("Erro critico na comunicacao com o servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  function addQuickLink() {
    if (!newLink.title.trim() || !newLink.url.trim()) {
      return
    }

    setQuickLinks((current) => [...current, { id: crypto.randomUUID(), title: newLink.title.trim(), url: newLink.url.trim(), active: true }])
    setNewLink({ title: "", url: "" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-7xl relative  space-y-8 overflow-x-hidden px-3 py-4 pb-24 sm:px-4 lg:p-8">
      <div className="space-y-2 ">
        <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">Personalizacao da Igreja</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground text-pretty">Centralize identidade visual, conteudo institucional, pagina publica e estrutura administrativa sem abrir modulos paralelos.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-full   space-y-8 overflow-x-hidden">
        <div className="space-y-6 overflow-x-hidden">
          <div className="overflow-hidden rounded-3xl bg-card p-2 shadow-sm">
            <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {profileTabs.map((tab) => (
                <Button
                  key={tab.key}
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveTab(tab.key)}
                  className={`min-w-0 flex-1 rounded-2xl px-3 py-3 text-center text-xs font-medium transition-colors sm:min-w-[9.5rem] sm:flex-none sm:text-sm ${activeTab === tab.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span className="block break-words leading-5">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {activeTab === "geral" ? (
            <div className="space-y-6">
              <SectionCard title="Dados Base" description="Informacoes usadas na identificacao da igreja e do painel." icon={<Church className="h-5 w-5" />}>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nome da Igreja</Label>
                    <Input {...form.register("name")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input {...form.register("slug")} disabled className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Endereco principal</Label>
                    <Input {...form.register("address")} className="h-11 rounded-xl" />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Informacoes Institucionais" description="Missao, visao, historia e textos principais." icon={<BookOpen className="h-5 w-5" />}>
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="space-y-2 xl:col-span-2">
                    <Label>Descricao</Label>
                    <Textarea {...form.register("customization.informacoesInstitucionais.descricao")} className="min-h-24 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Missao</Label>
                    <Textarea {...form.register("customization.informacoesInstitucionais.missao")} className="min-h-24 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Visao</Label>
                    <Textarea {...form.register("customization.informacoesInstitucionais.visao")} className="min-h-24 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ano de Fundacao</Label>
                    <Input {...form.register("customization.informacoesInstitucionais.anoFundacao")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pastor Principal</Label>
                    <Input {...form.register("customization.informacoesInstitucionais.pastorPrincipal")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Denominacao</Label>
                    <Input {...form.register("customization.informacoesInstitucionais.denominacao")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Slogan</Label>
                    <Input {...form.register("customization.informacoesInstitucionais.slogan")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2 xl:col-span-2">
                    <Label>Historia da Igreja</Label>
                    <Textarea {...form.register("customization.informacoesInstitucionais.historiaDaIgreja")} className="min-h-28 rounded-xl" />
                  </div>
                </div>
                <StringListField label="Valores" items={customization.informacoesInstitucionais.valores} onChange={(valores) => setCustomization("informacoesInstitucionais", { ...customization.informacoesInstitucionais, valores })} placeholder="Ex: Comunhao" emptyMessage="Nenhum valor institucional cadastrado." />
              </SectionCard>

              <SectionCard title="Localizacao e Contato" description="Endereco detalhado e links de mapas usados na pagina publica." icon={<MapPin className="h-5 w-5" />}>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {(
                    [
                      ["cep", "CEP"],
                      ["endereco", "Endereco"],
                      ["numero", "Numero"],
                      ["complemento", "Complemento"],
                      ["bairro", "Bairro"],
                      ["cidade", "Cidade"],
                      ["estado", "Estado"],
                      ["pais", "Pais"],
                      ["latitude", "Latitude"],
                      ["longitude", "Longitude"],
                      ["linkMaps", "Google Maps"],
                      ["linkWaze", "Waze"],
                    ] as const
                  ).map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <Label>{label}</Label>
                      <Input {...form.register(`customization.localizacao.${field}`)} className="h-11 rounded-xl" />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          ) : null}

          {activeTab === "visual" ? (
            <div className="space-y-6">
              <SectionCard title="Identidade Visual" description="Uploads, preview e configuracao de cores do modulo publico." icon={<Palette className="h-5 w-5" />}>
                <div className="grid gap-6 xl:grid-cols-2">
                  <ImageUploadField label="Logo Principal" value={customization.identidadeVisual.logoPrincipal.url} altValue={customization.identidadeVisual.logoPrincipal.alt} onChange={(url) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, logoPrincipal: { ...customization.identidadeVisual.logoPrincipal, url } })} onAltChange={(alt) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, logoPrincipal: { ...customization.identidadeVisual.logoPrincipal, alt } })} />
                  <ImageUploadField label="Logo Secundaria" value={customization.identidadeVisual.logoSecundaria.url} altValue={customization.identidadeVisual.logoSecundaria.alt} onChange={(url) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, logoSecundaria: { ...customization.identidadeVisual.logoSecundaria, url } })} onAltChange={(alt) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, logoSecundaria: { ...customization.identidadeVisual.logoSecundaria, alt } })} />
                  <ImageUploadField label="Favicon" value={customization.identidadeVisual.favicon.url} altValue={customization.identidadeVisual.favicon.alt} onChange={(url) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, favicon: { ...customization.identidadeVisual.favicon, url } })} onAltChange={(alt) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, favicon: { ...customization.identidadeVisual.favicon, alt } })} />
                  <ImageUploadField label="Imagem de Capa" value={customization.identidadeVisual.imagemCapa.url} altValue={customization.identidadeVisual.imagemCapa.alt} onChange={(url) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, imagemCapa: { ...customization.identidadeVisual.imagemCapa, url } })} onAltChange={(alt) => setCustomization("identidadeVisual", { ...customization.identidadeVisual, imagemCapa: { ...customization.identidadeVisual.imagemCapa, alt } })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2"><Label>Cor Primaria</Label><Input type="color" {...form.register("customization.identidadeVisual.corPrimaria")} className="h-12 rounded-xl p-2" /></div>
                  <div className="space-y-2"><Label>Cor Secundaria</Label><Input type="color" {...form.register("customization.identidadeVisual.corSecundaria")} className="h-12 rounded-xl p-2" /></div>
                  <div className="space-y-2 sm:col-span-2 lg:col-span-1"><Label>Cor de Apoio</Label><Input type="color" {...form.register("customization.identidadeVisual.corDeApoio")} className="h-12 rounded-xl p-2" /></div>
                </div>
              </SectionCard>

              <SectionCard title="Mensagens e Widgets" description="Conteudos configuraveis para home, visitantes e comunicacao." icon={<MessageCircle className="h-5 w-5" />}>
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="space-y-2"><Label>Mensagem do Pastor</Label><Textarea {...form.register("customization.paginaInicial.mensagemDoPastor")} className="min-h-24 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Devocional</Label><Textarea {...form.register("customization.paginaInicial.devocional")} className="min-h-24 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Mensagem Boas-vindas</Label><Textarea {...form.register("customization.comunicacao.mensagemBoasVindas")} className="min-h-24 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Mensagem Visitantes</Label><Textarea {...form.register("customization.comunicacao.mensagemVisitantes")} className="min-h-24 rounded-xl" /></div>
                </div>
                <StringListField label="Banners" items={customization.paginaInicial.banners} onChange={(banners) => setCustomization("paginaInicial", { ...customization.paginaInicial, banners })} placeholder="Cole a URL do banner" emptyMessage="Nenhum banner configurado." />
                <StringListField label="Canais de comunicacao" items={customization.comunicacao.canaisDeComunicacao} onChange={(canaisDeComunicacao) => setCustomization("comunicacao", { ...customization.comunicacao, canaisDeComunicacao })} placeholder="Ex: WhatsApp" emptyMessage="Nenhum canal configurado." />
                <OrderedToggleList label="Widgets ativos e ordem" items={customization.paginaInicial.widgets} labels={homepageWidgetLabels} onChange={(widgets) => setCustomization("paginaInicial", { ...customization.paginaInicial, widgets })} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === "organizacao" ? (
            <div className="space-y-6">
              <SectionCard title="Estrutura Organizacional" description="Departamentos, grupos, celulas e modulo de ministerios existente." icon={<Users className="h-5 w-5" />}>
                <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="min-w-0 space-y-6">
                    <StringListField label="Departamentos" items={customization.estruturaOrganizacional.departamentos} onChange={(departamentos) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, departamentos })} placeholder="Ex: Midia" emptyMessage="Nenhum departamento configurado." />
                    <StringListField label="Liderancas" items={customization.estruturaOrganizacional.liderancas} onChange={(liderancas) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, liderancas })} placeholder="Ex: Pr. Paulo" emptyMessage="Nenhuma lideranca listada." />
                  </div>
                  <div className="grid min-w-0 gap-4">
                    <div className="overflow-hidden rounded-3xl border bg-muted/30 p-5">
                      <div className="mb-3 flex items-center gap-2"><Users className="h-4 w-4 shrink-0" /><h3 className="font-semibold break-words">Ministerios existentes</h3></div>
                      <div className="space-y-2">
                        {initialMinistries.length > 0 ? initialMinistries.map((ministry) => <div key={ministry.id} className="rounded-2xl bg-background px-4 py-3 text-sm"><p className="font-medium">{ministry.name}</p><p className="text-xs text-muted-foreground">{ministry.description || "Sem descricao."}</p></div>) : <p className="text-sm text-muted-foreground">Nenhum ministerio cadastrado.</p>}
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-3xl border bg-muted/30 p-5">
                      <div className="mb-3 flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0" /><h3 className="font-semibold break-words">Cultos cadastrados</h3></div>
                      <div className="space-y-2">
                        {initialSchedules.length > 0 ? initialSchedules.map((schedule) => <div key={schedule.id} className="rounded-2xl bg-background px-4 py-3 text-sm"><p className="font-medium">{schedule.title}</p><p className="text-xs text-muted-foreground">{dayLabels[schedule.dayOfWeek]} as {schedule.time}</p></div>) : <p className="text-sm text-muted-foreground">Nenhum culto configurado.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Grupos e Celulas" description="Organizacao hierarquica complementar sem duplicar o modulo principal." icon={<Users className="h-5 w-5" />}>
                <div className="grid gap-8  2xl:grid-cols-2">
                  <GroupEditor title="Grupos" items={customization.estruturaOrganizacional.grupos} onChange={(grupos) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, grupos })} />
                  <GroupEditor title="Celulas" items={customization.estruturaOrganizacional.celulas} onChange={(celulas) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, celulas })} />
                </div>
              </SectionCard>

              <SectionCard title="Customizacao de Ministerios" description="Metadados publicos adicionais por ministerio ja existente." icon={<GripVertical className="h-5 w-5" />}>
                <div className="space-y-4">
                  {customization.estruturaOrganizacional.ministerios.length > 0 ? customization.estruturaOrganizacional.ministerios.map((ministry: MinistryCustomization, index) => (
                    <div key={ministry.ministryId} className="grid gap-4 overflow-hidden rounded-3xl border bg-muted/30 p-4 xl:grid-cols-2">
                      <div className="space-y-2"><Label>Nome do Ministerio</Label><Input value={ministry.nomeMinisterio} onChange={(event) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, ministerios: customization.estruturaOrganizacional.ministerios.map((item, itemIndex) => itemIndex === index ? { ...item, nomeMinisterio: event.target.value } : item) })} className="h-11 rounded-xl" /></div>
                      <div className="space-y-2"><Label>Lider do Ministerio</Label><Input value={ministry.liderMinisterio} onChange={(event) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, ministerios: customization.estruturaOrganizacional.ministerios.map((item, itemIndex) => itemIndex === index ? { ...item, liderMinisterio: event.target.value } : item) })} className="h-11 rounded-xl" /></div>
                      <div className="space-y-2"><Label>Imagem</Label><Input value={ministry.imagemMinisterio} onChange={(event) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, ministerios: customization.estruturaOrganizacional.ministerios.map((item, itemIndex) => itemIndex === index ? { ...item, imagemMinisterio: event.target.value } : item) })} className="h-11 rounded-xl" placeholder="https://..." /></div>
                      <div className="space-y-2"><Label>Vagas abertas</Label><Input value={ministry.vagasAbertas} onChange={(event) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, ministerios: customization.estruturaOrganizacional.ministerios.map((item, itemIndex) => itemIndex === index ? { ...item, vagasAbertas: event.target.value } : item) })} className="h-11 rounded-xl" /></div>
                      <div className="space-y-2 xl:col-span-2"><Label>Descricao</Label><Textarea value={ministry.descricaoMinisterio} onChange={(event) => setCustomization("estruturaOrganizacional", { ...customization.estruturaOrganizacional, ministerios: customization.estruturaOrganizacional.ministerios.map((item, itemIndex) => itemIndex === index ? { ...item, descricaoMinisterio: event.target.value } : item) })} className="min-h-24 rounded-xl" /></div>
                    </div>
                  )) : <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">Nenhum ministerio encontrado para personalizar.</div>}
                </div>
              </SectionCard>
            </div>
          ) : null}

          {activeTab === "publico" ? (
            <div className="mx-auto w-full min-w-0 sm:max-w-full max-w-sm overflow-x-hidden space-y-6  sm:max-w-none">
              <SectionCard title="Pagina Publica" description="Controle de secoes, SEO, galeria e quick links." icon={<Globe className="h-5 w-5" />}>
                <div className="grid min-w-0 max-w-full gap-4 xl:grid-cols-2">
                  <div className="space-y-2 xl:col-span-2"><Label>Sobre a Igreja</Label><Textarea {...form.register("customization.paginaPublica.sobreAIgreja")} className="min-h-28 rounded-xl" /></div>
                  <div className="space-y-2"><Label>SEO Titulo</Label><Input {...form.register("customization.paginaPublica.seoTitulo")} className="h-11 rounded-xl" /></div>
                  <div className="space-y-2"><Label>SEO Descricao</Label><Input {...form.register("customization.paginaPublica.seoDescricao")} className="h-11 rounded-xl" /></div>
                </div>
                <StringListField label="Pastores exibidos" items={customization.paginaPublica.pastores} onChange={(pastores) => setCustomization("paginaPublica", { ...customization.paginaPublica, pastores })} placeholder="Ex: Pr. Paulo" emptyMessage="Nenhum pastor listado." />
                <StringListField label="Galeria publica" items={customization.paginaPublica.galeria} onChange={(galeria) => setCustomization("paginaPublica", { ...customization.paginaPublica, galeria })} placeholder="Cole a URL da imagem" emptyMessage="Nenhuma imagem configurada." />
                <OrderedToggleList label="Secoes ativas e ordem" items={customization.paginaPublica.secoes} labels={publicSectionLabels} onChange={(secoes) => setCustomization("paginaPublica", { ...customization.paginaPublica, secoes })} />
              </SectionCard>

              <SectionCard title="Quick Links" description="Botoes de acao da home publica." icon={<Link2 className="h-5 w-5" />}>
                <div className="min-w-0 space-y-3 overflow-x-hidden">
                  {quickLinks.length > 0 ? quickLinks.map((link) => (
                    <div key={link.id} className="flex min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-2xl border bg-muted/30 p-3">
                      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{link.title}</p><p className="truncate text-xs text-muted-foreground">{link.url}</p></div>
                      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl text-muted-foreground hover:text-destructive" onClick={() => setQuickLinks((current) => current.filter((item) => item.id !== link.id))}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  )) : <div className="rounded-3xl border border-dashed p-6 text-sm text-muted-foreground">Nenhum quick link configurado.</div>}
                </div>
                <div className="grid min-w-0 max-w-full gap-3 overflow-hidden rounded-3xl border border-dashed p-4 md:grid-cols-2 xl:grid-cols-[minmax(0,180px)_minmax(0,1fr)_auto]">
                  <Input value={newLink.title} onChange={(event) => setNewLink((current) => ({ ...current, title: event.target.value }))} placeholder="Instagram" className="h-11 min-w-0 rounded-xl" />
                  <Input value={newLink.url} onChange={(event) => setNewLink((current) => ({ ...current, url: event.target.value }))} placeholder="https://..." className="h-11 min-w-0 rounded-xl md:col-span-1 xl:col-span-1" />
                  <Button type="button" className="h-11 w-full rounded-xl md:col-span-2 xl:col-span-1 xl:w-auto xl:px-5" onClick={addQuickLink}><Plus className="mr-2 h-4 w-4 shrink-0" />Adicionar</Button>
                </div>
              </SectionCard>

              <SectionCard title="Interacao Publica" description="Pedidos de oracao, ofertas publicas e quadro de avisos exibidos na home." icon={<Bell className="h-5 w-5" />}>
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Texto de apoio para pedido de oracao</Label>
                    <Textarea {...form.register("customization.interacaoPublica.prayerRequestIntro")} className="min-h-24 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mensagem de sucesso do pedido de oracao</Label>
                    <Textarea {...form.register("customization.interacaoPublica.prayerRequestSuccessMessage")} className="min-h-24 rounded-xl" />
                  </div>
                  <div className="space-y-2 xl:col-span-2">
                    <Label>Texto de apoio para oferta publica</Label>
                    <Textarea {...form.register("customization.interacaoPublica.publicOfferingIntro")} className="min-h-24 rounded-xl" />
                  </div>
                </div>

                <NoticeBoardEditor
                  items={customization.interacaoPublica.noticeBoard.map((item) => ({
                    ...item,
                    tag: item.tag || "",
                    ctaLabel: item.ctaLabel || "",
                    ctaUrl: item.ctaUrl || "",
                  }))}
                  onChange={(noticeBoard) =>
                    setCustomization("interacaoPublica", {
                      ...customization.interacaoPublica,
                      noticeBoard: noticeBoard.map((item) => ({
                        ...item,
                        tag: item.tag || "",
                        ctaLabel: item.ctaLabel || "",
                        ctaUrl: item.ctaUrl || "",
                      })),
                    })
                  }
                />

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">Pedidos recebidos</h3>
                    <p className="text-sm text-muted-foreground">Revise, marque como atendido ou remova pedidos enviados pela pagina publica.</p>
                  </div>
                  <PrayerRequestManager
                    items={customization.interacaoPublica.prayerRequests.map((item) => ({
                      ...item,
                      contact: item.contact || "",
                    }))}
                    onChange={(prayerRequests) =>
                      setCustomization("interacaoPublica", {
                        ...customization.interacaoPublica,
                        prayerRequests: prayerRequests.map((item) => ({
                          ...item,
                          contact: item.contact || "",
                        })),
                      })
                    }
                  />
                </div>
              </SectionCard>
            </div>
          ) : null}

          {activeTab === "doacoes" ? (
            <div className="space-y-6">
              <SectionCard title="Doacoes Publicas" description="Complementa o PIX ja existente com dados bancarios, categorias e visibilidade." icon={<Landmark className="h-5 w-5" />}>
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="space-y-2"><Label>Tipo de chave PIX atual</Label><Input value={initialData.pixKeyType || "Nao configurado"} disabled className="h-11 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Chave PIX atual</Label><Input value={initialData.pixKeyValue || "Nao configurado"} disabled className="h-11 rounded-xl" /></div>
                  <div className="space-y-2 xl:col-span-2"><Label>QR Code PIX / Copia e Cola publico</Label><Textarea {...form.register("customization.doacoes.qrCodePix")} className="min-h-24 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Banco</Label><Input {...form.register("customization.doacoes.banco")} className="h-11 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Agencia</Label><Input {...form.register("customization.doacoes.agencia")} className="h-11 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Conta</Label><Input {...form.register("customization.doacoes.conta")} className="h-11 rounded-xl" /></div>
                  <div className="rounded-3xl border bg-muted/30 p-4"><p className="text-sm font-medium">Exibir doacoes publicamente</p><Controller control={form.control} name="customization.doacoes.exibirPublicamente" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="mt-4" />} /></div>
                  <div className="rounded-3xl border bg-muted/30 p-4"><p className="text-sm font-medium">Doacoes ativas</p><Controller control={form.control} name="customization.doacoes.doacoesAtivas" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="mt-4" />} /></div>
                </div>
                <StringListField label="Categorias de contribuicao" items={customization.doacoes.categoriasDeContribuicao} onChange={(categoriasDeContribuicao) => setCustomization("doacoes", { ...customization.doacoes, categoriasDeContribuicao })} placeholder="Ex: Dizimo" emptyMessage="Nenhuma categoria configurada." />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === "administracao" ? (
            <div className="space-y-6">
              <PermissionsMatrix
                customization={customization}
                setCustomization={setCustomization}
              />
            </div>
          ) : null}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !canManageProfile} className="h-14 w-full rounded-2xl px-6 sm:w-auto sm:px-10">
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Personalizacao"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
