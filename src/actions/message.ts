"use server"

import { insertUIMessageInChat as insertUIMessageInChatDb, isChatOwnedByUser } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { UIMessage } from "ai"

export async function insertUIMessageInChat(chatId: string, uiMessage: UIMessage) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")
  if (!(await isChatOwnedByUser(userId, chatId))) throw new Error("Forbidden")

  await insertUIMessageInChatDb(userId, chatId, uiMessage)
}
