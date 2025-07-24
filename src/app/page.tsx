import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { verifySession } from "@/lib/dal"

export default async function Home() {
  const { isAuth } = await verifySession()

  return (
    <>
      {isAuth && <AppSidebar collapsible="icon" />}
      <main className="bg-sidebar relative w-full">
        {isAuth && <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />}

        <Chat />
      </main>
    </>
  )
}
