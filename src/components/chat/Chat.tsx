"use client"

import { createChat } from "@/actions/chat"
import { UIMessage, useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

interface ChatProps {
  id?: string
  initialMessages?: UIMessage[]
}

export default function Chat({ id, initialMessages = [] }: ChatProps) {
  const [chatId] = useState(id ?? crypto.randomUUID())

  const { messages, sendMessage } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest({ messages, id }) {
        return { body: { message: messages[messages.length - 1], id } }
      },
    }),
  })

  const isNewChat = !id ? true : false
  const isEmptyChat = messages.length === 0

  const handleSendMessage = async (message: string) => {
    if (isNewChat) {
      window.history.pushState(null, "", `/chat/${chatId}`)
      await createChat(chatId, message)
    }
    sendMessage({ text: message })
  }

  return (
    <>
      {isEmptyChat ? (
        <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-[178.5px]">
          <p className="mx-auto mb-7 w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent">
            What&apos;s on your mind today?
          </p>
          <PositionedChatInput mode="empty" onSend={handleSendMessage} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex w-full max-w-3xl flex-col space-y-14 pt-14">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <PositionedChatInput mode={isNewChat ? "animate" : "static"} onSend={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  )
}
