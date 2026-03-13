export type NotificationType =
  | "VOLUNTEER_ASSIGNED_TO_SCALE"
  | "VOLUNTEER_CONFIRMED_SCALE"
  | "VOLUNTEER_DECLINED_SCALE"
  | "VOLUNTEER_REQUESTED_SWAP"

export interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  message: string
  link?: string
  readAt?: string
  createdAt: string
}

export interface NotificationFeed {
  unreadCount: number
  notifications: NotificationItem[]
}
