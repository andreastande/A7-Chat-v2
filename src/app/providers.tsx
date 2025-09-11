import { ChatHistoryProvider } from "@/components/providers/ChatHistoryProvider"
import { ModelProvider } from "@/components/providers/ModelProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MODELS } from "@/config/models"
import { Chat } from "@/db/schema/chat"
import { getChats } from "@/lib/dal/chat"
import { NotAuthenticatedError } from "@/lib/errors"
import { cookies } from "next/headers"

export default async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const apiName = cookieStore.get("selected_model")?.value ?? "gpt-5-nano"
  const initialModel = MODELS.find((m) => m.apiName === apiName) ?? MODELS.find((m) => m.apiName === "gpt-5-nano")!

  let initialChats: Chat[] = []
  try {
    initialChats = await getChats()
  } catch (e) {
    if (!(e instanceof NotAuthenticatedError)) throw e
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ModelProvider initialModel={initialModel}>
        <ChatHistoryProvider initialChats={initialChats}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ChatHistoryProvider>
      </ModelProvider>
    </SidebarProvider>
  )
}
