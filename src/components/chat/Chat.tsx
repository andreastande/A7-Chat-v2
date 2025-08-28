"use client"

import { generateAndUpdateTitle } from "@/actions/chat"
import { UIMessage, useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef } from "react"
import { useChatHistory } from "../providers/ChatHistoryProvider"
import { useModel } from "../providers/ModelProvider"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

interface ChatProps {
  id: string
  initialMessages?: UIMessage[]
}

export default function Chat({ id, initialMessages = [] }: ChatProps) {
  const { model } = useModel()
  const { renameChat, touchChat, addChat } = useChatHistory()

  const { status, messages, sendMessage, stop, regenerate } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: { message: messages[messages.length - 1], id, ...body },
        }
      },
    }),
  })

  const didRegenerateRef = useRef(false)

  useEffect(() => {
    const sendFirstMessage = async () => {
      if (initialMessages.length === 1 && !didRegenerateRef.current) {
        didRegenerateRef.current = true
        regenerate({ body: { model } })

        addChat(id) // optimistic

        const firstMsg = initialMessages[0].parts.find((part) => part.type === "text")!.text
        const title = await generateAndUpdateTitle(id, firstMsg) // db

        renameChat(id, title) // optimistic
      }
    }
    sendFirstMessage()
  }, [initialMessages, id, model, regenerate, addChat, renameChat])

  const handleSendMessage = (msg: string) => {
    sendMessage({ text: msg }, { body: { model } })
    touchChat(id) // optimistic
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="prose flex w-full max-w-3xl flex-col space-y-14 pt-14 pb-40">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          <PositionedChatInput mode={"static"} status={status} stop={stop} onSend={handleSendMessage} />
        </div>
      </div>
    </>
  )
}
