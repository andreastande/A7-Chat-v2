"use server"

import { verifySession } from "@/lib/auth/session"
import { createChat, deleteChat, updateChatModel, updateChatTitle } from "@/lib/dal/chat"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { generateText } from "ai"
import { redirect } from "next/navigation"

export async function newChat(chatId: string, modelId: string) {
  try {
    await createChat(chatId, modelId)
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

export async function changeChatModel(chatId: string, modelId: string) {
  try {
    await updateChatModel(chatId, modelId)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
    throw e
  }
}

// TODO: Should perhaps be a route handler?
export async function generateTitle(message: string) {
  try {
    await verifySession()
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    throw e
  }

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
