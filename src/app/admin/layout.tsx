import { ShieldCheck } from "lucide-react"
import { AdminSidebar } from "./components/sidebar"
import { getAdminContext } from "@/lib/get-admin-context"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getAdminContext()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar userName={user.name} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
          <div className="rounded-[2rem] border bg-card/80 px-5 py-4 backdrop-blur">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Role ADMIN
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Painel do dono do sistema</h1>
                <p className="text-sm leading-6 text-muted-foreground">
                  Governanca global para igrejas, usuarios e parametros da plataforma NovaIgreja.
                </p>
              </div>
              <div className="rounded-[1.5rem] border bg-background px-4 py-3 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Sessao atual</p>
                <p className="mt-1 font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  )
}
