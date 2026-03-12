'use server';
import { getChurchContext } from "@/lib/get-church-context";
import { AuthForm } from "./auth-form";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface LayoutProps {

  params: Promise<{ churchLabel: string }>;
}
export default async function LoginPage({ params }: LayoutProps) {
  const { churchLabel } = await params;
  const church = await prisma.church.findUnique({
    where: { label: churchLabel },
  });


  return <AuthForm church={church} />
}

