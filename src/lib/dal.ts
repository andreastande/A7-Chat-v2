import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { auth } from "./auth"

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return { isAuth: false, userId: null, user: null } as const
  return { isAuth: true, userId: session.user.id, user: session.user } as const
})

// TODO: Is this really what I want?
export async function requireSession() {
  const session = await verifySession()
  if (!session.isAuth) redirect("/login")
  return session
}
