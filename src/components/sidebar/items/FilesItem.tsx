"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { FileText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FilesItem({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/files")

  return (
    <SidebarMenuItem>
      {isAuth ? (
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href="#">
            <FileText />
            <span className="ml-2">Files</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <HoverCard openDelay={300} closeDelay={300}>
          <HoverCardTrigger>
            <SidebarMenuButton disabled>
              <FileText />
              <span className="ml-2">Files</span>
            </SidebarMenuButton>
          </HoverCardTrigger>

          <HoverCardContent side="right" align="start">
            Test
          </HoverCardContent>
        </HoverCard>
      )}
    </SidebarMenuItem>
  )
}
