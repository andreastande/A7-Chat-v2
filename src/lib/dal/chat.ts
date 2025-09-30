import { db } from "@/db"
import { chats } from "@/db/schema/chat"
import { eq } from "drizzle-orm"
import "server-only"
import { verifySession } from "../auth/session"
import { assertChatOwnership } from "./guards"

export async function createChat(chatId: string, modelId: string) {
  const { userId } = await verifySession()

  await db.insert(chats).values({ id: chatId, userId, title: "New chat", model: modelId })
}

export async function getChats() {
  const { userId } = await verifySession()

  return await db.query.chats.findMany({
    where: (c, { eq }) => eq(c.userId, userId),
    orderBy: (c, { desc }) => [desc(c.updatedAt), desc(c.createdAt)],
  })
}

export async function getChat(chatId: string) {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  return await db.query.chats.findFirst({
    where: (c, { eq }) => eq(c.id, chatId),
  })
}

export async function deleteChat(chatId: string) {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  await db.delete(chats).where(eq(chats.id, chatId))
}

export async function updateChatModel(chatId: string, modelId: string) {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  await db.update(chats).set({ model: modelId, updatedAt: chats.updatedAt }).where(eq(chats.id, chatId))
}

export async function updateChatTitle(chatId: string, newTitle: string) {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  await db.update(chats).set({ title: newTitle, updatedAt: chats.updatedAt }).where(eq(chats.id, chatId))
}
