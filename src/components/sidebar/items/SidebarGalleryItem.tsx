"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Image } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarGalleryItem() {
  const pathname = usePathname()
  const isActive = pathname.startsWith("/gallery")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href="#">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image />
          <span className="ml-2">Gallery</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
