import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar"
import AppSidebarFooter from "./AppSidebarFooter"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}
