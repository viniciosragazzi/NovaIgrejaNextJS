# Regras do Projeto

## Next.js App Router

### Limite entre Server e Client
- Nunca chamar funcoes exportadas de arquivos `use client` dentro de Server Components.
- Em paginas, layouts e componentes server, nao invocar helpers que dependem de modulo client, mesmo que parecam apenas utilitarios de classe.
- Se uma estilização vier de um arquivo client, use uma destas alternativas em Server Components:
  - classes Tailwind escritas diretamente no `className`
  - mover a montagem visual para um Client Component
  - passar dados para um Client Component em vez de chamar a funcao no server

### Aprendizado registrado
- Erro ocorrido: tentativa de chamar `buttonVariants()` em paginas server de `/admin`.
- Causa: `buttonVariants` estava sendo importado de `src/components/ui/button.tsx`, que e um modulo client (`"use client"`).
- Regra pratica: `buttonVariants()` nao pode ser chamado em `page.tsx`, `layout.tsx` ou qualquer Server Component.
- Solucao adotada: substituir o uso por classes estaticas nos links server do modulo admin.

### Anti-exemplo
```tsx
import { buttonVariants } from "@/components/ui/button"

export default async function Page() {
  return (
    <a className={buttonVariants({ variant: "outline" })}>
      Link
    </a>
  )
}
```

### Forma segura
```tsx
export default async function Page() {
  return (
    <a className="inline-flex h-8 items-center rounded-2xl border border-border px-4 text-xs font-medium hover:bg-muted">
      Link
    </a>
  )
}
```

## Rotas globais reservadas
- Toda rota global nova deve ser adicionada ao `reservedPaths` de `proxy.ts`.
- Exemplo: `/admin` precisou ser registrada para nao ser tratada como `churchLabel`.

## Modulo Admin
- Toda rota em `/admin` deve validar `role === "ADMIN"` antes de renderizar.
- O painel admin e global e nao deve depender de `churchLabel`.
