import { Sidebar, SidebarHeader } from "../ui/sidebar"
import AppSidebarContent from "./AppSidebarContent"
import AppSidebarFooter from "./AppSidebarFooter"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}
