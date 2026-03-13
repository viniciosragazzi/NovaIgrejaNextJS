import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export type SessionUserLike = {
  churchId?: string | null
  status?: string | null
  role?: string | null
}

export function isStaffUser(user: SessionUserLike | null | undefined) {
  return user?.status === "STAFF" || user?.role === "ADMIN"
}

export async function getAuthSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function requireChurchStaffSession(churchId: string) {
  const session = await getAuthSession()

  if (!session || session.user.churchId !== churchId || !isStaffUser(session.user)) {
    return null
  }

  return session
}
