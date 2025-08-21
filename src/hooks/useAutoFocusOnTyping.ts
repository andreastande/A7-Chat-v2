import { RefObject, useEffect } from "react"

function isPrintableKey(e: KeyboardEvent) {
  // single‐character keys only, no modifiers
  return e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey
}

// Bail out if the keydown originated in an editable surface
function isEventInEditable(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null
  if (!el) return false
  if (el.closest('input, textarea, [contenteditable=""], [contenteditable="true"], [role="textbox"]')) {
    return true
  }
  return false
}

export function useAutoFocusOnTyping(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  onType: (char: string) => void
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isPrintableKey(e)) return
      if (document.activeElement === textareaRef.current) return
      if (isEventInEditable(e)) return

      e.preventDefault()
      textareaRef.current?.focus()
      onType(e.key)
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [textareaRef, onType])
}
