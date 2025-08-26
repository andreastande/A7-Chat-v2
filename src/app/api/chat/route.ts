import { getUIMessagesInChat, insertUIMessagesInChat, isChatOwnedByUser } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { Model } from "@/types/model"
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { NextResponse } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { message, id: chatId, model }: { message: UIMessage; id: string; model: Model } = await req.json()

  const { isAuth, userId } = await verifySession()

  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(await isChatOwnedByUser(userId, chatId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const dbMessages = await getUIMessagesInChat(userId, chatId)
  const messages = dbMessages.length > 1 ? [...dbMessages, message] : [message]

  const result = streamText({
    model: model.provider.toLowerCase() + "/" + model.apiName,
    messages: convertToModelMessages(messages),
    system: `In case the user asks which model you are, you are ${model.label}.`,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      const known = new Set(dbMessages.map((m) => m.id))
      const toStore = messages.slice(dbMessages.length).filter((m) => !known.has(m.id))
      if (!toStore.length) return
      await insertUIMessagesInChat(userId, chatId, toStore)
    },
  })
}
