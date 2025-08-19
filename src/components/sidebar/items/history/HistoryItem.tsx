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
import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import { ChevronRight, History } from "lucide-react"
import { usePathname } from "next/navigation"
import z from "zod"
import ChatEntry from "./ChatEntry"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
export type Chat = z.infer<typeof chatSchema>

export default function HistoryItem({ chats }: { chats: Chat[] }) {
  const { state } = useSidebar()
  const pathname = usePathname()

  const chatId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined
  const tenMostRecentChats = chats.slice(0, 10)

  return (
    <>
      {state === "expanded" ? (
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <div className="group/sidebar-menu-btn">
              <SidebarMenuButton className="cursor-pointer">
                <History />
                <span className="ml-2 font-medium">History</span>
              </SidebarMenuButton>

              {tenMostRecentChats.length > 0 && (
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="bg-sidebar-accent text-sidebar-accent-foreground left-1 hidden group-hover/sidebar-menu-btn:flex">
                    <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
              )}
            </div>

            {tenMostRecentChats.length > 0 && (
              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
                <SidebarMenuSub>
                  {tenMostRecentChats.map((chat) => (
                    <ChatEntry key={chat.id} chat={chat} />
                  ))}

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="cursor-pointer text-xs font-semibold whitespace-nowrap text-gray-600 hover:bg-transparent active:bg-transparent">
                      See all
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <HoverCard openDelay={150} closeDelay={150}>
          <SidebarMenuItem>
            <HoverCardTrigger asChild>
              <SidebarMenuButton className="cursor-pointer">
                <History />
                <span className="sr-only">Chat history</span>
              </SidebarMenuButton>
            </HoverCardTrigger>

            <HoverCardContent side="right" align="start">
              To be worked on :D
            </HoverCardContent>
          </SidebarMenuItem>
        </HoverCard>
      )}
    </>
  )
}
