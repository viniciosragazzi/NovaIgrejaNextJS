import { getChurchContext } from "@/lib/get-church-context";
import { redirect } from "next/navigation";
import ChurchProfilePage from "./profile-page";
import prisma from "@/lib/prisma";

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

  return (
    <ChurchProfilePage
      isStaff={isStaff}
      initialData={church}
      initialLinks={dbLinks}
    />
  );
}
