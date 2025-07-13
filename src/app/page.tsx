import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import ThemeToggle from "@/components/ThemeToggle"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <>
      <AppSidebar variant="inset" collapsible="icon" />
      <SidebarInset className="relative">
        <SidebarTrigger className="absolute top-3 left-3 cursor-pointer" />
        <ThemeToggle className="absolute top-3 right-3 cursor-pointer" />

        <Chat />
      </SidebarInset>
    </>
  )
}
