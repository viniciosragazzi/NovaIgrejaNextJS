"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, CheckCircle2, Sparkles, UserCircle2, Users } from "lucide-react"
import { toast } from "sonner"
import type { MemberOnboardingDraft } from "@/@types/onboarding.types"
import { completeMemberOnboardingAction, saveMemberOnboardingDraftAction } from "@/actions/onboarding.actions"
import { ImageUploadField } from "@/components/domain/church/image-upload-field"
import { OnboardingProgressIndicator } from "@/components/onboarding/progress-indicator"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { memberOnboardingSchema } from "@/lib/validations"
import { cn } from "@/lib/utils"

const memberSteps = [
  { title: "Boas-vindas" },
  { title: "Perfil" },
  { title: "Interesses" },
  { title: "Comunicacao" },
  { title: "Finalizar" },
]

function createDefaultDraft({
  fullName,
  phone,
  birthDate,
  profileImage,
}: {
  fullName: string
  phone: string
  birthDate: string
  profileImage: string
}): MemberOnboardingDraft {
  return {
    step: 0,
    profile: {
      fullName,
      phone,
      birthDate,
      profileImage,
    },
    interests: {
      ministries: [],
      areas: [],
      skills: [],
      skipped: false,
    },
    communication: {
      eventNotifications: true,
      worshipNotifications: true,
      churchMessages: true,
    },
  }
}

