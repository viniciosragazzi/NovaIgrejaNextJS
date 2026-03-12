import { ChurchHeader } from "./components/church-header"
import { WeeklySchedule } from "./components/weekly-schedule"
import { QuickLinks } from "./components/quick-links"
import { FloatingMenu } from "./components/floating-menu"
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma"

interface PageProps {
  params: Promise<{ churchLabel: string }>;
}

export default async function ChurchWelcomePage({ params }: PageProps) {
  const { churchLabel } = await params;

  // Buscamos a igreja e INCLUÍMOS os links relacionados
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    include: {
      links: {
        where: { active: true },
        orderBy: { order: 'asc' }
      }
    }
  });
  console.log(church);
  if (!church) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-md px-4 py-6">
        {/* Passamos o objeto church completo ou apenas o nome/id */}
        <ChurchHeader church={{ name: church.name, id: church.id }} />

        <section className="mt-6">
          <WeeklySchedule />
        </section>

        {/* QuickLinks agora recebe a lista dinâmica do banco */}
        <section className="mt-6">
          <QuickLinks links={church.links} />
        </section>
      </div>

      {/* FloatingMenu também pode usar os links para ícones sociais */}
      <FloatingMenu churchLabel={churchLabel} socialLinks={church.links} />
    </main>
  )
}
