"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SpinnerGapIcon, CaretLeftIcon } from "@phosphor-icons/react";


export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-2xl bg-card shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-muted-foreground text-sm">
          Acesse o painel da sua igreja.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Alerta de Erro */}
        {state?.error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl">
            {state.error}
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
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link href="/forgot-password" className="text-xs hover:underline text-muted-foreground">
              Esqueceu a senha?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="w-full h-12 rounded-xl bg-nova-yellow text-nova-dark hover:bg-nova-yellow/90 font-semibold"
        >
          {isPending ? (
            <SpinnerGapIcon className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Entrar <CaretLeftIcon className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Não tem conta?{" "}
        <Link href="/register" className="text-nova-yellow font-medium hover:underline">
          Cadastre-se grátis
        </Link>
      </p>
    </div>
  );
}
