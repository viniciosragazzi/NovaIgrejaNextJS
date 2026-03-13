import { buildJourneyBoard, ensureJourneySetup } from "@/lib/member-journey"
import { getChurchContext } from "@/lib/get-church-context"
import prisma from "@/lib/prisma"
import JourneyManagementPage from "./journey-management-page"

export default async function JourneyManagementRoute({
  params,
}: {
  params: Promise<{ churchLabel: string }>
}) {
  const { churchLabel } = await params
  const { church } = await getChurchContext(churchLabel, { requiredModule: "membros" })

  const [board, stages] = await prisma.$transaction(async (tx) => {
    await ensureJourneySetup(tx, church.id)
    return Promise.all([
      buildJourneyBoard(tx, church.id),
      tx.journeyStage.findMany({
        where: { churchId: church.id, active: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          key: true,
          name: true,
          description: true,
          order: true,
        },
      }),
    ])
  })

  return (
    <JourneyManagementPage
      churchId={church.id}
      board={board}
      stages={stages}
    />
  )
}
