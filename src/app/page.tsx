import AppSidebar from "@/components/AppSidebar"
import Chat from "@/components/chat/Chat"
import { SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Chat />
      </SidebarInset>
    </>
  )
}
