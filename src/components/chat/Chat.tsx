"use client"

import { invalidateRouterCache } from "@/actions/router"
import { useFileUpload } from "@/hooks/useFileUpload"
import { useChat } from "@ai-sdk-tools/store"
import { DefaultChatTransport, UIMessage } from "ai"
import FileDropOverlay from "../FileDropOverlay"
import Message from "./Message"
import PositionedChatInput from "./PositionedChatInput"

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
          <div className="prose flex w-full max-w-3xl flex-col space-y-14 pt-14 pb-40">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}

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
