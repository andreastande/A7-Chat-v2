"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Image } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function GalleryItem({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/gallery")

  return (
    <SidebarMenuItem>
      {isAuth ? (
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href="#">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image />
            <span className="ml-2">Gallery</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <HoverCard openDelay={300} closeDelay={300}>
          <HoverCardTrigger>
            <SidebarMenuButton disabled>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image />
              <span className="ml-2">Gallery</span>
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
