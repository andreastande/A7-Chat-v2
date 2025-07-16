"use server"

import { db } from "@/db"
import { chat } from "@/db/schema"
import { verifySession } from "@/lib/dal"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function createChat(id: string, message: string) {
  const { user } = await verifySession()

  const title = await generateText({
    model: openai("gpt-4.1-nano"),
    system: "You are a helpful assistant that creates short, descriptive titles for chat conversations.",
    prompt: message,
  })

  await db.insert(chat).values({
    id,
    model: "gpt-4.1-nano",
    title: title.text,
    userId: user?.id ?? "",
  })
}
