"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createChurchAction } from "@/actions/onboarding.actions";
import { GlobeIcon, SpinnerIcon } from "@phosphor-icons/react";

export function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(createChurchAction, null);
  const [labelValue, setLabelValue] = useState("");

  // Transforma o nome em um label amigável (Slug)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Garantia: se não houver valor, limpa o label e para a execução
    const value = e.target.value;
    if (!value) {
      setLabelValue("");
      return;
    }
    const slug = value
      .toLowerCase()
      .trim() // Remove espaços inúteis no início/fim
      .normalize("NFD") // Decompõe caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .replace(/[^\w\s-]/g, "") // Remove símbolos especiais
      .replace(/[\s_-]+/g, "-") // Substitui espaços e underscores por hífens
      .replace(/^-+|-+$/g, ""); // Remove hífens sobrando nas pontas

    setLabelValue(slug);
  };

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nome da Igreja</Label>
        <Input
          id="name"
          name="name"
          placeholder="Ex: Igreja Batista Central"
          required
          onChange={handleNameChange}
          className="h-12 text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Endereço (URL) exclusivo</Label>
        <div className="relative flex items-center">
          <div className="absolute left-3 text-zinc-400 flex items-center gap-1 text-sm border-r pr-2">
            <GlobeIcon className="w-4 h-4" />
            <span>novaigreja.com/</span>
          </div>
          <Input
            id="label"
            name="label"
            value={labelValue}
            onChange={(e) => setLabelValue(e.target.value)}
            className="pl-[175px] h-12 font-medium text-nova-yellow"
            required
          />
        </div>
        <p className="text-xs text-zinc-400">Este será o link que seus membros usarão para acessar.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço Físico</Label>
        <Input id="address" name="address" placeholder="Rua, Número, Bairro, Cidade" required className="h-12" />
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full h-14 bg-zinc-900 text-white hover:bg-zinc-800 text-lg font-bold rounded-xl transition-all"
      >
        {isPending ? <SpinnerIcon className="animate-spin" /> : "Finalizar Configuração"}
      </Button>
    </form>
  );
}
