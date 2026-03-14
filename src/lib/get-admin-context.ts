import prisma from "@/lib/prisma"
import {
  getAuthSession,
  isPlatformAdmin,
} from "@/lib/authorization"
import { redirect } from "next/navigation"

async function redirectNonAdminUser() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/login")
  }

  if (!isPlatformAdmin(session.user)) {
    if (session.user.churchId) {
      const church = await prisma.church.findUnique({
        where: { id: session.user.churchId },
        select: { label: true },
      })

      redirect(church?.label ? `/${church.label}/dashboard` : "/onboarding")
    }

    redirect("/onboarding")
  }

  return session
}

export async function getAdminContext() {
  const session = await redirectNonAdminUser()

  return {
    user: session.user,
  }
}
