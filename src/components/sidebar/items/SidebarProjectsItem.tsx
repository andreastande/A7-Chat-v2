"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Folder } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarProjectsItem() {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/project")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href="#">
          <Folder />
          <span className="ml-2">Projects</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
