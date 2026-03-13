import { NotificationFeed, NotificationItem } from "@/@types/notification.types"
import { isStaffUser } from "@/lib/authorization"
import prisma from "@/lib/prisma"
import { NotificationType, Prisma } from "@prisma/generated/prisma/client"

type PrismaLike = Prisma.TransactionClient | typeof prisma

function mapNotification(notification: {
  id: string
  type: NotificationType
  title: string
  message: string
  link: string | null
  readAt: Date | null
  createdAt: Date
}): NotificationItem {
  return {
    id: notification.id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    link: notification.link || undefined,
    readAt: notification.readAt?.toISOString(),
    createdAt: notification.createdAt.toISOString(),
  }
}

export async function getNotificationFeed(
  churchId: string,
  userId: string,
  limit = 8
): Promise<NotificationFeed> {
  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: {
        churchId,
        recipientUserId: userId,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        link: true,
        readAt: true,
        createdAt: true,
      },
    }),
    prisma.notification.count({
      where: {
        churchId,
        recipientUserId: userId,
        readAt: null,
      },
    }),
  ])

  return {
    unreadCount,
    notifications: notifications.map(mapNotification),
  }
}

export async function markNotificationAsRead(
  churchId: string,
  userId: string,
  notificationId: string
) {
  await prisma.notification.updateMany({
    where: {
      id: notificationId,
      churchId,
      recipientUserId: userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  })
}

export async function markAllNotificationsAsRead(churchId: string, userId: string) {
  await prisma.notification.updateMany({
    where: {
      churchId,
      recipientUserId: userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  })
}

async function getStaffRecipientIds(tx: PrismaLike, churchId: string) {
  const users = await tx.user.findMany({
    where: { churchId },
    select: {
      id: true,
      status: true,
      role: true,
    },
  })

  return users.filter((user) => isStaffUser(user)).map((user) => user.id)
}

async function getUserIdByPersonEmail(
  tx: PrismaLike,
  churchId: string,
  email: string | null | undefined
) {
  if (!email) {
    return null
  }

  const user = await tx.user.findFirst({
    where: {
      churchId,
      email,
    },
    select: { id: true },
  })

  return user?.id || null
}

async function createNotifications(
  tx: PrismaLike,
  notifications: Array<{
    churchId: string
    recipientUserId: string
    actorUserId?: string
    type: NotificationType
    title: string
    message: string
    link?: string
    entityType?: string
    entityId?: string
    metadata?: Prisma.InputJsonValue
  }>
) {
  if (notifications.length === 0) {
    return
  }

  await tx.notification.createMany({
    data: notifications.map((notification) => ({
      churchId: notification.churchId,
      recipientUserId: notification.recipientUserId,
      actorUserId: notification.actorUserId || null,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      link: notification.link || null,
      entityType: notification.entityType || null,
      entityId: notification.entityId || null,
      metadata: notification.metadata,
    })),
  })
}

export async function notifyVolunteerAssignedToScale(
  tx: PrismaLike,
  params: {
    churchId: string
    churchLabel: string
    actorUserId?: string
    scale: {
      id: string
      eventName: string | null
      role: string
      date: Date
      person: {
        id: string
        name: string
        email: string | null
      }
      ministry: {
        name: string
      }
    }
  }
) {
  const recipientUserId = await getUserIdByPersonEmail(
    tx,
    params.churchId,
    params.scale.person.email
  )

  if (!recipientUserId) {
    return
  }

  await createNotifications(tx, [
    {
      churchId: params.churchId,
      recipientUserId,
      actorUserId: params.actorUserId,
      type: "VOLUNTEER_ASSIGNED_TO_SCALE",
      title: "Voce foi escalado",
      message: `${params.scale.person.name}, voce foi escalado para ${params.scale.role} em ${params.scale.eventName || "um evento"} no ministerio ${params.scale.ministry.name}.`,
      link: `/${params.churchLabel}/dashboard/ministerios`,
      entityType: "volunteer_scale",
      entityId: params.scale.id,
      metadata: {
        scaleId: params.scale.id,
        eventName: params.scale.eventName || "Evento",
        role: params.scale.role,
        ministryName: params.scale.ministry.name,
        eventDate: params.scale.date.toISOString(),
      },
    },
  ])
}

export async function notifyStaffAboutScaleResponse(
  tx: PrismaLike,
  params: {
    churchId: string
    churchLabel: string
    actorUserId?: string
    type: Extract<
      NotificationType,
      | "VOLUNTEER_CONFIRMED_SCALE"
      | "VOLUNTEER_DECLINED_SCALE"
      | "VOLUNTEER_REQUESTED_SWAP"
    >
    scale: {
      id: string
      eventName: string | null
      role: string
      responseNote: string | null
      person: {
        id: string
        name: string
      }
      ministry: {
        name: string
      }
    }
  }
) {
  const recipientUserIds = await getStaffRecipientIds(tx, params.churchId)

  if (recipientUserIds.length === 0) {
    return
  }

  const messageByType: Record<
    Extract<
      NotificationType,
      | "VOLUNTEER_CONFIRMED_SCALE"
      | "VOLUNTEER_DECLINED_SCALE"
      | "VOLUNTEER_REQUESTED_SWAP"
    >,
    { title: string; message: string }
  > = {
    VOLUNTEER_CONFIRMED_SCALE: {
      title: "Voluntario confirmou a escala",
      message: `${params.scale.person.name} confirmou presenca para ${params.scale.role} em ${params.scale.eventName || "um evento"}.`,
    },
    VOLUNTEER_DECLINED_SCALE: {
      title: "Voluntario recusou a escala",
      message: `${params.scale.person.name} recusou a escala de ${params.scale.role} em ${params.scale.eventName || "um evento"}.`,
    },
    VOLUNTEER_REQUESTED_SWAP: {
      title: "Voluntario solicitou troca",
      message: `${params.scale.person.name} pediu troca na escala de ${params.scale.role} em ${params.scale.eventName || "um evento"}.`,
    },
  }

  const content = messageByType[params.type]

  await createNotifications(
    tx,
    recipientUserIds
      .filter((recipientUserId) => recipientUserId !== params.actorUserId)
      .map((recipientUserId) => ({
        churchId: params.churchId,
        recipientUserId,
        actorUserId: params.actorUserId,
        type: params.type,
        title: content.title,
        message: content.message,
        link: `/${params.churchLabel}/dashboard/ministerios`,
        entityType: "volunteer_scale",
        entityId: params.scale.id,
        metadata: {
          scaleId: params.scale.id,
          eventName: params.scale.eventName || "Evento",
          role: params.scale.role,
          ministryName: params.scale.ministry.name,
          volunteerName: params.scale.person.name,
          note: params.scale.responseNote || "",
        },
      }))
  )
}
