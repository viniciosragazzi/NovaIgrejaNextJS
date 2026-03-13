'use server'

import { CommandPalette, type CommandPaletteItem } from "@/components/dashboard/command-palette"
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar"
import { getChurchContext } from "@/lib/get-church-context"
import { getNotificationFeed } from "@/lib/notifications"
import prisma from "@/lib/prisma"
import { dashboardNavItems } from "@/lib/dashboard-navigation"
import { DashboardSidebar } from "./components/sidebar"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ churchLabel: string }>
}

export default async function DashboardLayout({ children, params }: LayoutProps) {
  const { churchLabel } = await params
  const { church, user, isStaff, moduleAccess } = await getChurchContext(churchLabel)
  const initialNotificationFeed = await getNotificationFeed(church.id, user.id)

  const [people, ministries, schedules] = isStaff
    ? await Promise.all([
        prisma.person.findMany({
          where: { churchId: church.id },
          select: { id: true, name: true, type: true },
          orderBy: { name: "asc" },
          take: 10,
        }),
        prisma.ministry.findMany({
          where: { churchId: church.id },
          select: { id: true, name: true },
          orderBy: { name: "asc" },
          take: 10,
        }),
        prisma.weeklySchedule.findMany({
          where: { churchId: church.id, active: true },
          select: { id: true, title: true, time: true },
          orderBy: { title: "asc" },
          take: 10,
        }),
      ])
    : [[], [], []]

  const commandItems: CommandPaletteItem[] = [
    ...dashboardNavItems
      .filter(
        (item) =>
          (!item.requiredModule || moduleAccess[item.requiredModule])
      )
      .map((item) => ({
        id: `page-${item.href}`,
        label: item.label,
        description: "Pagina do painel",
        href: item.href,
        group: "Paginas",
      })),
    ...people.map((person) => ({
      id: `person-${person.id}`,
      label: person.name,
      description: `Pessoa - ${person.type.toLowerCase()}`,
      href: "/dashboard/members",
      group: "Pessoas",
    })),
    ...ministries.map((ministry) => ({
      id: `ministry-${ministry.id}`,
      label: ministry.name,
      description: "Ministerio",
      href: "/dashboard/ministerios",
      group: "Ministerios",
    })),
    ...schedules.map((schedule) => ({
      id: `schedule-${schedule.id}`,
      label: schedule.title,
      description: `Evento - ${schedule.time}`,
      href: "/dashboard/schedule",
      group: "Agenda",
    })),
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        churchName={church.name}
        churchLabel={churchLabel}
        userName={user.name}
        isStaff={isStaff}
        moduleAccess={moduleAccess}
      />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          <DashboardTopbar
            churchId={church.id}
            churchLabel={churchLabel}
            churchName={church.name}
            initialNotificationFeed={initialNotificationFeed}
            isStaff={isStaff}
          />
          {children}
        </div>
      </main>
      <CommandPalette churchLabel={churchLabel} items={commandItems} />
    </div>
  )
}
