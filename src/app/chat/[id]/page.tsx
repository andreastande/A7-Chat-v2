import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getMessages } from "@/lib/dal/message"
import { ChatNotFoundOrForbiddenError, NotAuthenticatedError } from "@/lib/errors"
import { UIMessage } from "ai"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let initialMessages: UIMessage[] = []
  try {
    initialMessages = await getMessages(id)
  } catch (e) {
    if (e instanceof NotAuthenticatedError) redirect("/login")
    if (e instanceof ChatNotFoundOrForbiddenError) redirect("/")
  }

  return (
    <>
      <AppSidebar collapsible="icon" />
      <main className="bg-sidebar relative w-full">
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />

        <Chat id={id} initialMessages={initialMessages} />
      </main>
    </>
  )
}
