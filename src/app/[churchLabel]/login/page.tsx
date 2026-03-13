'use server';

import prisma from "@/lib/prisma";
import { getOptionalSession } from "@/lib/get-church-context";
import { AuthForm } from "./auth-form";
import { notFound, redirect } from "next/navigation";

interface LayoutProps {
  params: Promise<{ churchLabel: string }>;
}

export default async function LoginPage({ params }: LayoutProps) {
  const { churchLabel } = await params;
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
  });

  if (!church) {
    notFound();
  }

  const session = await getOptionalSession();
  if (session?.user) {
    const targetLabel =
      session.user.churchId === church.id
        ? churchLabel
        : (
            await prisma.church.findUnique({
              where: { id: session.user.churchId ?? "" },
              select: { label: true },
            })
          )?.label;

    redirect(targetLabel ? `/${targetLabel}/dashboard` : "/onboarding");
  }

  return <AuthForm church={church} />;
}
