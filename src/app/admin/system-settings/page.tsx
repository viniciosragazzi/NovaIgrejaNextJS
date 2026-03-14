import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const platformRoles = [
  {
    key: "ADMIN",
    description: "Acesso total ao painel global e governanca da plataforma.",
  },
  {
    key: "USER",
    description: "Conta padrao autenticada para operar uma igreja.",
  },
  {
    key: "GUEST",
    description: "Conta com escopo minimo, reservada para fluxos futuros.",
  },
]

const churchStatuses = [
  {
    key: "STAFF",
    description: "Operador administrativo da igreja com acesso expandido conforme modulo.",
  },
  {
    key: "MEMBER",
    description: "Membro com acesso normal ao dashboard e jornada.",
  },
  {
    key: "VISITOR",
    description: "Visitante ou lead em acompanhamento.",
  },
  {
    key: "VOLUNTEER",
    description: "Voluntario ativo para ministerios e escalas.",
  },
]

const platformModules = [
  "Perfil da Igreja",
  "Membros",
  "Ministerios",
  "Agenda",
  "Financeiro",
  "Pagina Publica",
  "Configuracoes",
]

const nextSteps = [
  "Persistir parametros globais em tabela propria de configuracoes do sistema.",
  "Adicionar feature flags e limites por tenant.",
  "Adicionar auditoria completa de alteracoes feitas por ADMIN.",
  "Criar acoes operacionais seguras para suspensao, arquivamento e suporte.",
]

export default function AdminSystemSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Parametros globais"
        description="Primeira versao do centro de governanca da plataforma, consolidando regras atuais e o backlog operacional do painel ADMIN."
        badge="Base administrativa"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-[2rem] border">
          <CardHeader>
            <CardTitle>Roles da plataforma</CardTitle>
            <CardDescription>Papeis globais atualmente reconhecidos no schema do sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformRoles.map((role) => (
              <div key={role.key} className="rounded-[1.5rem] border bg-background px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">{role.key}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border">
          <CardHeader>
            <CardTitle>Status por igreja</CardTitle>
            <CardDescription>Status operacionais aplicados aos usuarios dentro de cada tenant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {churchStatuses.map((status) => (
              <div key={status.key} className="rounded-[1.5rem] border bg-background px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                    {status.key}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{status.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border">
          <CardHeader>
            <CardTitle>Modulos administrados</CardTitle>
            <CardDescription>Escopo atual dos modulos controlados por permissao na plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {platformModules.map((module) => (
              <div key={module} className="rounded-[1.5rem] border bg-background px-4 py-4">
                <p className="font-medium">{module}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ja suportado pela matriz de acesso atual do sistema.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border">
          <CardHeader>
            <CardTitle>Fila de evolucao</CardTitle>
            <CardDescription>Itens ja mapeados para a proxima etapa do modulo admin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextSteps.map((item) => (
              <div key={item} className="rounded-[1.5rem] border bg-background px-4 py-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