export default function MemberWelcomePage({
  churchId,
  churchLabel,
  churchName,
  welcomeMessage,
  member,
  ministries,
}: {
  churchId: string
  churchLabel: string
  churchName: string
  welcomeMessage: string
  member: {
    fullName: string
    phone: string
    birthDate: string
    profileImage: string
    draft: unknown
  }
  ministries: Array<{ id: string; name: string; description: string | null }>
}) {
  const router = useRouter()
  const parsedDraft = useMemo(() => {
    if (!member.draft || typeof member.draft !== "object") {
      return createDefaultDraft(member)
    }

    const draft = member.draft as Partial<MemberOnboardingDraft>
    return {
      ...createDefaultDraft(member),
      ...draft,
      profile: {
        ...createDefaultDraft(member).profile,
        ...draft.profile,
      },
      interests: {
        ...createDefaultDraft(member).interests,
        ...draft.interests,
      },
      communication: {
        ...createDefaultDraft(member).communication,
        ...draft.communication,
      },
    } satisfies MemberOnboardingDraft
  }, [member])

  const [draft, setDraft] = useState<MemberOnboardingDraft>(parsedDraft)
  const [step, setStep] = useState(parsedDraft.step || 0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validation = memberOnboardingSchema.safeParse({
    profile: draft.profile,
    interests: draft.interests,
    communication: draft.communication,
  })

  async function persistDraft(nextDraft: MemberOnboardingDraft) {
    const result = await saveMemberOnboardingDraftAction(churchId, nextDraft)
    if (!result.success) {
      toast.error(result.error || "Nao foi possivel salvar seu progresso.")
    }
  }

  async function handleNext() {
    const nextStep = Math.min(step + 1, memberSteps.length - 1)
    const nextDraft = { ...draft, step: nextStep }
    setDraft(nextDraft)
    setStep(nextStep)
    await persistDraft(nextDraft)
  }

  async function handleBack() {
    const nextStep = Math.max(step - 1, 0)
    const nextDraft = { ...draft, step: nextStep }
    setDraft(nextDraft)
    setStep(nextStep)
    await persistDraft(nextDraft)
  }

  async function handleFinish() {
    if (!validation.success) {
      toast.error("Revise as informacoes obrigatorias antes de continuar.")
      return
    }

    setIsSubmitting(true)
    const result = await completeMemberOnboardingAction(churchId, validation.data)
    setIsSubmitting(false)

    if (!result.success) {
      toast.error(result.error || "Nao foi possivel concluir seu onboarding.")
      return
    }

    toast.success("Seu perfil inicial foi concluido.")
    router.push(`/${churchLabel}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(23,23,23,0.08),_transparent_35%),linear-gradient(180deg,#fafafa_0%,#f3f4f6_100%)] sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-6xl space-y-8 bg-white/90 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:rounded-[2.5rem] sm:p-8">
        <OnboardingProgressIndicator steps={memberSteps} currentStep={step} variant="compact" />

        {step === 0 ? (
          <OnboardingShell
            eyebrow="Bem-vindo"
            title={`Que bom ter voce aqui em ${churchName}.`}
            description={welcomeMessage}
            visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><Sparkles className="h-20 w-20 text-primary" /></div>}
            nextLabel="Comecar"
            onNext={handleNext}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: UserCircle2, label: "Seu perfil" },
                { icon: Users, label: "Seus interesses" },
                { icon: Bell, label: "Sua comunicacao" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border bg-muted/30 p-4 text-center">
                  <item.icon className="mx-auto h-6 w-6 text-primary" />
                  <p className="mt-3 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </OnboardingShell>
        ) : null}

        {step === 1 ? (
          <OnboardingShell
            eyebrow="Passo 1"
            title="Complete seu perfil"
            description="Esses dados ajudam a igreja a se comunicar melhor com voce."
            visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><UserCircle2 className="h-20 w-20 text-primary" /></div>}
            nextLabel="Salvar perfil"
            canGoBack
            onBack={handleBack}
            onNext={handleNext}
          >
            <div className="space-y-4">
              <ImageUploadField label="Foto de perfil" value={draft.profile.profileImage} onChange={(profileImage) => setDraft((current) => ({ ...current, profile: { ...current.profile, profileImage } }))} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input value={draft.profile.fullName} onChange={(event) => setDraft((current) => ({ ...current, profile: { ...current.profile, fullName: event.target.value } }))} className="h-12 rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input value={draft.profile.phone} onChange={(event) => setDraft((current) => ({ ...current, profile: { ...current.profile, phone: event.target.value } }))} className="h-12 rounded-2xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Data de nascimento</Label>
                <Input type="date" value={draft.profile.birthDate} onChange={(event) => setDraft((current) => ({ ...current, profile: { ...current.profile, birthDate: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
            </div>
          </OnboardingShell>
        ) : null}

        {step === 2 ? (
          <OnboardingShell
            eyebrow="Passo 2"
            title="Interesses e ministerios"
            description="Escolha onde voce se identifica mais. Se quiser, pode pular essa etapa."
            visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><Users className="h-20 w-20 text-primary" /></div>}
            nextLabel="Continuar"
            canGoBack
            onBack={handleBack}
            onNext={handleNext}
            helper={
              <Button
                type="button"
                variant="ghost"
                className="w-full rounded-2xl"
                onClick={async () => {
                  const nextDraft = { ...draft, interests: { ...draft.interests, skipped: true }, step: Math.min(step + 1, memberSteps.length - 1) }
                  setDraft(nextDraft)
                  setStep(nextDraft.step)
                  await persistDraft(nextDraft)
                }}
              >
                Pular por enquanto
              </Button>
            }
          >
            <div className="space-y-5">
              <div className="space-y-3">
                <Label>Ministerios de interesse</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ministries.map((ministry) => {
                    const selected = draft.interests.ministries.includes(ministry.name)
                    return (
                      <Button
                        key={ministry.id}
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          setDraft((current) => ({
                            ...current,
                            interests: {
                              ...current.interests,
                              ministries: selected
                                ? current.interests.ministries.filter((item) => item !== ministry.name)
                                : [...current.interests.ministries, ministry.name],
                            },
                          }))
                        }
                        className={cn(
                          "rounded-2xl border px-4 py-4 text-left transition-colors",
                          selected ? "border-primary bg-primary/5" : "border-border bg-background"
                        )}
                      >
                        <p className="font-medium">{ministry.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{ministry.description || "Sem descricao."}</p>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Areas de servico</Label>
                <Input value={draft.interests.areas.join(", ")} onChange={(event) => setDraft((current) => ({ ...current, interests: { ...current.interests, areas: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) } }))} className="h-12 rounded-2xl" placeholder="Ex: Recepcao, Midia, Louvor" />
              </div>

              <div className="space-y-2">
                <Label>Habilidades</Label>
                <Textarea value={draft.interests.skills.join(", ")} onChange={(event) => setDraft((current) => ({ ...current, interests: { ...current.interests, skills: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) } }))} className="min-h-24 rounded-2xl" placeholder="Ex: fotografia, acolhimento, organizacao" />
              </div>
            </div>
          </OnboardingShell>
        ) : null}

        {step === 3 ? (
          <OnboardingShell
            eyebrow="Passo 3"
            title="Preferencias de comunicacao"
            description="Defina como voce quer receber os principais avisos da igreja."
            visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><Bell className="h-20 w-20 text-primary" /></div>}
            nextLabel="Revisar"
            canGoBack
            onBack={handleBack}
            onNext={handleNext}
          >
            <div className="space-y-3">
              {[
                { key: "eventNotifications", label: "Notificacoes de eventos" },
                { key: "worshipNotifications", label: "Lembretes de cultos" },
                { key: "churchMessages", label: "Mensagens gerais da igreja" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-2xl border bg-muted/30 px-4 py-4">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">Voce pode alterar isso depois nas configuracoes.</p>
                  </div>
                  <Switch
                    checked={draft.communication[item.key as keyof MemberOnboardingDraft["communication"]]}
                    onCheckedChange={(checked) =>
                      setDraft((current) => ({
                        ...current,
                        communication: {
                          ...current.communication,
                          [item.key]: checked,
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </OnboardingShell>
        ) : null}

        {step === 4 ? (
          <OnboardingShell
            eyebrow="Finalizar"
            title="Tudo pronto para seu primeiro acesso"
            description="Revise seu resumo e conclua para entrar no app da igreja."
            visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><CheckCircle2 className="h-20 w-20 text-primary" /></div>}
            nextLabel="Entrar no app"
            canGoBack
            onBack={handleBack}
            onNext={handleFinish}
            isSubmitting={isSubmitting}
          >
            <div className="grid gap-3">
              <div className="rounded-2xl border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Perfil</p>
                <p className="mt-2 font-semibold">{draft.profile.fullName}</p>
                <p className="text-sm text-muted-foreground">{draft.profile.phone || "Telefone nao informado"}</p>
              </div>
              <div className="rounded-2xl border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Interesses</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {draft.interests.ministries.length > 0 ? draft.interests.ministries.join(", ") : "Nenhum ministerio selecionado"}
                </p>
              </div>
            </div>
          </OnboardingShell>
        ) : null}
      </div>
    </div>
  )
}
