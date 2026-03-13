"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Bell, CheckCheck, ChevronRight } from "lucide-react"
import { NotificationFeed, NotificationItem } from "@/@types/notification.types"
import {
  markAllNotificationsAsReadAction,
  markNotificationAsReadAction,
} from "@/actions/notification.actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

function formatRelativeDate(value: string) {
  const date = new Date(value)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function NotificationCenter({
  churchId,
  initialFeed,
}: {
  churchId: string
  initialFeed: NotificationFeed
}) {
  const router = useRouter()
  const [feed, setFeed] = useState(initialFeed)
  const [isPending, startTransition] = useTransition()
  const previousUnreadIdsRef = useRef<string[]>(initialFeed.notifications.filter((item) => !item.readAt).map((item) => item.id))

  useEffect(() => {
    const source = new EventSource(`/api/notifications/stream?churchId=${churchId}`)

    source.onmessage = (event) => {
      const nextFeed = JSON.parse(event.data) as NotificationFeed
      const unreadIds = nextFeed.notifications.filter((item) => !item.readAt).map((item) => item.id)
      const previousUnreadIds = previousUnreadIdsRef.current
      const incoming = nextFeed.notifications.filter(
        (item) => !previousUnreadIds.includes(item.id) && !item.readAt
      )

      if (incoming.length > 0) {
        const latest = incoming[0]
        toast(latest.title, {
          description: latest.message,
        })
      }

      previousUnreadIdsRef.current = unreadIds
      setFeed(nextFeed)
    }

    source.onerror = () => {
      source.close()
    }

    return () => {
      source.close()
    }
  }, [churchId])

  const unreadCount = feed.unreadCount

  const sortedNotifications = useMemo(
    () =>
      feed.notifications.slice().sort((left, right) => {
        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      }),
    [feed.notifications]
  )

  function handleOpenNotification(notification: NotificationItem) {
    startTransition(async () => {
      if (!notification.readAt) {
        await markNotificationAsReadAction(churchId, notification.id)
        setFeed((current) => ({
          unreadCount: Math.max(
            0,
            current.unreadCount - 1
          ),
          notifications: current.notifications.map((item) =>
            item.id === notification.id
              ? { ...item, readAt: new Date().toISOString() }
              : item
          ),
        }))
      }

      if (notification.link) {
        router.push(notification.link)
      }
    })
  }

  function handleMarkAllAsRead() {
    startTransition(async () => {
      const result = await markAllNotificationsAsReadAction(churchId)

      if (!result.success) {
        toast.error(result.error || "Nao foi possivel marcar as notificacoes.")
        return
      }

      setFeed((current) => ({
        unreadCount: 0,
        notifications: current.notifications.map((item) => ({
          ...item,
          readAt: item.readAt || new Date().toISOString(),
        })),
      }))
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button type="button" variant="outline" size="icon" className="relative h-11 w-11 rounded-2xl" />}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[360px] rounded-3xl p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notificacoes</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 rounded-xl text-xs"
            disabled={isPending || unreadCount === 0}
            onClick={handleMarkAllAsRead}
          >
            <CheckCheck className="mr-1 h-3.5 w-3.5" />
            Ler tudo
          </Button>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification, index) => (
              <div key={notification.id}>
                <DropdownMenuItem
                  onClick={() => handleOpenNotification(notification)}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-1 rounded-2xl px-3 py-3",
                    !notification.readAt && "bg-primary/5"
                  )}
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{notification.title}</p>
                    {!notification.readAt ? (
                      <Badge className="rounded-full bg-primary/10 text-primary">Nova</Badge>
                    ) : null}
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex w-full items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-muted-foreground">
                      {formatRelativeDate(notification.createdAt)}
                    </span>
                    {notification.link ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                  </div>
                </DropdownMenuItem>
                {index < sortedNotifications.length - 1 ? <DropdownMenuSeparator className="my-1" /> : null}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium">Nenhuma notificacao ainda</p>
              <p className="text-xs text-muted-foreground">
                Quando houver atualizacoes de escala e outros eventos, elas aparecerao aqui.
              </p>
            </div>
          )}
        </div>

        <div className="border-t px-4 py-3 text-xs text-muted-foreground">
          Atualizacao em tempo real ativa
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
