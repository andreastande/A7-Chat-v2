import { getChats } from "@/db/queries"
import { verifySession } from "@/lib/dal"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar"
import ChatItem from "./items/ChatItem"
import FilesItem from "./items/FilesItem"
import GalleryItem from "./items/GalleryItem"
import HistoryItem from "./items/HistoryItem"
import ProjectsItem from "./items/ProjectsItem"

export default async function AppSidebarContent() {
  const { isAuth, userId } = await verifySession()

  const chats = isAuth ? await getChats(userId) : []

  return (
    <SidebarContent>
      <div data-slot="sidebar-content-wrapper" className="cursor-default">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ChatItem />
              <GalleryItem />
              <FilesItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ProjectsItem />
              <HistoryItem chats={chats} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </SidebarContent>
  )
}
