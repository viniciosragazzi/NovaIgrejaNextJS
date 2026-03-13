"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, ChevronLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginChurchAction, registerMemberAction } from "@/actions/landing.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { validateAuthFields } from "@/lib/action-feedback";
import { toast } from "sonner";

type AuthMode = "login" | "register";
type AuthChurch = { name: string; label: string };

export function AuthForm({ church }: { church: AuthChurch }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);

    try {
      if (mode === "register") {
        const validationError = validateAuthFields({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (validationError) {
          showError(validationError);
          setIsLoading(false);
          return;
        }

        const result = await registerMemberAction(church.label, null, data);
        if (result?.error) {
          showError(result.error);
        }
      } else {
        const validationError = validateAuthFields({
          email: formData.email,
          password: formData.password,
        });

        if (validationError) {
          showError(validationError);
          setIsLoading(false);
          return;
        }

        const result = await loginChurchAction(church.label, null, data);
        if (result?.error) {
          showError(result.error);
        }
      }
    } catch {
      showError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setError(null);
    setMode(mode === "login" ? "register" : "login");
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const direction = mode === "login" ? -1 : 1;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 0 + 1, y: 0 }} className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={() => router.push(`/${church.label}`)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 px-6 pb-6 pt-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
          <svg viewBox="0 0 40 40" className="h-8 w-8 text-primary-foreground" fill="currentColor">
            <path d="M20 4L8 16v20h24V16L20 4zm0 4l8 8v14H12V16l8-8z" />
            <path d="M18 22h4v10h-4z" />
            <circle cx="14" cy="18" r="2" />
            <circle cx="26" cy="18" r="2" />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">{church.name}</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Igreja</span>
        </div>
      </motion.div>

      <div className="mx-6 mb-6 flex rounded-full bg-muted p-1">
        <button
          onClick={() => setMode("login")}
          className={cn("relative flex-1 rounded-full py-3 text-sm font-medium transition-colors", mode === "login" ? "text-primary-foreground" : "text-muted-foreground")}
        >
          {mode === "login" && <motion.div layoutId="activeTab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
          <span className="relative z-10">Entrar</span>
        </button>
        <button
          onClick={() => setMode("register")}
          className={cn("relative flex-1 rounded-full py-3 text-sm font-medium transition-colors", mode === "register" ? "text-primary-foreground" : "text-muted-foreground")}
        >
          {mode === "register" && <motion.div layoutId="activeTab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
          <span className="relative z-10">Cadastrar</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.form key={mode} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {mode === "register" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="mb-2 block text-sm font-medium text-foreground">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input name="name" type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-14 rounded-2xl border-0 bg-card pl-12 text-base ring-1 ring-border transition-all focus:ring-2 focus:ring-primary" required={mode === "register"} />
                </div>
              </motion.div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-14 rounded-2xl border-0 bg-card pl-12 text-base ring-1 ring-border transition-all focus:ring-2 focus:ring-primary" required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input name="password" type={showPassword ? "text" : "password"} placeholder="Sua senha" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="h-14 rounded-2xl border-0 bg-card pl-12 pr-12 text-base ring-1 ring-border transition-all focus:ring-2 focus:ring-primary" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {mode === "register" ? <p className="mt-2 text-xs text-muted-foreground">Use pelo menos 8 caracteres.</p> : null}
            </div>

            {mode === "register" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="mb-2 block text-sm font-medium text-foreground">Confirmar senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Confirme sua senha" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="h-14 rounded-2xl border-0 bg-card pl-12 text-base ring-1 ring-border transition-all focus:ring-2 focus:ring-primary" required={mode === "register"} minLength={8} />
                </div>
              </motion.div>
            )}

            <div className="mt-4">
              <Button type="submit" disabled={isLoading} className="relative h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-70">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    <span>Processando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{mode === "login" ? "Entrar" : "Criar conta"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-8 text-center">
        <button type="button" onClick={toggleMode} className="text-sm text-muted-foreground">
          {mode === "login"
            ? <>Novo por aqui? <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">Crie sua conta</span></>
            : <>Ja tem uma conta? <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">Faca login</span></>}
        </button>
      </motion.div>
    </div>
  );
}
