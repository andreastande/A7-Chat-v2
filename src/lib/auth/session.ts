import "server-only"

import { headers } from "next/headers"
import { auth } from "../auth/auth"
import { NotAuthenticatedError } from "../errors"

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new NotAuthenticatedError()
  }

  return { userId: session.user.id, user: session.user }
}
