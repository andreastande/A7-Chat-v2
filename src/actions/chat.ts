"use server"

import { db } from "@/db"
import { chat } from "@/db/schema"
import { requireSession, verifySession } from "@/lib/dal"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { and, desc, eq } from "drizzle-orm"

export async function getChats() {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) return []

  return db.select().from(chat).where(eq(chat.userId, userId)).orderBy(desc(chat.updatedAt))
}

export async function getChat(id: string) {
  const { userId } = await requireSession()

  return db
    .select()
    .from(chat)
    .where(and(eq(chat.id, id), eq(chat.userId, userId)))
    .limit(1)
}

export async function createChat(id: string) {
  const { userId } = await requireSession()

  await db.insert(chat).values({
    id,
    model: "gpt-4.1-nano",
    title: "New chat",
    userId,
  })
}

export async function generateAndUpdateTitle(id: string, message: string) {
  const { userId } = await requireSession()

  const { text: title } = await generateText({
    model: openai("gpt-4.1-nano"),
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
    .where(and(eq(chat.id, id), eq(chat.userId, userId)))
}
