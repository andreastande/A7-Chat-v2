"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import ChatBubble from "./ChatBubble"

export default function Chat() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-3xl pt-14">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput("")
          }}
        >
          <input
            className="fixed bottom-0 w-full max-w-3xl p-2 mb-8 border border-zinc-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  )
}
