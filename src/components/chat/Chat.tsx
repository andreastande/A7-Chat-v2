"use client"

import { generateTitle, newChat, renameChat as renameChatDB } from "@/actions/chat"
import { invalidateRouterCache } from "@/actions/router"
import { useFileUpload } from "@/hooks/useFileUpload"
import { UIMessage, useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import FileDropOverlay from "../FileDropOverlay"
import { useChatHistory } from "../providers/ChatHistoryProvider"
import { useModel } from "../providers/ModelProvider"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

interface ChatProps {
  id: string
  initialMessages?: UIMessage[]
  isNewChat?: boolean
}

export default function Chat({ id, initialMessages = [], isNewChat = false }: ChatProps) {
  const { model } = useModel()
  const { renameChat, touchChat, addChat } = useChatHistory()
  const { files, isDragActive, getRootProps, getInputProps, openFileDialog } = useFileUpload()

  const { status, messages, sendMessage, stop } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: { message: messages[messages.length - 1], id, ...body },
        }
      },
    }),
    onFinish: async () => {
      if (isNewChat) {
        await invalidateRouterCache()
      }
    },
  })

  const isNewEmptyChat = isNewChat && messages.length === 0

  const handleSendMessage = async (msg: string) => {
    if (isNewEmptyChat) {
      window.history.pushState({}, "", `/chat/${id}`)
      await newChat(id) // db
    }

    sendMessage({ text: msg }, { body: { model } })

    if (isNewEmptyChat) {
      addChat(id) // optimistic

      const title = await generateTitle(msg)
      renameChat(id, title) // optimistic
      await renameChatDB(id, title) // db
    } else {
      touchChat(id) // optimistic
    }
  }

  return (
    <div {...getRootProps()} className="size-full">
      <input {...getInputProps()} />
      {isDragActive && <FileDropOverlay />}

      {isNewEmptyChat ? (
        <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-[174.5px]">
          <p className="mx-auto mb-7 w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent">
            What&apos;s on your mind today?
          </p>

          <PositionedChatInput mode="empty" files={files} onSend={handleSendMessage} openFileDialog={openFileDialog} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="prose flex w-full max-w-3xl flex-col space-y-14 pt-14 pb-40">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}

            <PositionedChatInput
              mode={isNewChat ? "animate" : "static"}
              files={files}
              status={status}
              stop={stop}
              onSend={handleSendMessage}
              openFileDialog={openFileDialog}
            />
          </div>
        </div>
      )}
    </div>
  )
}
