"use client"

import { UIMessage, useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef } from "react"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

interface ChatProps {
  id?: string
  initialMessages?: UIMessage[]
}

export default function Chat({ id, initialMessages = [] }: ChatProps) {
  const { status, messages, sendMessage, stop, regenerate } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest({ messages, id }) {
        return { body: { message: messages[messages.length - 1], id } }
      },
    }),
  })

  const didRegenerateRef = useRef(false)

  useEffect(() => {
    if (initialMessages.length === 1 && !didRegenerateRef.current) {
      didRegenerateRef.current = true
      regenerate()
    }
  }, [initialMessages.length, regenerate])

  const handleSendMessage = (msg: string) => {
    sendMessage({ text: msg })
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="prose flex w-full max-w-3xl flex-col space-y-14 pt-14 pb-40">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          <PositionedChatInput
            mode={initialMessages.length === 1 ? "animate" : "static"}
            status={status}
            stop={stop}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </>
  )
}
