import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get("sidebar_state")
  const defaultOpen = cookie ? cookie.value === "true" : true

  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
}
