import Link from "next/link"
import { ExternalLink, Search } from "lucide-react"
import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SearchParams = Promise<{
  q?: string
  status?: string
}>

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value)
}

function resolveChurchStatus(church: {
  pixKeyValue: string | null
  _count: { users: number; ministries: number; schedules: number; links: number }
  users: Array<{ status: string | null }>
}) {
  if (church._count.users === 0) {
    return "sem-usuarios"
  }

  if (!church.users.some((user) => user.status === "STAFF")) {
    return "sem-staff"
  }

  if (!church.pixKeyValue || church._count.schedules === 0 || church._count.links === 0) {
    return "configuracao-pendente"
  }

  return "ativa"
}

const statusLabels: Record<string, string> = {
  ativa: "Ativa",
  "sem-staff": "Sem staff",
  "sem-usuarios": "Sem usuarios",
  "configuracao-pendente": "Configuracao pendente",
}

export default async function AdminChurchesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filters = await searchParams
  const q = filters.q?.trim() ?? ""
  const statusFilter = filters.status?.trim() ?? "all"

  const churches = await prisma.church.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { label: { contains: q, mode: "insensitive" } },
            { address: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    select: {
      id: true,
      name: true,
      label: true,
      address: true,
      pixKeyValue: true,
      createdAt: true,
      _count: {
        select: {
          users: true,
          persons: true,
          ministries: true,
          schedules: true,
          links: true,
        },
      },
      users: {
        select: {
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const rows = churches
    .map((church) => {
      const operationalStatus = resolveChurchStatus(church)

      return {
        ...church,
        operationalStatus,
      }
    })
    .filter((church) => statusFilter === "all" || church.operationalStatus === statusFilter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Igrejas"
        description="Gestao global das igrejas cadastradas, com agrupamento operacional e leitura do estado atual de cada tenant."
        badge={`${rows.length} registro(s)`}
      />

      <Card className="rounded-[2rem] border">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Pesquise por nome, label ou endereco e refine pelo status operacional derivado dos dados atuais.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="q" defaultValue={q} placeholder="Buscar igreja por nome, label ou endereco" className="h-12 rounded-2xl pl-10" />
            </div>
            <select
              name="status"
              defaultValue={statusFilter}
              className="h-12 rounded-2xl border border-input bg-transparent px-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            >
              <option value="all">Todos os status</option>
              <option value="ativa">Ativa</option>
              <option value="sem-staff">Sem staff</option>
              <option value="sem-usuarios">Sem usuarios</option>
              <option value="configuracao-pendente">Configuracao pendente</option>
            </select>
            <Button type="submit" className="h-12 rounded-2xl px-5">
              Aplicar filtros
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border">
        <CardHeader>
          <CardTitle>Mapa de tenants</CardTitle>
          <CardDescription>Cada linha mostra a saude basica da igreja no sistema e os dados principais para gestao da plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Igreja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usuarios</TableHead>
                <TableHead>Pessoas</TableHead>
                <TableHead>Estrutura</TableHead>
                <TableHead>Publica</TableHead>
                <TableHead>Criada em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((church) => (
                <TableRow key={church.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{church.name}</p>
                        <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                          /{church.label}
                        </Badge>
                      </div>
                      <p className="max-w-md text-sm text-muted-foreground">{church.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                      {statusLabels[church.operationalStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>{church._count.users}</TableCell>
                  <TableCell>{church._count.persons}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {church._count.ministries} ministerio(s) • {church._count.schedules} evento(s)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={church.pixKeyValue ? "secondary" : "outline"} className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                        {church.pixKeyValue ? "PIX ok" : "Sem PIX"}
                      </Badge>
                      <Badge variant={church._count.links > 0 ? "secondary" : "outline"} className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                        {church._count.links > 0 ? "Com links" : "Sem links"}
                      </Badge>
                      <Link
                        href={`/${church.label}`}
                        target="_blank"
                        className="inline-flex h-7 items-center gap-1 rounded-2xl px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        Abrir
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(church.createdAt)}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    Nenhuma igreja encontrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
