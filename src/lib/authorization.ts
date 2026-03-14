import type { PermissionModuleKey, PermissionStatusKey } from "@/@types/church.types"
import { auth } from "@/lib/auth"
import { normalizeChurchCustomization } from "@/lib/church-customization"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

export type SessionUserLike = {
  churchId?: string | null
  status?: PermissionStatusKey | string | null
  role?: string | null
}

export type ModuleAccessMap = Record<PermissionModuleKey, boolean>

const permissionModules: PermissionModuleKey[] = [
  "perfil",
  "membros",
  "ministerios",
  "agenda",
  "financeiro",
  "paginaPublica",
  "configuracoes",
]

export function isStaffUser(user: SessionUserLike | null | undefined) {
  return user?.status === "STAFF"
}

export function isPlatformAdmin(user: SessionUserLike | null | undefined) {
  return user?.role === "ADMIN"
}

export function createEmptyModuleAccess(): ModuleAccessMap {
  return permissionModules.reduce(
    (acc, module) => {
      acc[module] = false
      return acc
    },
    {} as ModuleAccessMap
  )
}

export function createFullModuleAccess(): ModuleAccessMap {
  return permissionModules.reduce(
    (acc, module) => {
      acc[module] = true
      return acc
    },
    {} as ModuleAccessMap
  )
}

export function getChurchModuleAccess(
  user: SessionUserLike | null | undefined,
  churchCustomization: unknown
) {
  if (isPlatformAdmin(user)) {
    return createFullModuleAccess()
  }

  const status = user?.status as PermissionStatusKey | undefined

  if (!status) {
    return createEmptyModuleAccess()
  }

  const permissions = normalizeChurchCustomization(churchCustomization).permissoes.permissoesPorModulo

  return permissions[status] ?? createEmptyModuleAccess()
}

export function canAccessChurchModule(
  user: SessionUserLike | null | undefined,
  churchCustomization: unknown,
  module: PermissionModuleKey
) {
  return getChurchModuleAccess(user, churchCustomization)[module]
}

export async function getAuthSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function requirePlatformAdminSession() {
  const session = await getAuthSession()

  if (!session || !isPlatformAdmin(session.user)) {
    return null
  }

  return session
}

export async function requireChurchStaffSession(churchId: string) {
  const session = await getAuthSession()

  if (
    !session ||
    (!isPlatformAdmin(session.user) &&
      (session.user.churchId !== churchId || !isStaffUser(session.user)))
  ) {
    return null
  }

  return session
}

export async function requireChurchModuleSession(
  churchId: string,
  module: PermissionModuleKey
) {
  const session = await getAuthSession()

  if (!session) {
    return null
  }

  if (isPlatformAdmin(session.user)) {
    return session
  }

  if (session.user.churchId !== churchId) {
    return null
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { customization: true },
  })

  if (!church || !canAccessChurchModule(session.user, church.customization, module)) {
    return null
  }

  return session
}
