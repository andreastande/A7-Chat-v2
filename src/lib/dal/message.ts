import { db } from "@/db"
import { messages, parts } from "@/db/schema/chat"
import { UIMessage } from "ai"
import { and, eq, gt } from "drizzle-orm"
import "server-only"
import { verifySession } from "../auth/session"
import { mapDBPartToUIMessagePart, mapUIMessagePartsToDBParts } from "../message-mapping"
import { assertChatOwnership } from "./guards"

export async function getMessages(chatId: string): Promise<UIMessage[]> {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  const rows = await db.query.messages.findMany({
    where: (m, { eq }) => eq(m.chatId, chatId),
    with: {
      parts: {
        orderBy: (parts, { asc }) => [asc(parts.order)],
      },
    },
    orderBy: (messages, { asc }) => [asc(messages.createdAt)],
  })

  return rows.map((message) => ({
    id: message.id,
    role: message.role,
    parts: message.parts.map((part) => mapDBPartToUIMessagePart(part)),
  }))
}

export async function upsertMessage({
  messageId,
  message,
  chatId,
}: {
  messageId: string
  message: UIMessage
  chatId: string
}) {
  const { userId } = await verifySession()

  await assertChatOwnership(chatId, userId)

  const mappedDBUIParts = mapUIMessagePartsToDBParts(message.parts, messageId)

  await db.transaction(async (tx) => {
    await tx
      .insert(messages)
      .values({
        chatId,
        role: message.role,
        id: messageId,
      })
      .onConflictDoUpdate({
        target: messages.id,
        set: {
          chatId,
        },
      })

    await tx.delete(parts).where(eq(parts.messageId, messageId))
    if (mappedDBUIParts.length > 0) {
      await tx.insert(parts).values(mappedDBUIParts)
    }
  })
}

export async function deleteMessage(messageId: string) {
  const { userId } = await verifySession()

  const message = await db.query.messages.findFirst({
    columns: { chatId: true, createdAt: true },
    where: (m, { eq }) => eq(m.id, messageId),
  })

  if (!message) throw new Error("Message not found")

  await assertChatOwnership(message.chatId, userId)

  await db.transaction(async (tx) => {
    // Delete all messages after this one in the chat
    await tx.delete(messages).where(and(eq(messages.chatId, message.chatId), gt(messages.createdAt, message.createdAt)))

    // Delete the target message (cascade delete will handle parts)
    await tx.delete(messages).where(eq(messages.id, messageId))
  })
}
