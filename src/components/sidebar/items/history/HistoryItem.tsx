"use client"

import { useChatHistory } from "@/components/providers/ChatHistoryProvider"
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
import { Chat } from "@/db/schema/chat"
import { ChevronRight, History } from "lucide-react"
import { useEffect } from "react"
import ChatEntry from "./ChatEntry"

export default function HistoryItem({ serverChats }: { serverChats: Chat[] }) {
  const { state } = useSidebar()
  const { chats, replaceAll } = useChatHistory()

  useEffect(() => {
    replaceAll(serverChats)
  }, [serverChats, replaceAll])

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
