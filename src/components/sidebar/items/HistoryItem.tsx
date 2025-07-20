"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import { ChevronDown, History } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
export type Chat = z.infer<typeof chatSchema>

export default function HistoryItem({ defaultOpen = true, chats }: { defaultOpen?: boolean; chats: Chat[] }) {
  const { state } = useSidebar()
  const pathname = usePathname()

  const chatId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined

  const tenMostRecentChats = chats.slice(0, 10)

  return (
    <>
      {state === "expanded" ? (
        <Collapsible
          defaultOpen={defaultOpen}
          onOpenChange={(open) => {
            document.cookie = `${"sidebar_history_collapsible_state"}=${open}; path=/; max-age=${60 * 60 * 24 * 7}`
          }}
          className="group/collapsible"
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="group/sidebar-menu-button cursor-pointer">
              <History />
              <span className="ml-2">History</span>
              <ChevronDown className="ml-auto hidden transition-transform group-hover/sidebar-menu-button:block group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
            <SidebarMenuSub>
              {tenMostRecentChats.map((chat) => (
                <SidebarMenuSubItem key={chat.id}>
                  <SidebarMenuSubButton asChild isActive={chat.id === chatId}>
                    <Link href={`/chat/${chat.id}`}>
                      <span className="whitespace-nowrap">{chat.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <HoverCard openDelay={150} closeDelay={150}>
          <HoverCardTrigger>
            <SidebarMenuButton className="cursor-pointer">
              <History />
            </SidebarMenuButton>
          </HoverCardTrigger>

          <HoverCardContent side="right" align="start">
            To be worked on :D
          </HoverCardContent>
        </HoverCard>
      )}
    </>
  )
}
