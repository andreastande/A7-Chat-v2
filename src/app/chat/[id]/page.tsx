import { getChat } from "@/actions/chat"
import { getMessages } from "@/actions/message"
import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { UIMessage } from "ai"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const existingChat = await getChat(id)

  if (existingChat.length === 0) {
    redirect("/") // either does not exist or user not authorized to access it
  }

  const messages = await getMessages(id)

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
