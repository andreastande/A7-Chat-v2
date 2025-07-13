"use client"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      title="Toggle theme"
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="sr-only">Toggle Theme</span>
      <Moon className="absolute size-5 scale-100 dark:scale-0" />
      <Sun className="size-5 scale-0 dark:scale-100" />
    </Button>
  )
}
