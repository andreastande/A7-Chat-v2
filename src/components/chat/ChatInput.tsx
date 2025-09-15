"use client"

import { generateTitle, newChat, renameChat as renameChatDB } from "@/actions/chat"
import { useAutoFocusOnTyping } from "@/hooks/useAutoFocusOnTyping"
import { useChatStoreState } from "@ai-sdk-tools/store"
import { Send, Square } from "lucide-react"
import { useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useChatHistory } from "../providers/ChatHistoryProvider"
import { useModel } from "../providers/ModelProvider"
import { Button } from "../ui/button"
import ChatToolsMenu from "./ChatToolsMenu"
import ModelPicker from "./model-picker/ModelPicker"

interface ChatInputProps {
  isNewChat?: boolean
  files: File[]
  openFileDialog: () => void
}

export default function ChatInput({ isNewChat = false, files, openFileDialog }: ChatInputProps) {
  const { id: chatId, status, stop, sendMessage } = useChatStoreState()
  const { model } = useModel()
  const { renameChat, touchChat, addChat } = useChatHistory()

  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useAutoFocusOnTyping(textareaRef, (char) => {
    setInput((prev) => prev + char)
  })

  const canStop = status === "streaming" || status === "submitted"
  const canSend = !canStop && input.trim() !== ""

  const handleSubmit = async () => {
    if (canSend) {
      setInput("")
      const msg = input.trim()

      if (isNewChat) {
        window.history.pushState({}, "", `/chat/${chatId}`)
        await newChat(chatId) // db
      }

      sendMessage({ text: msg }, { body: { model } })

      if (isNewChat) {
        addChat(chatId) // optimistic

        const title = await generateTitle(msg)
        renameChat(chatId, title) // optimistic
        await renameChatDB(chatId, title) // db
      } else {
        touchChat(chatId) // optimistic
      }
    } else if (canStop) {
      stop()
    }
  }

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    if (textareaRef.current && target !== textareaRef.current && !target.closest("button")) {
      textareaRef.current.focus()
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      onClick={handleFormClick}
      className="bg-background w-full cursor-text rounded-3xl p-4 shadow ring ring-zinc-950/10"
    >
      {files.length > 0 && (
        <div className="mb-2 flex gap-2">
          {files.map((file) => (
            <span key={file.name}>{file.name}</span>
          ))}
        </div>
      )}
      <TextareaAutosize
        ref={textareaRef}
        autoFocus
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        placeholder="Ask anything"
        minRows={2}
        maxRows={11}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        className="w-full resize-none outline-none"
      />

      <div className="flex justify-between">
        <div className="flex -translate-x-2 items-center space-x-2">
          <ChatToolsMenu openFileDialog={openFileDialog} />
          <div className="h-5 w-px bg-zinc-950/10" />
          <ModelPicker />
        </div>

        <Button
          size="icon"
          variant="ghost"
          disabled={!canSend && !canStop}
          className="size-8 cursor-pointer bg-blue-500 not-disabled:hover:bg-blue-600 disabled:bg-blue-200"
        >
          {canStop ? <Square className="text-primary-foreground" /> : <Send className="text-primary-foreground" />}
          <span className="sr-only">{canStop ? "Stop message stream" : "Send prompt"}</span>
        </Button>
      </div>
    </form>
  )
}
