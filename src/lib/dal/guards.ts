import { db } from "@/db"
import { cache } from "react"
import "server-only"
import { ChatNotFoundOrForbiddenError } from "../errors"

export const assertChatOwnership = cache(async (chatId: string, userId: string) => {
  const row = await db.query.chats.findFirst({
    where: (c, { and, eq }) => and(eq(c.id, chatId), eq(c.userId, userId)),
  })

  if (!row) {
    throw new ChatNotFoundOrForbiddenError()
  }
})
