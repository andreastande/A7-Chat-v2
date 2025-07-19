import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { db } from "@/db"
import { chat, message } from "@/db/schema"
import { verifySession } from "@/lib/dal"
import { UIMessage } from "ai"
import { and, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { user } = await verifySession()

  const existingChat = await db
    .select({
      userId: chat.userId,
      model: chat.model,
    })
    .from(chat)
    .where(and(eq(chat.userId, user?.id ?? ""), eq(chat.id, id)))
    .limit(1)

  if (existingChat.length === 0) {
    redirect("/") // either does not exist or user not authorized to access it
  }

  const messages = await db
    .select({
      uiMessage: message.uiMessage,
    })
    .from(message)
    .where(eq(message.chatId, id))

  const initialMessages = messages.map(({ uiMessage }) => uiMessage as UIMessage)

  return (
    <>
      <AppSidebar variant="inset" collapsible="icon" />
      <SidebarInset>
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />
        {/* <ThemeToggle className="sticky top-3 mt-3 mr-3 cursor-pointer" /> */}

        <Chat id={id} initialMessages={initialMessages} />
      </SidebarInset>
    </>
  )
}
