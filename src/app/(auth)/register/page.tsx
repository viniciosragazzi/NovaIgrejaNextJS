
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SpinnerIcon } from "@phosphor-icons/react";
import { registerAction } from "@/actions/auth.actions";

export default function GlobalRegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Comece agora</h1>
          <p className="text-zinc-500 mt-2">
            Crie sua conta administrativa no Nova Igreja.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input id="name" name="name" required placeholder="Ex: Marcos Vinícius" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail de acesso</Label>
            <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Crie uma senha</Label>
            <Input id="password" name="password" type="password" required placeholder="Mínimo 8 caracteres" />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-12 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800"
          >
            {isPending ? <SpinnerIcon className="animate-spin" /> : "Criar minha conta"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-zinc-900 font-bold hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
