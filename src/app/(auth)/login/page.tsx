"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SpinnerGapIcon, CaretLeftIcon } from "@phosphor-icons/react";
import { validateAuthFields } from "@/lib/action-feedback";
import { toast } from "sonner";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  const handleSubmit = (formData: FormData) => {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const validationError = validateAuthFields({ email, password });

    if (validationError) {
      setClientError(validationError);
      toast.error(validationError);
      return;
    }

    setClientError(null);
    formAction(formData);
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Acesse o painel da sua igreja.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-5">
        {(clientError || state?.error) && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {clientError || state?.error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="h-12 rounded-xl"
            onChange={() => setClientError(null)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="h-12 rounded-xl"
            onChange={() => setClientError(null)}
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="h-12 w-full rounded-xl bg-nova-yellow font-semibold text-nova-dark hover:bg-nova-yellow/90"
        >
          {isPending ? (
            <SpinnerGapIcon className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Entrar <CaretLeftIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Nao tem conta?{" "}
        <Link href="/register" className="font-medium text-nova-yellow hover:underline">
          Cadastre-se gratis
        </Link>
      </p>
    </div>
  );
}
