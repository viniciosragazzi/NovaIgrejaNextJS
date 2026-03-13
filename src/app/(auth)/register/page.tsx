"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SpinnerIcon } from "@phosphor-icons/react";
import { registerAction } from "@/actions/auth.actions";
import { validateAuthFields } from "@/lib/action-feedback";
import { toast } from "sonner";

export default function GlobalRegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  const handleSubmit = (formData: FormData) => {
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const validationError = validateAuthFields({ name, email, password });

    if (validationError) {
      setClientError(validationError);
      toast.error(validationError);
      return;
    }

    setClientError(null);
    formAction(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Comece agora</h1>
          <p className="mt-2 text-zinc-500">
            Crie sua conta administrativa no Nova Igreja.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {(clientError || state?.error) && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {clientError || state?.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Ex: Marcos Vinicius"
              onChange={() => setClientError(null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail de acesso</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              onChange={() => setClientError(null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Crie uma senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Minimo 8 caracteres"
              onChange={() => setClientError(null)}
            />
            <p className="text-xs text-zinc-500">Use pelo menos 8 caracteres.</p>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="h-12 w-full rounded-xl bg-zinc-900 font-bold text-white hover:bg-zinc-800"
          >
            {isPending ? <SpinnerIcon className="animate-spin" /> : "Criar minha conta"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Ja tem uma conta?{" "}
          <Link href="/login" className="font-bold text-zinc-900 hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
