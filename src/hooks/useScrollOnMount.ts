import { useEffect } from "react"

export function useScrollOnMount(behavior: ScrollBehavior = "instant") {
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior })
  }, [behavior])
}
