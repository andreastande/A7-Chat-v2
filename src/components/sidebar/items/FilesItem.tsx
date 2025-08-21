"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { FileText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FilesItem() {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/files")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href="#">
          <FileText />
          <span className="ml-2 font-medium">Files</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
