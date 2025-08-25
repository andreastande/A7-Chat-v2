import { ModelProvider } from "@/components/providers/ModelProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MODELS } from "@/config/models"
import { cookies } from "next/headers"

export default async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const apiName = cookieStore.get("selected_model")?.value ?? "gpt-5-nano-2025-08-07"
  const initialModel =
    MODELS.find((m) => m.apiName === apiName) ?? MODELS.find((m) => m.apiName === "gpt-5-nano-2025-08-07")!

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ModelProvider initialModel={initialModel}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </ModelProvider>
    </SidebarProvider>
  )
}
