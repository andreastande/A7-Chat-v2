"use server"

import { db } from "@/db"
import { message } from "@/db/schema"
import { and, asc, eq } from "drizzle-orm"

export async function getMessages(chatId: string) {
  // TODO: Need to add "userId" and "guestId" columns for messages
  return db
    .select({
      uiMessage: message.uiMessage,
    })
    .from(message)
    .where(and(eq(message.chatId, chatId)))
    .orderBy(asc(message.createdAt))
}
