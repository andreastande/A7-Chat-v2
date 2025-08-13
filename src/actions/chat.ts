"use server"

import { createChat as createChatDb, generateAndUpdateTitle as generateAndUpdateTitleDb } from "@/db/queries"
import { verifySession } from "@/lib/dal"

export async function createChat(chatId: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")

  await createChatDb(userId, chatId, "gpt-4.1-nano")
}

export async function generateAndUpdateTitle(chatId: string, message: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")

  await generateAndUpdateTitleDb(userId, chatId, message)
}
