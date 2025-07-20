import { db } from "@/db"
import { chat } from "@/db/schema"
import { verifySession } from "@/lib/dal"
import { and, desc, eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar"
import ChatItem from "./items/ChatItem"
import FilesItem from "./items/FilesItem"
import GalleryItem from "./items/GalleryItem"
import HistoryItem from "./items/HistoryItem"
import ProjectsItem from "./items/ProjectsItem"

export default async function AppSidebarContent() {
  const { user } = await verifySession()

  const cookieStore = await cookies()
  const cookie = cookieStore.get("sidebar_history_collapsible_state")
  const defaultOpen = cookie ? cookie.value === "true" : true

  const chats = await db
    .select()
    .from(chat)
    .where(and(eq(chat.userId, user?.id ?? "")))
    .orderBy(desc(chat.updatedAt))

  return (
    <SidebarContent>
      <div data-slot="sidebar-content-wrapper" className="cursor-default">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ChatItem />
              <ProjectsItem />
              <GalleryItem />
              <FilesItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <HistoryItem defaultOpen={defaultOpen} chats={chats} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </SidebarContent>
  )
}
