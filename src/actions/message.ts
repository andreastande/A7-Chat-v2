"use server"

import { deleteMessage } from "@/lib/dal/message"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { redirect } from "next/navigation"

export async function removeMessage(messageId: string) {
  try {
    await deleteMessage(messageId)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
    throw e
  }
}
