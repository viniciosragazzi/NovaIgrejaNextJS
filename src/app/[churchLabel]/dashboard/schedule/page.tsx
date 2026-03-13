import { ScheduleEvent } from "@/@types/shared.types"
import { getChurchContext } from "@/lib/get-church-context"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ScheduleClientPage from "./schedule-client-page"

const dayMap = {
  DOMINGO: "sunday",
  SEGUNDA: "monday",
  TERCA: "tuesday",
  QUARTA: "wednesday",
  QUINTA: "thursday",
  SEXTA: "friday",
  SABADO: "saturday",
} as const

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ churchLabel: string }>
}) {
  const { churchLabel } = await params
  const { isStaff, church } = await getChurchContext(churchLabel)

  if (!isStaff) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const schedules = await prisma.weeklySchedule.findMany({
    where: { churchId: church.id, active: true },
    orderBy: [{ dayOfWeek: "asc" }, { time: "asc" }],
  })

  const initialEvents: ScheduleEvent[] = schedules.map((schedule) => ({
    id: schedule.id,
    name: schedule.title,
    dayOfWeek: dayMap[schedule.dayOfWeek],
    time: schedule.time,
    description: schedule.description || undefined,
  }))

  return <ScheduleClientPage churchId={church.id} initialEvents={initialEvents} />
}
