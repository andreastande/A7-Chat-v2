import "server-only"

import { generateText, UIMessage } from "ai"
import { and, desc, eq } from "drizzle-orm"
import { db } from "."
import { chat, message } from "./schema"

export async function getChat(userId: string, chatId: string) {
  const [row] = await db
    .select()
    .from(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .limit(1)

  return row
}

export async function getChats(userId: string) {
  return await db.select().from(chat).where(eq(chat.userId, userId)).orderBy(desc(chat.updatedAt))
}

export async function getUIMessagesInChat(userId: string, chatId: string) {
  const UIMessages = await db
    .select({ uiMessage: message.uiMessage })
    .from(message)
    .where(and(eq(message.chatId, chatId), eq(message.userId, userId)))
  return UIMessages.map(({ uiMessage }) => uiMessage as UIMessage)
}

export async function insertUIMessageInChat(userId: string, chatId: string, uiMessage: UIMessage) {
  await db.insert(message).values({
    id: uiMessage.id,
    chatId,
    userId,
    uiMessage,
  })
  await db
    .update(chat)
    .set({ updatedAt: new Date() })
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
}

export async function isChatOwnedByUser(userId: string, chatId: string) {
  const row = await getChat(userId, chatId)
  return !!row
}

export async function createChat(userId: string, chatId: string, model: string) {
  await db.insert(chat).values({
    id: chatId,
    model,
    title: "New chat",
    userId,
  })
}

export async function generateAndUpdateTitle(userId: string, chatId: string, message: string) {
  const { text: title } = await generateText({
    model: "openai/gpt-4.1-nano",
    system: `
      You are a helpful assistant that writes concise, topic-specific chat titles 
      based on the user's first message. Limit to 2-5 words.
    `,
    prompt: message,
  })

  await db
    .update(chat)
    .set({
      title,
    })
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))

  return title
}

export async function renameChatTitle(userId: string, chatId: string, newTitle: string) {
  await db
    .update(chat)
    .set({ title: newTitle, updatedAt: chat.updatedAt })
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
}

export async function deleteChat(userId: string, chatId: string) {
  await db.delete(chat).where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
}
