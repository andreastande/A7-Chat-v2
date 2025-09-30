import { ChatHistoryProvider } from "@/components/providers/ChatHistoryProvider"
import { ModelProvider } from "@/components/providers/ModelProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Chat } from "@/db/schema/chat"
import { getChats } from "@/lib/dal/chat"
import { NotAuthenticatedError } from "@/lib/errors"
import { getModel } from "@/lib/model"
import { cookies } from "next/headers"

export default async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const modelId = cookieStore.get("last_selected_model")?.value ?? "openai/gpt-5-nano"
  const initialModel = getModel(modelId) ?? "openai/gpt-5-nano"

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
