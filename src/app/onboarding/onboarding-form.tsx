"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Church, HandHeart, ImageIcon, MapPin, PartyPopper, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import type { ChurchOnboardingDraft } from "@/@types/onboarding.types";
import { submitChurchOnboardingAction } from "@/actions/onboarding.actions";
import { ImageUploadField } from "@/components/domain/church/image-upload-field";
import { OnboardingProgressIndicator } from "@/components/onboarding/progress-indicator";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { churchOnboardingSchema } from "@/lib/validations";
import type { ZodIssue } from "zod";

const storageKey = "novaigreja:church-onboarding-draft";

const dayOptions = [
  { value: "sunday", label: "Domingo" },
  { value: "monday", label: "Segunda" },
  { value: "tuesday", label: "Terca" },
  { value: "wednesday", label: "Quarta" },
  { value: "thursday", label: "Quinta" },
  { value: "friday", label: "Sexta" },
  { value: "saturday", label: "Sabado" },
] as const;

const stepTitles = [
  { title: "Boas-vindas" },
  { title: "Informacoes basicas" },
  { title: "Identidade visual" },
  { title: "Localizacao" },
  { title: "Cultos" },
  { title: "Doacoes" },
  { title: "Conclusao" },
];

function createDefaultDraft(): ChurchOnboardingDraft {
  return {
    welcomeCompleted: false,
    basicInfo: {
      churchName: "",
      description: "",
      denomination: "",
      pastorName: "",
      slug: "",
    },
    branding: {
      logoUrl: "",
      coverUrl: "",
      primaryColor: "#171717",
      secondaryColor: "#8ee4af",
    },
    location: {
      address: "",
      city: "",
      state: "",
      country: "Brasil",
    },
    schedules: [
      {
        id: crypto.randomUUID(),
        title: "Culto de Celebracao",
        dayOfWeek: "sunday",
        time: "19:00",
      },
    ],
    donations: {
      pixKey: "",
      pixCopyPaste: "",
      skip: false,
    },
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function OnboardingForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draft, setDraft] = useState<ChurchOnboardingDraft>(() => {
    if (typeof window === "undefined") {
      return createDefaultDraft();
    }

    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return createDefaultDraft();
    }

    try {
      return JSON.parse(stored) as ChurchOnboardingDraft;
    } catch {
      window.localStorage.removeItem(storageKey);
      return createDefaultDraft();
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft]);

  const sanitizedSchedules = useMemo(
    () => draft.schedules.filter((schedule) => schedule.title.trim().length > 0 || schedule.time.trim().length > 0),
    [draft.schedules]
  );

  const submissionData = useMemo(
    () => ({
      basicInfo: draft.basicInfo,
      branding: draft.branding,
      location: draft.location,
      schedules: sanitizedSchedules,
      donations: draft.donations,
    }),
    [draft.basicInfo, draft.branding, draft.location, draft.donations, sanitizedSchedules]
  );

  const validation = useMemo(() => churchOnboardingSchema.safeParse(submissionData), [submissionData]);

  const validationMessages = useMemo(() => {
    if (validation.success) {
      return [];
    }

    return validation.error.issues.map((issue) => formatIssueMessage(issue));
  }, [validation]);

  const visualPreview = (
    <div className="space-y-4">
      <div
        className="overflow-hidden rounded-[1.75rem] border"
        style={{
          background: `linear-gradient(160deg, ${draft.branding.primaryColor} 0%, ${draft.branding.secondaryColor} 100%)`,
        }}
      >
        <div className="space-y-2 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/70">Preview</p>
          <p className="text-2xl font-semibold">{draft.basicInfo.churchName || "Sua igreja"}</p>
          <p className="max-w-xs text-sm text-white/80">
            {draft.basicInfo.description || "Uma experiencia acolhedora para o primeiro acesso da sua comunidade."}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Principal</p>
          <div className="mt-3 h-8 rounded-xl" style={{ backgroundColor: draft.branding.primaryColor }} />
        </div>
        <div className="rounded-2xl border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Secundaria</p>
          <div className="mt-3 h-8 rounded-xl" style={{ backgroundColor: draft.branding.secondaryColor }} />
        </div>
      </div>
    </div>
  );

  function goNext() {
    if (step < stepTitles.length - 1) {
      setStep((current) => current + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setStep((current) => current - 1);
    }
  }

  async function handleFinish() {
    if (!validation.success) {
      toast.error(validationMessages[0] || "Revise os campos obrigatorios antes de concluir.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitChurchOnboardingAction(validation.data);
    setIsSubmitting(false);

    if (!result.success || !result.data) {
      toast.error(result.error || "Nao foi possivel concluir o onboarding.");
      return;
    }

    window.localStorage.removeItem(storageKey);
    toast.success("Igreja criada com sucesso.");
    router.push(`/${result.data.churchLabel}/dashboard`);
  }

  return (
    <div className="space-y-8">
      <OnboardingProgressIndicator steps={stepTitles} currentStep={step} variant="compact" />

      {step === 0 ? (
        <OnboardingShell
          eyebrow="Boas-vindas"
          title={`Vamos montar o espaco digital da sua igreja, ${userName}.`}
          description="Em poucos passos voce define identidade, endereco, cultos e a base inicial de doacoes. Tudo pode ser refinado depois no painel."
          visual={
            <div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8">
              <PartyPopper className="h-20 w-20 text-primary" />
            </div>
          }
          nextLabel="Iniciar configuracao"
          canGoBack={false}
          onNext={goNext}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Church, label: "Dados basicos" },
              { icon: ImageIcon, label: "Visual" },
              { icon: CalendarDays, label: "Cultos" },
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
          title="Informacoes basicas da igreja"
          description="Comece com os dados institucionais principais. Mantenha tudo curto e claro."
          visual={visualPreview}
          nextLabel="Continuar"
          canGoBack
          onBack={goBack}
          onNext={goNext}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Nome da igreja</Label>
              <Input
                value={draft.basicInfo.churchName}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    basicInfo: {
                      ...current.basicInfo,
                      churchName: event.target.value,
                      slug: current.basicInfo.slug || slugify(event.target.value),
                    },
                  }))
                }
                className="h-12 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Descricao</Label>
              <Textarea value={draft.basicInfo.description} onChange={(event) => setDraft((current) => ({ ...current, basicInfo: { ...current.basicInfo, description: event.target.value } }))} className="min-h-24 rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Denominacao</Label>
                <Input value={draft.basicInfo.denomination} onChange={(event) => setDraft((current) => ({ ...current, basicInfo: { ...current.basicInfo, denomination: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label>Pastor principal</Label>
                <Input value={draft.basicInfo.pastorName} onChange={(event) => setDraft((current) => ({ ...current, basicInfo: { ...current.basicInfo, pastorName: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Endereco publico</Label>
              <Input value={draft.basicInfo.slug} onChange={(event) => setDraft((current) => ({ ...current, basicInfo: { ...current.basicInfo, slug: slugify(event.target.value) } }))} className="h-12 rounded-2xl" />
              <p className="text-xs text-muted-foreground">Sua igreja ficara acessivel em `novaigreja.com/{draft.basicInfo.slug || "sua-igreja"}`.</p>
            </div>
          </div>
        </OnboardingShell>
      ) : null}

      {step === 2 ? (
        <OnboardingShell
          eyebrow="Passo 2"
          title="Identidade visual"
          description="Defina a primeira impressao visual. Se quiser, voce pode deixar imagens para depois."
          visual={visualPreview}
          nextLabel="Salvar visual e continuar"
          canGoBack
          onBack={goBack}
          onNext={goNext}
        >
          <div className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <ImageUploadField label="Logo" value={draft.branding.logoUrl} onChange={(logoUrl) => setDraft((current) => ({ ...current, branding: { ...current.branding, logoUrl } }))} />
              <ImageUploadField label="Imagem de capa" value={draft.branding.coverUrl} onChange={(coverUrl) => setDraft((current) => ({ ...current, branding: { ...current.branding, coverUrl } }))} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Cor principal</Label>
                <Input type="color" value={draft.branding.primaryColor} onChange={(event) => setDraft((current) => ({ ...current, branding: { ...current.branding, primaryColor: event.target.value } }))} className="h-12 rounded-2xl p-2" />
              </div>
              <div className="space-y-2">
                <Label>Cor secundaria</Label>
                <Input type="color" value={draft.branding.secondaryColor} onChange={(event) => setDraft((current) => ({ ...current, branding: { ...current.branding, secondaryColor: event.target.value } }))} className="h-12 rounded-2xl p-2" />
              </div>
            </div>
          </div>
        </OnboardingShell>
      ) : null}

      {step === 3 ? (
        <OnboardingShell
          eyebrow="Passo 3"
          title="Localizacao da igreja"
          description="O minimo necessario para a igreja ser encontrada facilmente."
          visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><MapPin className="h-20 w-20 text-primary" /></div>}
          nextLabel="Continuar"
          canGoBack
          onBack={goBack}
          onNext={goNext}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Endereco</Label>
              <Input value={draft.location.address} onChange={(event) => setDraft((current) => ({ ...current, location: { ...current.location, address: event.target.value } }))} className="h-12 rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input value={draft.location.city} onChange={(event) => setDraft((current) => ({ ...current, location: { ...current.location, city: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input value={draft.location.state} onChange={(event) => setDraft((current) => ({ ...current, location: { ...current.location, state: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label>Pais</Label>
                <Input value={draft.location.country} onChange={(event) => setDraft((current) => ({ ...current, location: { ...current.location, country: event.target.value } }))} className="h-12 rounded-2xl" />
              </div>
            </div>
          </div>
        </OnboardingShell>
      ) : null}

      {step === 4 ? (
        <OnboardingShell
          eyebrow="Passo 4"
          title="Cultos principais"
          description="Cadastre rapidamente os horarios principais. Voce pode adicionar mais depois."
          visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><CalendarDays className="h-20 w-20 text-primary" /></div>}
          nextLabel="Continuar"
          canGoBack
          onBack={goBack}
          onNext={goNext}
        >
          <div className="space-y-4">
            {draft.schedules.map((schedule, index) => (
              <div key={schedule.id} className="grid gap-3 rounded-2xl border bg-muted/30 p-4 sm:grid-cols-3">
                <Input value={schedule.title} onChange={(event) => setDraft((current) => ({ ...current, schedules: current.schedules.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item) }))} placeholder="Nome do culto" className="h-11 rounded-xl" />
                <select value={schedule.dayOfWeek} onChange={(event) => setDraft((current) => ({ ...current, schedules: current.schedules.map((item, itemIndex) => itemIndex === index ? { ...item, dayOfWeek: event.target.value as typeof schedule.dayOfWeek } : item) }))} className="h-11 rounded-xl border bg-background px-3">
                  {dayOptions.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}
                </select>
                <div className="flex gap-2">
                  <Input type="time" value={schedule.time} onChange={(event) => setDraft((current) => ({ ...current, schedules: current.schedules.map((item, itemIndex) => itemIndex === index ? { ...item, time: event.target.value } : item) }))} className="h-11 rounded-xl" />
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => setDraft((current) => ({ ...current, schedules: current.schedules.filter((_, itemIndex) => itemIndex !== index) }))}>
                    Remover
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setDraft((current) => ({ ...current, schedules: [...current.schedules, { id: crypto.randomUUID(), title: "", dayOfWeek: "sunday", time: "19:00" }] }))}>
              Adicionar culto
            </Button>
          </div>
        </OnboardingShell>
      ) : null}

      {step === 5 ? (
        <OnboardingShell
          eyebrow="Passo 5"
          title="Configuracao de doacoes"
          description="Configure o basico para receber contribuicoes. Se preferir, pule essa etapa e finalize depois."
          visual={<div className="flex items-center justify-center rounded-[1.75rem] bg-primary/5 p-8"><HandHeart className="h-20 w-20 text-primary" /></div>}
          nextLabel="Revisar configuracao"
          canGoBack
          onBack={goBack}
          onNext={goNext}
          helper={
            <Button type="button" variant="ghost" className="w-full rounded-2xl" onClick={() => { setDraft((current) => ({ ...current, donations: { ...current.donations, skip: true } })); goNext(); }}>
              Pular esta etapa por enquanto
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Chave PIX</Label>
              <Input value={draft.donations.pixKey} onChange={(event) => setDraft((current) => ({ ...current, donations: { ...current.donations, pixKey: event.target.value, skip: false } }))} className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label>Codigo copia e cola</Label>
              <Textarea value={draft.donations.pixCopyPaste} onChange={(event) => setDraft((current) => ({ ...current, donations: { ...current.donations, pixCopyPaste: event.target.value, skip: false } }))} className="min-h-24 rounded-2xl" />
            </div>
          </div>
        </OnboardingShell>
      ) : null}

      {step === 6 ? (
        <OnboardingShell
          eyebrow="Conclusao"
          title="Sua igreja esta pronta para entrar no ar"
          description="Revise rapidamente o resumo e finalize o onboarding para acessar o dashboard."
          visual={visualPreview}
          nextLabel="Acessar dashboard"
          canGoBack
          onBack={goBack}
          onNext={handleFinish}
          isSubmitting={isSubmitting}
          helper={
            !validation.success ? (
              <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-medium">Revise estes campos antes de concluir:</p>
                <ul className="mt-2 space-y-1">
                  {validationMessages.map((message) => (
                    <li key={message}>- {message}</li>
                  ))}
                </ul>
              </div>
            ) : null
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Igreja</p>
              <p className="mt-2 font-semibold">{draft.basicInfo.churchName}</p>
              <p className="text-sm text-muted-foreground">{draft.basicInfo.denomination}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Localizacao</p>
              <p className="mt-2 font-semibold">{draft.location.city}, {draft.location.state}</p>
              <p className="text-sm text-muted-foreground">{draft.location.country}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Cultos cadastrados</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sanitizedSchedules.map((schedule) => (
                  <span key={schedule.id} className="rounded-full bg-background px-3 py-1 text-sm">
                    {schedule.title} • {schedule.time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </OnboardingShell>
      ) : null}
    </div>
  );
}

function formatIssueMessage(issue: ZodIssue) {
  const path = issue.path.join(".");

  if (path === "basicInfo.churchName") {
    return "Preencha o nome da igreja.";
  }

  if (path === "basicInfo.slug") {
    return "Defina o endereco publico da igreja.";
  }

  if (path.startsWith("schedules.")) {
    const index = Number(path.split(".")[1] || 0) + 1;
    return `Culto ${index}: ${issue.message}.`;
  }

  return issue.message;
}
