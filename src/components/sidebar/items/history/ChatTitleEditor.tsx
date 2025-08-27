"use client"

import { renameChatTitle } from "@/actions/chat"
import { useChatHistory } from "@/components/providers/ChatHistoryProvider"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

type ChatTitleEditorProps = {
  chatId: string
  initialTitle: string
  title: string
  setTitle: (newTitle: string) => void
  closeEditor: () => void
}

export default function ChatTitleEditor({ chatId, initialTitle, title, setTitle, closeEditor }: ChatTitleEditorProps) {
  const { renameChat } = useChatHistory()

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 50)
    return () => clearTimeout(id)
  }, [])

  // Click outside (capture) cancels
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = formRef.current
      if (!el) return

      const target = e.target as Node | null
      if (!target || !el.contains(target)) {
        cancel()
      }
    }

    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cancel = () => {
    setTitle(initialTitle)
    closeEditor()
  }

  const commit = (newTitle: string) => {
    const finalTitle = newTitle.trim()
    if (!finalTitle || finalTitle === initialTitle) {
      cancel()
      return
    }

    closeEditor()

    toast.promise(renameChatTitle(chatId, finalTitle), {
      loading: "Renaming chat…",
      success: () => {
        renameChat(chatId, finalTitle)
        return `Chat "${initialTitle}" renamed to "${finalTitle}"!`
      },
      error: () => {
        setTitle(initialTitle)
        return "Couldn't rename chat."
      },
    })
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        commit(title)
      }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null
        if (!formRef.current?.contains(next)) cancel()
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault()
            cancel()
          }
        }}
        className="w-full outline-none"
      />
    </form>
  )
}
