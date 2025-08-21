import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getUIMessagesInChat, isChatOwnedByUser } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { isAuth, userId } = await verifySession()

  if (!isAuth) {
    redirect("/")
  }

  if (!(await isChatOwnedByUser(userId, id))) {
    // either does not exist or user not authorized to access it
    redirect("/")
  }

  const initialMessages = await getUIMessagesInChat(userId, id)

  return (
    <>
      <AppSidebar collapsible="icon" />
      <main className="bg-sidebar relative w-full">
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />

        <Chat id={id} initialMessages={initialMessages ?? []} />
      </main>
    </>
  )
}
