import { verifySession } from "@/lib/auth/session"
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "../ui/sidebar"
import ProfilePicture from "./ProfilePicture"

export default async function AppSidebarFooter() {
  const { user } = await verifySession()

  return (
    <SidebarFooter className="flex h-16 items-center space-x-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <ProfilePicture user={user} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
