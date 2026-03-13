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

  if (session.user.churchId) {
    const church = await prisma.church.findUnique({
      where: { id: session.user.churchId },
      select: { label: true },
    });
    if (church) redirect(`/${church.label}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(23,23,23,0.08),_transparent_35%),linear-gradient(180deg,#fafafa_0%,#f3f4f6_100%)] sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pt-4 sm:px-0 sm:pt-0">
        <LogoutButton />
      </div>
      <div className="mx-auto mt-3 w-full max-w-7xl bg-white/90 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:mt-4 sm:rounded-[2.5rem] sm:p-8">
        <OnboardingForm userName={session.user.name} />
      </div>
    </div>
  );
}
