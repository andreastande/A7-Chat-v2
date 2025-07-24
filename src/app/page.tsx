import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <>
      <AppSidebar collapsible="icon" />
      <main className="bg-sidebar relative w-full">
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />
        {/* <ThemeToggle className="sticky top-3 mt-3 mr-3 cursor-pointer" /> */}

        <Chat />
      </main>
    </>
  )
}
