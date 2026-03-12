import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { OnboardingForm } from "./onboarding-form";
import { LogoutButton } from "@/components/logout";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Se o cara já tem igreja, não tem o que fazer aqui.
  if (session.user.churchId) {
    const church = await prisma.church.findUnique({
      where: { id: session.user.churchId },
      select: { label: true }
    });
    if (church) redirect(`/${church.label}/dashboard`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <LogoutButton />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border p-8">
        <div className="mb-8 text-center">
          <span className="text-nova-yellow font-bold text-sm tracking-widest uppercase">Passo Único</span>
          <h1 className="text-3xl font-bold mt-2 text-zinc-900">Configure sua Igreja</h1>
          <p className="text-zinc-500 mt-2">
            Olá {session.user.name}, vamos criar o espaço digital da sua comunidade.
          </p>
        </div>

        <OnboardingForm />
      </div>
    </div>
  );
}
