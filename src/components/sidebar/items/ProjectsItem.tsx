"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Folder } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProjectsItem({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/project")

  return (
    <SidebarMenuItem>
      {isAuth ? (
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href="#">
            <Folder />
            <span className="ml-2">Projects</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <HoverCard openDelay={300} closeDelay={300}>
          <HoverCardTrigger>
            <SidebarMenuButton disabled>
              <Folder />
              <span className="ml-2">Projects</span>
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
