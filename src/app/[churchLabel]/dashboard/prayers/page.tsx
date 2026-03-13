import { redirect } from "next/navigation"
import { getChurchContext } from "@/lib/get-church-context"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import PrayersPage from "./prayers-page"

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params
  const { isStaff, church } = await getChurchContext(churchLabel)

  if (!isStaff) {
    redirect(`/${churchLabel}/dashboard`)
  }

  const customization = normalizeChurchCustomization(church.customization)

  return (
    <PrayersPage
      churchId={church.id}
      initialItems={customization.interacaoPublica.prayerRequests}
    />
  )
}
