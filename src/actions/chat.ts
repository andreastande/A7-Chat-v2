"use server"

import { db } from "@/db"
import { chat } from "@/db/schema"
import { verifySession } from "@/lib/dal"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { and, eq } from "drizzle-orm"

export async function createChat(id: string) {
  const { user } = await verifySession()

  await db.insert(chat).values({
    id,
    model: "gpt-4.1-nano",
    title: "New chat",
    userId: user?.id ?? "", // TODO: Fix
  })
}

export async function generateAndUpdateTitle(id: string, message: string) {
  const { user } = await verifySession()

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
    .where(and(eq(chat.id, id), eq(chat.userId, user?.id ?? ""))) // TODO: Fix
}
