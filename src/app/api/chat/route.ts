import { db } from "@/db"
import { message as messageTable } from "@/db/schema"
import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { eq } from "drizzle-orm"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { message, id }: { message: UIMessage; id: string } = await req.json()

  const dbMessages = await db
    .select({
      uiMessage: messageTable.uiMessage,
    })
    .from(messageTable)
    .where(eq(messageTable.chatId, id))

  const previousMessages = dbMessages.map(({ uiMessage }) => uiMessage as UIMessage)
  const messages = [...previousMessages, message]

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      const [userMessage, assistantMessage] = messages.slice(-2)

      await db.insert(messageTable).values([
        {
          id: userMessage.id,
          chatId: id,
          uiMessage: userMessage,
        },
        {
          id: assistantMessage.id,
          chatId: id,
          uiMessage: assistantMessage,
        },
      ])
    },
  })
}
