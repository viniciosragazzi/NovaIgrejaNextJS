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
import { Search } from "lucide-react"

type SearchParams = Promise<{
  q?: string
  church?: string
  role?: string
  status?: string
}>

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value)
}

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  USER: "User",
  GUEST: "Guest",
}

const statusLabels: Record<string, string> = {
  STAFF: "Staff",
  MEMBER: "Member",
  VISITOR: "Visitor",
  VOLUNTEER: "Volunteer",
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filters = await searchParams
  const q = filters.q?.trim() ?? ""
  const churchFilter = filters.church?.trim() ?? "all"
  const roleFilter = filters.role?.trim() ?? "all"
  const statusFilter = filters.status?.trim() ?? "all"

  const [churches, users] = await Promise.all([
    prisma.church.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    }),
    prisma.user.findMany({
      where: {
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(roleFilter !== "all" ? { role: roleFilter as "ADMIN" | "USER" | "GUEST" } : {}),
        ...(statusFilter !== "all" ? { status: statusFilter as "STAFF" | "MEMBER" | "VISITOR" | "VOLUNTEER" } : {}),
        ...(churchFilter === "all"
          ? {}
          : churchFilter === "sem-igreja"
            ? { churchId: null }
            : { churchId: churchFilter }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        status: true,
        churchId: true,
        createdAt: true,
        youChurch: {
          select: {
            name: true,
            label: true,
          },
        },
      },
      orderBy: [{ churchId: "asc" }, { createdAt: "desc" }],
    }),
  ])

  const groupedByChurch = users.reduce<Record<string, typeof users>>((acc, user) => {
    const groupKey = user.youChurch?.name ?? "Sem igreja"
    acc[groupKey] ??= []
    acc[groupKey].push(user)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        description="Gestao global das contas autenticadas, com separacao por igreja, papel na plataforma e status operacional."
        badge={`${users.length} conta(s)`}
      />

      <Card className="rounded-[2rem] border">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Pesquise por nome ou email e refine por igreja, role ou status atual do usuario.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px_170px_170px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="q" defaultValue={q} placeholder="Buscar usuario por nome ou email" className="h-12 rounded-2xl pl-10" />
            </div>

            <select
              name="church"
              defaultValue={churchFilter}
              className="h-12 rounded-2xl border border-input bg-transparent px-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            >
              <option value="all">Todas as igrejas</option>
              <option value="sem-igreja">Sem igreja</option>
              {churches.map((church) => (
                <option key={church.id} value={church.id}>
                  {church.name}
                </option>
              ))}
            </select>

            <select
              name="role"
              defaultValue={roleFilter}
              className="h-12 rounded-2xl border border-input bg-transparent px-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            >
              <option value="all">Todas roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
              <option value="GUEST">GUEST</option>
            </select>

            <select
              name="status"
              defaultValue={statusFilter}
              className="h-12 rounded-2xl border border-input bg-transparent px-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            >
              <option value="all">Todos status</option>
              <option value="STAFF">STAFF</option>
              <option value="MEMBER">MEMBER</option>
              <option value="VISITOR">VISITOR</option>
              <option value="VOLUNTEER">VOLUNTEER</option>
            </select>

            <Button type="submit" className="h-12 rounded-2xl px-5">
              Aplicar filtros
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {Object.entries(groupedByChurch).map(([groupName, groupUsers]) => (
          <Card key={groupName} className="rounded-[2rem] border">
            <CardHeader>
              <CardTitle>{groupName}</CardTitle>
              <CardDescription>{groupUsers.length} conta(s) neste agrupamento.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Igreja</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Criado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{user.name}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            {!user.emailVerified ? (
                              <Badge className="rounded-full bg-amber-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-600">
                                Email pendente
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                                Email verificado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "ADMIN" ? "default" : "outline"} className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                          {roleLabels[user.role] ?? user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.status ? (
                          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                            {statusLabels[user.status] ?? user.status}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">Sem status</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.youChurch ? (
                          <div className="space-y-1">
                            <p className="font-medium">{user.youChurch.name}</p>
                            <p className="text-sm text-muted-foreground">/{user.youChurch.label}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Nao vinculado</span>
                        )}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 ? (
          <Card className="rounded-[2rem] border">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Nenhum usuario encontrado com os filtros atuais.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
