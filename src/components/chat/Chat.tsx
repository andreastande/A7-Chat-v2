"use client"

import { invalidateRouterCache } from "@/actions/router"
import { useFileUpload } from "@/hooks/useFileUpload"
import { useScrollOnMount } from "@/hooks/useScrollOnMount"
import { useScrollOnSubmit } from "@/hooks/useScrollOnSubmit"
import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk-tools/store"
import { DefaultChatTransport, UIMessage } from "ai"
import FileDropOverlay from "../FileDropOverlay"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"
import ScrollToBottom from "./ScrollToBottom"

interface ChatProps {
  id: string
  initialMessages?: UIMessage[]
  isNewChat?: boolean
}

export default function Chat({ id, initialMessages = [], isNewChat = false }: ChatProps) {
  const { files, isDragActive, getRootProps, getInputProps, openFileDialog } = useFileUpload()
  const { messages } = useChat({
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

  useScrollOnSubmit()
  useScrollOnMount()

  const hasSentMessage = initialMessages.length !== messages.length

  const lastUserIndex = messages.findLastIndex((m) => m.role === "user")
  const earlierMessages = lastUserIndex === -1 ? messages : messages.slice(0, lastUserIndex)
  const currentExchange = lastUserIndex === -1 ? [] : messages.slice(lastUserIndex)

  return (
    <div {...getRootProps()} className="size-full">
      <input {...getInputProps()} />
      {isDragActive && <FileDropOverlay />}

      {isNewChat && messages.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-[174.5px]">
          <p className="mx-auto mb-7 w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent">
            What&apos;s on your mind today?
          </p>

          <PositionedChatInput isNewChat mode="empty" files={files} openFileDialog={openFileDialog} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-3xl space-y-14 pt-14 pb-40">
            {earlierMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div className={cn("!mb-0 space-y-14", hasSentMessage && "min-h-[calc(100vh-160px-56px)]")}>
              {currentExchange.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>

            <ScrollToBottom />

            <PositionedChatInput
              mode={isNewChat ? "animate" : "static"}
              files={files}
              openFileDialog={openFileDialog}
            />
          </div>
        </div>
      )}
    </div>
  )
}
