"use client"

import { createChat } from "@/actions/chat"
import { insertUIMessagesInChat } from "@/actions/message"
import { generateId, UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

export default function ChatStarter() {
  const router = useRouter()
  const [message, setMessage] = useState<UIMessage | null>(null)

  async function handleSendMessage(msg: string) {
    const uiMsg: UIMessage = {
      id: generateId(),
      metadata: undefined,
      role: "user",
      parts: [{ type: "text", text: msg }] as Array<UIMessagePart<UIDataTypes, UITools>>,
    }
    setMessage(uiMsg)

    const chatId = crypto.randomUUID()

    await createChat(chatId)
    await insertUIMessagesInChat(chatId, [uiMsg])

    router.push(`/chat/${chatId}`)
  }

  return (
    <>
      {message ? (
        <div className="flex justify-center">
          <div className="prose flex w-full max-w-3xl flex-col space-y-14 pt-14 pb-40">
            <Message message={message} />
            <PositionedChatInput mode="animate" onSend={handleSendMessage} status="streaming" />
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-[174.5px]">
          <p className="mx-auto mb-7 w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent">
            What&apos;s on your mind today?
          </p>
          <PositionedChatInput mode="empty" onSend={handleSendMessage} />
        </div>
      )}
    </>
  )
}
