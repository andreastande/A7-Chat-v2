import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import type { ComponentProps } from "react"

export interface GradientButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean
}

export function GradientButton({ loading = false, className, children, ...buttonProps }: GradientButtonProps) {
  const gradientClasses = loading
    ? "from-blue-300 to-pink-300 hover:from-blue-300 hover:to-pink-300"
    : "from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <Button
        className={cn("w-full bg-gradient-to-r font-semibold text-white transition-colors", gradientClasses, className)}
        {...buttonProps}
      >
        {children}
      </Button>
    </motion.div>
  )
}
