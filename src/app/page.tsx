import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { verifySession } from "@/lib/auth/session"
import { NotAuthenticatedError } from "@/lib/errors"

export default async function Home() {
  let session = undefined
  try {
    session = await verifySession()
  } catch (e) {
    if (!(e instanceof NotAuthenticatedError)) throw e
  }

  return (
    <>
      {session && <AppSidebar collapsible="icon" />}
      <main className="bg-sidebar relative w-full">
        {session && <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />}

        <Chat id={crypto.randomUUID()} isNewChat />
      </main>
    </>
  )
}
