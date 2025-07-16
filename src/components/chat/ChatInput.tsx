"use client"

import { ChevronDown, Paperclip, Send } from "lucide-react"
import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import WithTooltip from "../WithTooltip"

interface ChatInputProps {
  onSend: (msg: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("")

  const canSendMessage = input.trim() !== ""

  const handleSubmit = () => {
    if (canSendMessage) {
      onSend(input.trim())
      setInput("")
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="w-full rounded-3xl p-4 shadow ring ring-zinc-950/10"
    >
      <TextareaAutosize
        autoFocus
        value={input}
        placeholder="Ask anything"
        minRows={2}
        maxRows={11}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        className="w-full resize-none outline-none"
      />

      <div className="flex justify-between">
        <div className="flex -translate-x-2 space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer font-normal">
                4.1 Nano
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
          <WithTooltip content="Add photos & files" side="bottom" delayDuration={700}>
            <Button size="icon" variant="ghost" className="size-8 cursor-pointer">
              <Paperclip />
              <span className="sr-only">Add photos & files</span>
            </Button>
          </WithTooltip>
        </div>

        <Button
          size="icon"
          variant="ghost"
          disabled={!canSendMessage}
          className="size-8 cursor-pointer bg-blue-400 not-disabled:hover:bg-blue-500 disabled:bg-blue-200"
        >
          <Send className="text-primary-foreground" />
          <span className="sr-only">Send prompt</span>
        </Button>
      </div>
    </form>
  )
}
