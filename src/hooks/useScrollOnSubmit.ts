import { useChatStatus } from "@ai-sdk-tools/store"
import { useEffect } from "react"

export function useScrollOnSubmit(behavior: ScrollBehavior = "smooth") {
  const status = useChatStatus()

  useEffect(() => {
    if (status === "submitted") {
      window.scrollTo({ top: document.body.scrollHeight, behavior })
    }
  }, [status, behavior])
}
