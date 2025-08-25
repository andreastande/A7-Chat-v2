"use client"

import { Model } from "@/types/model"
import { UIMessage, useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef } from "react"
import { useModel } from "../providers/ModelProvider"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

interface ChatProps {
  id?: string
  initialMessages?: UIMessage[]
}

export default function Chat({ id, initialMessages = [] }: ChatProps) {
  const { model } = useModel()
  const { status, messages, sendMessage, stop, regenerate } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest({ messages, id, requestMetadata }) {
        return {
          body: { message: messages[messages.length - 1], id, model: requestMetadata as Model },
        }
      },
    }),
  })

  const didRegenerateRef = useRef(false)

  useEffect(() => {
    if (initialMessages.length === 1 && !didRegenerateRef.current) {
      didRegenerateRef.current = true
      regenerate({ metadata: model })
    }
  }, [initialMessages.length, regenerate])

  const handleSendMessage = (msg: string) => {
    sendMessage({ text: msg }, { metadata: model })
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
