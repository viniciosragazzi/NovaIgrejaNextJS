"use server"

import { ActionResponse } from "@/@types/shared.types"
import { NotificationFeed } from "@/@types/notification.types"
import { getAuthSession } from "@/lib/authorization"
import {
  getNotificationFeed,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/notifications"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function getChurchLabel(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    select: { label: true },
  })

  return church?.label
}

async function revalidateNotificationRoutes(churchId: string) {
  const churchLabel = await getChurchLabel(churchId)

  if (!churchLabel) {
    return
  }

  revalidatePath(`/${churchLabel}/dashboard`)
  revalidatePath(`/${churchLabel}/dashboard/ministerios`)
}

export async function getMyNotificationsAction(
  churchId: string
): Promise<ActionResponse<NotificationFeed>> {
  const session = await getAuthSession()

  if (!session || session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." }
  }

  const data = await getNotificationFeed(churchId, session.user.id)
  return { success: true, data }
}

export async function markNotificationAsReadAction(
  churchId: string,
  notificationId: string
): Promise<ActionResponse> {
  const session = await getAuthSession()

  if (!session || session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." }
  }

  await markNotificationAsRead(churchId, session.user.id, notificationId)
  await revalidateNotificationRoutes(churchId)
  return { success: true }
}

export async function markAllNotificationsAsReadAction(
  churchId: string
): Promise<ActionResponse> {
  const session = await getAuthSession()

  if (!session || session.user.churchId !== churchId) {
    return { success: false, error: "Nao autorizado." }
  }

  await markAllNotificationsAsRead(churchId, session.user.id)
  await revalidateNotificationRoutes(churchId)
  return { success: true }
}
