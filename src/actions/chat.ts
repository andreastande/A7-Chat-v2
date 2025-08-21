"use server"

import {
  createChat as createChatDb,
  deleteChat as deleteChatDb,
  generateAndUpdateTitle as generateAndUpdateTitleDb,
  isChatOwnedByUser,
  renameChatTitle as renameChatTitleDb,
} from "@/db/queries"
import { verifySession } from "@/lib/dal"

export async function createChat(chatId: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")

  await createChatDb(userId, chatId, "gpt-4.1-nano")
}

export async function generateAndUpdateTitle(chatId: string, message: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")
  if (!(await isChatOwnedByUser(userId, chatId))) throw new Error("Forbidden")

  await generateAndUpdateTitleDb(userId, chatId, message)
}

export async function renameChatTitle(chatId: string, newTitle: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")
  if (!(await isChatOwnedByUser(userId, chatId))) throw new Error("Forbidden")

  await renameChatTitleDb(userId, chatId, newTitle)
}

export async function deleteChat(chatId: string) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) throw new Error("Unauthorized")
  if (!(await isChatOwnedByUser(userId, chatId))) throw new Error("Forbidden")

  await deleteChatDb(userId, chatId)
}
