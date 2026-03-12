"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function SettingsPage({ isStaff }: { isStaff: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      newVisitor: true,
      weeklyReport: true,
      emailAlerts: false,
      pushNotifications: true,
    },
    appearance: {
      theme: "light",
      language: "pt-BR",
    },
    security: {
      twoFactor: false,
    },
  })

  async function handleSave() {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Settings saved:", settings)
    setIsSubmitting(false)
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold">Configuracoes</h1>
        <p className="text-muted-foreground">
          Gerencie as preferencias da sua conta
        </p>
      </motion.div>

      {/* Notifications Card */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <Bell className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Notificacoes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure como voce recebe alertas
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
                    Receba alertas quando novos visitantes se cadastrarem
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notifications.newVisitor}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      newVisitor: checked,
                    },
                  })
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
                    Receba um resumo semanal por email
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      weeklyReport: checked,
                    },
                  })
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
                    Receba notificacoes no navegador
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      pushNotifications: checked,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance Card */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8ee4af]">
              <Palette className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <CardTitle>Aparencia</CardTitle>
              <p className="text-sm text-muted-foreground">
                Personalize a interface do sistema
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {settings.appearance.theme === "dark" ? (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Sun className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-muted-foreground">
                    Escolha entre claro ou escuro
                  </p>
                </div>
              </div>
              <Select
                value={settings.appearance.theme}
                onValueChange={(value) =>
                  value && setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, theme: value },
                  })
                }
              >
                <SelectTrigger className="w-32 rounded-xl border-0 bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-muted-foreground">
                    Selecione o idioma do sistema
                  </p>
                </div>
              </div>
              <Select
                value={settings.appearance.language}
                onValueChange={(value) =>
                  value && setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, language: value },
                  })
                }
              >
                <SelectTrigger className="w-40 rounded-xl border-0 bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Portugues (BR)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es">Espanol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Card */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Seguranca</CardTitle>
              <p className="text-sm text-muted-foreground">
                Proteja sua conta
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
                    type={showPassword ? "text" : "password"}
                    className="h-12 rounded-xl border-0 bg-muted/50 pr-10"
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="h-12 rounded-xl border-0 bg-muted/50"
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="h-12 rounded-xl border-0 bg-muted/50"
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Autenticacao em Dois Fatores</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de seguranca
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    security: { twoFactor: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border-0 border-destructive/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Excluir Conta</p>
                <p className="text-sm text-muted-foreground">
                  Esta acao e irreversivel e excluira todos os dados
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger >
                  <Button variant="destructive" className="rounded-xl">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir Conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acao nao pode ser desfeita. Isso excluira
                      permanentemente sua conta e remover todos os dados dos
                      nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Sim, excluir conta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={item} className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-primary px-8 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alteracoes
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  )
}
