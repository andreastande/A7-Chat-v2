"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronRight, Folder, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProjectsItem() {
  const { state } = useSidebar()
  const pathname = usePathname()

  const isActive = pathname.startsWith("/project")
  const projects = []

  return (
    <SidebarMenuItem>
      {state === "expanded" ? (
        <Collapsible defaultOpen className="group/collapsible">
          <div className="group/sidebar-menu-btn">
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href="#">
                <Folder />
                <span className="ml-2 font-medium">Projects</span>
              </Link>
            </SidebarMenuButton>

            {projects.length > 0 && (
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="bg-sidebar-accent text-sidebar-accent-foreground left-1.5 hidden group-hover/sidebar-menu-btn:flex">
                  <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuAction>
              </CollapsibleTrigger>
            )}

            <SidebarMenuAction className="hidden group-hover/sidebar-menu-btn:flex">
              <Plus />
            </SidebarMenuAction>
          </div>

          {projects.length > 0 && (
            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
              <SidebarMenuSub>
                {/*
                {projects.map((project) => (
                  <SidebarMenuSubItem key={chat.id}>
                    <SidebarMenuSubButton asChild isActive={chat.id === chatId}>
                      <Link href={`/chat/${chat.id}`}>
                        <span className="whitespace-nowrap">{chat.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
                */}

                <SidebarMenuSubItem>
                  <SidebarMenuSubButton className="cursor-pointer text-xs font-semibold whitespace-nowrap text-gray-600 hover:bg-transparent active:bg-transparent">
                    See all
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </Collapsible>
      ) : (
        <HoverCard openDelay={150} closeDelay={150}>
          <HoverCardTrigger asChild>
            <SidebarMenuButton asChild isActive={isActive} className="cursor-pointer">
              <Link href="#">
                <Folder />
                <span className="sr-only">Projects</span>
              </Link>
            </SidebarMenuButton>
          </HoverCardTrigger>

          <HoverCardContent side="right" align="start">
            To be worked on :D
          </HoverCardContent>
        </HoverCard>
      )}
    </SidebarMenuItem>
  )
}
