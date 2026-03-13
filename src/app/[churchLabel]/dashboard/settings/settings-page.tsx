"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import {
  Bell,
  Camera,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Moon,
  Palette,
  Save,
  Settings,
  Shield,
  Smartphone,
  Sun,
  TriangleAlert,
  UserRound,
} from "lucide-react"
import { changeMyPasswordAction, updateMyProfileAction } from "@/actions/account.actions"
import { ImageUploadField } from "@/components/domain/church/image-upload-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const languageStorageKey = "novaigreja.settings.language"
const notificationStorageKey = "novaigreja.settings.notifications"

type ThemeOption = "light" | "dark" | "system"
type LanguageOption = "pt-BR" | "en-US" | "es"

type NotificationSettings = {
  newVisitor: boolean
  weeklyReport: boolean
  pushNotifications: boolean
}

interface SettingsPageProps {
  isStaff: boolean
  currentUser: {
    name: string
    email: string
    image: string
  }
}

export default function SettingsPage({ isStaff, currentUser }: SettingsPageProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileDraft, setProfileDraft] = useState({
    name: currentUser.name,
    image: currentUser.image,
  })

  const [appearance, setAppearance] = useState<{
    theme: ThemeOption
    language: LanguageOption
  }>({
    theme: "system",
    language: "pt-BR",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    newVisitor: true,
    weeklyReport: true,
    pushNotifications: true,
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    revokeOtherSessions: true,
  })

  const [isSavingProfile, startProfileTransition] = useTransition()
  const [isSavingAppearance, startAppearanceTransition] = useTransition()
  const [isSavingNotifications, startNotificationsTransition] = useTransition()
  const [isChangingPassword, startPasswordTransition] = useTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const savedLanguage = window.localStorage.getItem(languageStorageKey) as LanguageOption | null
    if (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es") {
      setAppearance((current) => ({ ...current, language: savedLanguage }))
    }

    const rawNotificationSettings = window.localStorage.getItem(notificationStorageKey)
    if (!rawNotificationSettings) {
      return
    }

    try {
      const parsed = JSON.parse(rawNotificationSettings) as Partial<NotificationSettings>
      setNotifications((current) => ({
        newVisitor: typeof parsed.newVisitor === "boolean" ? parsed.newVisitor : current.newVisitor,
        weeklyReport: typeof parsed.weeklyReport === "boolean" ? parsed.weeklyReport : current.weeklyReport,
        pushNotifications:
          typeof parsed.pushNotifications === "boolean"
            ? parsed.pushNotifications
            : current.pushNotifications,
      }))
    } catch {
      window.localStorage.removeItem(notificationStorageKey)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const nextTheme = theme === "light" || theme === "dark" || theme === "system" ? theme : "system"
    setAppearance((current) => (current.theme === nextTheme ? current : { ...current, theme: nextTheme }))
  }, [mounted, theme])

  const currentThemeLabel = useMemo(() => {
    if (appearance.theme === "dark") {
      return "Escuro"
    }

    if (appearance.theme === "light") {
      return "Claro"
    }

    return "Sistema"
  }, [appearance.theme])

  function saveProfile() {
    startProfileTransition(async () => {
      const result = await updateMyProfileAction(profileDraft)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel atualizar seu perfil.")
        return
      }

      toast.success("Perfil atualizado com sucesso.")
      router.refresh()
    })
  }

  function saveAppearance() {
    startAppearanceTransition(async () => {
      setTheme(appearance.theme)
      window.localStorage.setItem(languageStorageKey, appearance.language)
      toast.success("Preferencias de aparencia salvas.")
    })
  }

  function saveNotifications() {
    startNotificationsTransition(async () => {
      window.localStorage.setItem(notificationStorageKey, JSON.stringify(notifications))
      toast.success("Preferencias de notificacao salvas neste navegador.")
    })
  }

  function changePassword() {
    startPasswordTransition(async () => {
      const result = await changeMyPasswordAction(security)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel alterar sua senha.")
        return
      }

      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        revokeOtherSessions: security.revokeOtherSessions,
      })
      toast.success("Senha atualizada com sucesso.")
    })
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold">Configuracoes</h1>
        <p className="text-muted-foreground">
          Gerencie seu perfil, preferencias e a seguranca da sua conta.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <UserRound className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Meu Perfil</CardTitle>
              <p className="text-sm text-muted-foreground">
                Atualize seu nome, foto e os dados usados na sua conta.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="settings-name">Nome</Label>
                  <Input
                    id="settings-name"
                    value={profileDraft.name}
                    onChange={(event) =>
                      setProfileDraft((current) => ({ ...current, name: event.target.value }))
                    }
                    className="h-12 rounded-xl"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="settings-email">E-mail</Label>
                  <Input
                    id="settings-email"
                    value={currentUser.email}
                    disabled
                    className="h-12 rounded-xl opacity-80"
                  />
                  <p className="text-xs text-muted-foreground">
                    O e-mail atual identifica sua conta e nao pode ser alterado nesta tela.
                  </p>
                </div>

                <div className="rounded-2xl border bg-muted/20 p-4">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Visibilidade no painel</p>
                      <p className="text-sm text-muted-foreground">
                        Seu nome atualizado aparece no painel e em partes do cadastro interno.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <ImageUploadField
                label="Foto de perfil"
                value={profileDraft.image}
                onChange={(image) => setProfileDraft((current) => ({ ...current, image }))}
                placeholder="https://"
                hint="Voce pode usar uma URL ou enviar uma imagem."
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={saveProfile}
                disabled={isSavingProfile}
                className="h-12 rounded-2xl px-6"
              >
                {isSavingProfile ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar perfil
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <Bell className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Notificacoes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ajuste alertas locais usados neste navegador.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Novos Visitantes</p>
                  <p className="text-sm text-muted-foreground">
                    Preferencia local para destacar eventos de novos visitantes.
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.newVisitor}
                onCheckedChange={(checked) =>
                  setNotifications((current) => ({ ...current, newVisitor: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Relatorio Semanal</p>
                  <p className="text-sm text-muted-foreground">
                    Guarda sua preferencia para resumos e lembretes no painel.
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setNotifications((current) => ({ ...current, weeklyReport: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Mantem a preferencia salva para este dispositivo.
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotifications((current) => ({ ...current, pushNotifications: checked }))
                }
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={saveNotifications}
                disabled={isSavingNotifications}
                className="h-12 rounded-2xl px-6"
              >
                {isSavingNotifications ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar notificacoes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--status-success))]">
              <Palette className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <CardTitle>Aparencia</CardTitle>
              <p className="text-sm text-muted-foreground">
                Personalize como o painel se comporta no seu navegador.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {appearance.theme === "dark" ? (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Sun className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-muted-foreground">
                    Atualmente: {mounted ? currentThemeLabel : "Carregando..."}
                  </p>
                </div>
              </div>
              <Select
                value={appearance.theme}
                onValueChange={(value) => {
                  if (!value) {
                    return
                  }

                  setAppearance((current) => ({ ...current, theme: value }))
                }}
              >
                <SelectTrigger className="w-36 rounded-xl bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-muted-foreground">
                    Preferencia salva localmente para evolucoes futuras da interface.
                  </p>
                </div>
              </div>
              <Select
                value={appearance.language}
                onValueChange={(value) => {
                  if (!value) {
                    return
                  }

                  setAppearance((current) => ({ ...current, language: value }))
                }}
              >
                <SelectTrigger className="w-44 rounded-xl bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Portugues (BR)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es">Espanol</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={saveAppearance}
                disabled={isSavingAppearance}
                className="h-12 rounded-2xl px-6"
              >
                {isSavingAppearance ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar aparencia
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Seguranca</CardTitle>
              <p className="text-sm text-muted-foreground">
                Altere sua senha e mantenha sua conta protegida.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="h-12 rounded-xl pr-10"
                    placeholder="Digite sua senha atual"
                    value={security.currentPassword}
                    onChange={(event) =>
                      setSecurity((current) => ({ ...current, currentPassword: event.target.value }))
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-xl"
                    onClick={() => setShowCurrentPassword((current) => !current)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="h-12 rounded-xl pr-10"
                      placeholder="Digite a nova senha"
                      value={security.newPassword}
                      onChange={(event) =>
                        setSecurity((current) => ({ ...current, newPassword: event.target.value }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-xl"
                      onClick={() => setShowNewPassword((current) => !current)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="h-12 rounded-xl pr-10"
                      placeholder="Confirme a nova senha"
                      value={security.confirmPassword}
                      onChange={(event) =>
                        setSecurity((current) => ({ ...current, confirmPassword: event.target.value }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-xl"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Encerrar outras sessoes</p>
                  <p className="text-sm text-muted-foreground">
                    Recomendado ao trocar a senha em computadores compartilhados.
                  </p>
                </div>
              </div>
              <Switch
                checked={security.revokeOtherSessions}
                onCheckedChange={(checked) =>
                  setSecurity((current) => ({ ...current, revokeOtherSessions: checked }))
                }
              />
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4">
              <div className="flex items-start gap-3">
                <TriangleAlert className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="font-medium">Autenticacao em dois fatores</p>
                  <p className="text-sm text-muted-foreground">
                    Este projeto ainda nao configurou o plugin de 2FA no auth. A troca de senha ja
                    esta funcional, mas o 2FA ainda nao esta disponivel nesta base.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={changePassword}
                disabled={isChangingPassword}
                className="h-12 rounded-2xl px-6"
              >
                {isChangingPassword ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Atualizar senha
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="rounded-2xl border border-destructive/20 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <TriangleAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <p className="text-sm text-muted-foreground">
                Recursos destrutivos continuam bloqueados ate terem fluxo seguro completo.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Exclusao de conta</p>
              <p className="text-sm text-muted-foreground">
                Esta acao ainda nao foi implementada com confirmacao e auditoria.
              </p>
            </div>
            <Button type="button" variant="destructive" disabled className="h-12 rounded-2xl px-6">
              Indisponivel por enquanto
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <div className="rounded-2xl border bg-card px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {isStaff ? "Modo administrativo" : "Conta de membro"}
          </span>
          {" "}
          ativa nesta igreja.
        </div>
      </motion.div>
    </motion.div>
  )
}
