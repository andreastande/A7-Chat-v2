import { ChatHistoryProvider } from "@/components/providers/ChatHistoryProvider"
import { ModelProvider } from "@/components/providers/ModelProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MODELS } from "@/config/models"
import { getChats } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { cookies } from "next/headers"

export default async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const apiName = cookieStore.get("selected_model")?.value ?? "gpt-5-nano"
  const initialModel = MODELS.find((m) => m.apiName === apiName) ?? MODELS.find((m) => m.apiName === "gpt-5-nano")!

  const { isAuth, userId } = await verifySession()
  const initialChats = isAuth ? await getChats(userId) : []

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
