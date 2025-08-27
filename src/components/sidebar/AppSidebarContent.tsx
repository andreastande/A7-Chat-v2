import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar"
import ChatItem from "./items/ChatItem"
import FilesItem from "./items/FilesItem"
import GalleryItem from "./items/GalleryItem"
import HistoryItem from "./items/history/HistoryItem"
import ProjectsItem from "./items/project/ProjectsItem"

export default function AppSidebarContent() {
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
              <HistoryItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </SidebarContent>
  )
}
