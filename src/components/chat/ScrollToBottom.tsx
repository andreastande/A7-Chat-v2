import { ArrowDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

const SCROLL_THRESHOLD = 80

export default function ScrollToBottom() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const distanceFromBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY)
      setIsVisible(distanceFromBottom > SCROLL_THRESHOLD)
    }

    updateVisibility()

    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility)

    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-0 z-10 mb-38 flex w-full max-w-3xl justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="size-8 cursor-pointer rounded-full"
            >
              <ArrowDown />
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
