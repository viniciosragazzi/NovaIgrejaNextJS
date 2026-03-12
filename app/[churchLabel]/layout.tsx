import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ churchLabel: string }>;
}

export default async function ChurchLayout({ children, params }: LayoutProps) {
  const { churchLabel } = await params;
  // Você pode buscar o nome da igreja aqui para passar via Contexto
  // ou apenas para exibir no Layout principal.
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
    select: { name: true }
  });

  // 3. Se a igreja não for encontrada, redireciona para a home principal
  if (!church) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">

      <main className="flex-1">{children}</main>


    </div>
  );
}
