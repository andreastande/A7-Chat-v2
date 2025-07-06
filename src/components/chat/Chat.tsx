"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import Message from "./Message"

export default function Chat() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-3xl flex-col pt-14">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput("")
          }}
        >
          <input
            className="fixed bottom-0 mb-8 w-full max-w-3xl rounded border border-zinc-300 p-2 shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  )
}
