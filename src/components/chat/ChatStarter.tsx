"use client"

import { createChat, generateAndUpdateTitle } from "@/actions/chat"
import { insertUIMessagesInChat } from "@/actions/message"
import { generateId, UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai"
import { useRouter } from "next/navigation"
import PositionedChatInput from "./PositionedChatInput"

export default function ChatStarter() {
  const router = useRouter()

  async function handleSendMessage(msg: string) {
    const chatId = crypto.randomUUID()

    await createChat(chatId)
    void generateAndUpdateTitle(chatId, msg)

    const toUIMessage = {
      id: generateId(),
      metadata: undefined,
      role: "user",
      parts: [{ type: "text", text: msg }] as Array<UIMessagePart<UIDataTypes, UITools>>,
    } satisfies UIMessage

    await insertUIMessagesInChat(chatId, [toUIMessage])

    router.push(`/chat/${chatId}`)
  }

  return (
    <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-[174.5px]">
      <p className="mx-auto mb-7 w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent">
        What&apos;s on your mind today?
      </p>
      <PositionedChatInput mode="empty" onSend={handleSendMessage} />
    </div>
  )
}
