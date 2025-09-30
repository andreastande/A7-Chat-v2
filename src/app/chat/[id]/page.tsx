import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getChat } from "@/lib/dal/chat"
import { getMessages } from "@/lib/dal/message"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { getModel } from "@/lib/model"
import { UIMessage } from "@/types/message"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let initialMessages: UIMessage[] = []
  let modelId: string = "openai/gpt-5-nano" // TODO: Default to value stored in cookie?

  try {
    initialMessages = await getMessages(id)
    const chat = await getChat(id)
    if (chat) modelId = chat.model
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
  }

  const initialModel = getModel(modelId)

  return (
    <>
      <AppSidebar collapsible="icon" />
      <main className="bg-sidebar relative w-full">
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 md:hidden" />

        <Chat id={id} initialModel={initialModel} initialMessages={initialMessages} />
      </main>
    </>
  )
}
