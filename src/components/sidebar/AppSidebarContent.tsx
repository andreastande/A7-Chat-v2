import { getChats } from "@/actions/chat"
import { verifySession } from "@/lib/dal"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar"
import ChatItem from "./items/ChatItem"
import FilesItem from "./items/FilesItem"
import GalleryItem from "./items/GalleryItem"
import HistoryItem from "./items/HistoryItem"
import ProjectsItem from "./items/ProjectsItem"

export default async function AppSidebarContent() {
  const chats = await getChats()
  const { isAuth } = await verifySession()

  return (
    <SidebarContent>
      <div data-slot="sidebar-content-wrapper" className="cursor-default">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ChatItem />
              <ProjectsItem isAuth={isAuth} />
              <GalleryItem isAuth={isAuth} />
              <FilesItem isAuth={isAuth} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <HistoryItem isAuth={isAuth} chats={chats} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </SidebarContent>
  )
}
