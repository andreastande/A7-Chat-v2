"use client"

import { motion } from "motion/react"
import { ComponentProps } from "react"
import ChatInput from "./ChatInput"

interface PositionedChatInputProps extends ComponentProps<typeof ChatInput> {
  mode: "empty" | "animate" | "static"
}

export default function PositionedChatInput({ mode, ...chatInputProps }: PositionedChatInputProps) {
  if (mode === "empty") {
    return <ChatInput {...chatInputProps} />
  }

  if (mode === "animate") {
    return (
      <motion.div
        initial={{ y: -(typeof window !== "undefined" ? window.innerHeight / 2 - 32 : 0) }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
        }}
        className="fixed bottom-0 mb-8 w-full max-w-3xl"
      >
        <ChatInput {...chatInputProps} />
      </motion.div>
    )
  }

  return (
    <div className="fixed bottom-0 mb-8 w-full max-w-3xl">
      <ChatInput {...chatInputProps} />
    </div>
  )
}
