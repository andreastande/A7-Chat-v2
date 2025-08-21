import "server-only"

import { headers } from "next/headers"
import { cache } from "react"
import { auth } from "./auth"

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { isAuth: false, userId: null, user: null } as const
  }

  return { isAuth: true, userId: session.user.id, user: session.user } as const
})
