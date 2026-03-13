import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { getNotificationFeed } from "@/lib/notifications"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const churchId = request.nextUrl.searchParams.get("churchId")

  if (!session || !churchId || session.user.churchId !== churchId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      let closed = false
      let lastSnapshot = ""

      const send = async () => {
        if (closed) {
          return
        }

        const feed = await getNotificationFeed(churchId, session.user.id)
        const snapshot = JSON.stringify(feed)

        if (snapshot !== lastSnapshot) {
          controller.enqueue(encoder.encode(`data: ${snapshot}\n\n`))
          lastSnapshot = snapshot
        }
      }

      void send()

      const interval = setInterval(() => {
        void send()
      }, 4000)

      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(": keep-alive\n\n"))
      }, 15000)

      request.signal.addEventListener("abort", () => {
        closed = true
        clearInterval(interval)
        clearInterval(keepAlive)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
