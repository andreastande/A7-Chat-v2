import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <>
      <AppSidebar variant="inset" collapsible="icon" />
      <SidebarInset>
        <SidebarTrigger className="sticky top-3 mt-3 ml-3 cursor-pointer md:hidden" />
        {/* <ThemeToggle className="sticky top-3 mt-3 mr-3 cursor-pointer" /> */}

        <Chat />
      </SidebarInset>
    </>
  )
}
