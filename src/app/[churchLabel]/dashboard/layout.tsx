'use server'
import { getChurchContext } from "@/lib/get-church-context";
import { DashboardSidebar } from "./components/sidebar"
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ churchLabel: string }>;
}
export default async function DashboardLayout({ children, params }: LayoutProps) {
  const { churchLabel } = await params;
  // O getChurchContext já valida se o usuário está logado
  // e se ele pertence a esta igreja específica.
  const { church, user, isStaff } = await getChurchContext(churchLabel);
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar churchName={church.name} churchLabel={churchLabel} userName={user.name} isStaff={isStaff} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
