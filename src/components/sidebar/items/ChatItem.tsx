"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SquarePen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ChatItem() {
  const pathname = usePathname()
  const isActive = pathname === "/" || pathname.startsWith("/chat/")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href="/">
          <SquarePen />
          <span className="ml-2">Chat</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
