"use server"

import { insertUIMessagesInChat as insertUIMessagesInChatDb, isChatOwnedByUser } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { UIMessage } from "ai"

export async function insertUIMessagesInChat(chatId: string, uiMessages: UIMessage[]) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")
  if (!(await isChatOwnedByUser(userId, chatId))) throw new Error("Forbidden")

  await insertUIMessagesInChatDb(userId, chatId, uiMessages)
}
