import { getChurchContext } from "@/lib/get-church-context";
import { redirect } from "next/navigation";
import ChurchProfilePage from "./profile-page";
import prisma from "@/lib/prisma";
import { normalizeChurchCustomization } from "@/lib/church-customization";

import { Church, ChurchLink } from "@/@types/church.types";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, church } = await getChurchContext(churchLabel);

  if (!isStaff) {
    return redirect(`/${churchLabel}/dashboard`);
  }

  // Busca os links reais da igreja
  const dbLinks = await prisma.churchLink.findMany({
    where: { churchId: church.id },
    orderBy: { order: 'asc' }
  });

  const ministries = await prisma.ministry.findMany({
    where: { churchId: church.id },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  const schedules = await prisma.weeklySchedule.findMany({
    where: { churchId: church.id, active: true },
    orderBy: [{ dayOfWeek: "asc" }, { time: "asc" }],
    select: {
      id: true,
      title: true,
      dayOfWeek: true,
      time: true,
      description: true,
    },
  });

  return (
    <ChurchProfilePage
      isStaff={isStaff}
      initialData={{
        ...(church as unknown as Church),
        customization: normalizeChurchCustomization(church.customization, ministries),
      }}
      initialLinks={dbLinks as unknown as ChurchLink[]}
      initialMinistries={ministries}
      initialSchedules={schedules}
    />
  );
}
