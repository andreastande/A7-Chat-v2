import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar"
import SidebarChatItem from "./items/SidebarChatItem"
import SidebarFilesItem from "./items/SidebarFilesItem"
import SidebarGalleryItem from "./items/SidebarGalleryItem"
import SidebarHistoryItem from "./items/SidebarHistoryItem"
import SidebarProjectsItem from "./items/SidebarProjectsItem"

export default function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="cursor-default">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarChatItem />
            <SidebarProjectsItem />
            <SidebarGalleryItem />
            <SidebarFilesItem />
            <SidebarHistoryItem />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
