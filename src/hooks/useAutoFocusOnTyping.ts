import { RefObject, useEffect } from "react"

function isPrintableKey(e: KeyboardEvent) {
  // single‐character keys only, no modifiers
  return e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey
}

export function useAutoFocusOnTyping(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  onType: (char: string) => void
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.activeElement === textareaRef.current || !isPrintableKey(e)) return

      e.preventDefault()
      textareaRef.current?.focus()
      onType(e.key)
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [textareaRef, onType])
}
