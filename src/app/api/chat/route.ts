import { verifySession } from "@/lib/auth/session"
import { assertChatOwnership } from "@/lib/dal/guards"
import { getMessages, upsertMessage } from "@/lib/dal/message"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { computeMessageCostUSD } from "@/lib/usage"
import { UIMessage } from "@/types/message"
import { Model } from "@/types/model"
import { convertToModelMessages, createIdGenerator, streamText } from "ai"
import { NextResponse } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { message, id: chatId, model }: { message: UIMessage; id: string; model: Model } = await req.json()

  try {
    const { userId } = await verifySession()
    await assertChatOwnership(chatId, userId)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (e instanceof ChatNotFoundOrForbiddenError) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 })
    }
    throw e
  }

  const dbMessages = await getMessages(chatId)
  const messages = [...dbMessages, message]

  await upsertMessage({ messageId: message.id, message, chatId })

  const result = streamText({
    model: model.id,
    messages: convertToModelMessages(messages),
    system: `In case the user asks which model you are, you are ${model.name}.`,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    messageMetadata: ({ part }) => {
      if (part.type === "finish") {
        return {
          model: model.id,
          usage: {
            tokens: part.totalUsage,
            cost: computeMessageCostUSD(model.id, part.totalUsage),
          },
        }
      }
    },
    generateMessageId: createIdGenerator(),
    onFinish: async ({ responseMessage }) => {
      await upsertMessage({ messageId: responseMessage.id, message: responseMessage, chatId })
    },
  })
}
