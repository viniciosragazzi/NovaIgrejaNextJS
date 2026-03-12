import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Se estiver usando o Next.js, ele pega a URL automaticamente
    // ou você pode usar process.env.NEXT_PUBLIC_APP_URL
    baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
})
