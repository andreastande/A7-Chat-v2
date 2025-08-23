"use client"

import { useAutoFocusOnTyping } from "@/hooks/useAutoFocusOnTyping"
import { UseChatHelpers } from "@ai-sdk/react"
import { UIMessage } from "ai"
import { Plus, Send, Square } from "lucide-react"
import { useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "../ui/button"
import WithTooltip from "../WithTooltip"
import ModelPicker from "./ModelPicker"

interface ChatInputProps {
  status?: UseChatHelpers<UIMessage>["status"]
  stop?: UseChatHelpers<UIMessage>["stop"]
  onSend: (msg: string) => void
}

export default function ChatInput({ status, stop, onSend }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useAutoFocusOnTyping(textareaRef, (char) => {
    setInput((prev) => prev + char)
  })

  const canStop = status === "streaming" || status === "submitted"
  const canSend = !canStop && input.trim() !== ""

  const handleSubmit = () => {
    if (canSend) {
      onSend(input.trim())
      setInput("")
    } else if (canStop) {
      stop?.()
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
          <ModelPicker />

          <div className="h-5 w-px bg-zinc-950/10" />

          <WithTooltip content="Add files and more" side="bottom">
            <Button size="icon" variant="ghost" className="size-8 cursor-pointer">
              <Plus />
              <span className="sr-only">Add files and more</span>
            </Button>
          </WithTooltip>
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
