"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { History } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarHistoryItem() {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/history")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href="#">
          <History />
          <span className="ml-2">History</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
