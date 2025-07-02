import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  )
}
