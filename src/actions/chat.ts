"use server"

import { createChat, deleteChat, updateChatTitle } from "@/lib/dal/chat"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { generateText } from "ai"
import { redirect } from "next/navigation"

export async function newChat(chatId: string) {
  try {
    await createChat(chatId, "gpt-4.1-nano")
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    throw e
  }
}

export async function removeChat(chatId: string) {
  try {
    await deleteChat(chatId)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
    throw e
  }
}

export async function renameChat(chatId: string, newTitle: string) {
  try {
    await updateChatTitle(chatId, newTitle)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
    throw e
  }
}

// TODO: Should perhaps be a route handler?
export async function generateTitle(message: string) {
  const { text: newTitle } = await generateText({
    model: "openai/gpt-4.1-nano",
    system: `
      You are a helpful assistant that writes concise, topic-specific chat titles 
      based on the user's first message. Limit to 2-5 words.
    `,
    prompt: message,
  })

  return newTitle
}
