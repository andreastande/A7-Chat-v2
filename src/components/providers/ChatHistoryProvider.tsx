"use client"

import { cn } from "@/lib/utils"
import type { Chat } from "@/types/chat"
import * as React from "react"

type ChatHistoryContextProps = {
  /** Sorted desc by updatedAt */
  chats: Chat[]

  /** Add a chat (dedup by id; replaces if id exists). */
  addChat: (chat: Chat) => void

  /** Remove a chat by id. */
  removeChat: (chatId: string) => void

  /** Rename a chat's title by id. */
  renameChat: (chatId: string, newTitle: string) => void

  /** Update updatedAt to now and move to top. */
  touchChat: (chatId: string) => void
}

const ChatHistoryContext = React.createContext<ChatHistoryContextProps | null>(null)

export function useChatHistory() {
  const ctx = React.useContext(ChatHistoryContext)
  if (!ctx) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider.")
  }
  return ctx
}

function sortChatsByUpdatedAtDesc(chats: Chat[]) {
  return [...chats].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export function ChatHistoryProvider({
  initialChats = [],
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Initial chat history, e.g. from DB. */
  initialChats?: Chat[]
}) {
  const [chats, setChats] = React.useState<Chat[]>(sortChatsByUpdatedAtDesc(initialChats))

  const addChat = React.useCallback((chat: Chat) => {
    setChats((prev) => {
      const idx = prev.findIndex((c) => c.id === chat.id)
      const next = idx === -1 ? [...prev, chat] : [...prev.slice(0, idx), chat, ...prev.slice(idx + 1)]
      return sortChatsByUpdatedAtDesc(next)
    })
  }, [])

  const removeChat = React.useCallback((chatId: string) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId))
  }, [])

  const renameChat = React.useCallback((chatId: string, newTitle: string) => {
    setChats((prev) => {
      const next = prev.map((c) => (c.id === chatId ? ({ ...c, title: newTitle } as Chat) : c))
      // Renaming doesn't change order (no updatedAt change).
      return next
    })
  }, [])

  const touchChat = React.useCallback((chatId: string) => {
    setChats((prev) => {
      const next = prev.map((c) => (c.id === chatId ? ({ ...c, updatedAt: new Date() } as Chat) : c))
      return sortChatsByUpdatedAtDesc(next)
    })
  }, [])

  const value = React.useMemo<ChatHistoryContextProps>(
    () => ({ chats, addChat, removeChat, renameChat, touchChat }),
    [chats, addChat, removeChat, renameChat, touchChat]
  )

  return (
    <ChatHistoryContext.Provider value={value}>
      <div
        data-slot="chat-history-wrapper"
        data-chat-history="wrapper"
        style={style}
        className={cn("contents", className)}
        {...props}
      >
        {children}
      </div>
    </ChatHistoryContext.Provider>
  )
}
