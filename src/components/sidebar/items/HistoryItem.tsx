"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import { History } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import z from "zod"
import HistoryCommandDialog from "../HistoryCommandDialog"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
export type Chat = z.infer<typeof chatSchema>

export default function HistoryItem({ isAuth, chats }: { isAuth: boolean; chats: Chat[] }) {
  const { state } = useSidebar()
  const pathname = usePathname()
  const [commandDialogOpen, setCommandDialogOpen] = useState(false)

  const chatId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined
  const tenMostRecentChats = chats.slice(0, 10)

  return (
    <SidebarMenuItem>
      {isAuth ? (
        <>
          {state === "expanded" ? (
            <>
              <SidebarMenuButton className="cursor-pointer" onClick={() => setCommandDialogOpen(true)}>
                <History />
                <span className="ml-2">History</span>
              </SidebarMenuButton>

              {tenMostRecentChats.length > 0 && (
                <SidebarMenuSub className="py-1">
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
              )}
            </>
          ) : (
            <HoverCard openDelay={300} closeDelay={300}>
              <HoverCardTrigger>
                <SidebarMenuButton className="cursor-pointer" onClick={() => setCommandDialogOpen(true)}>
                  <History />
                  <span className="sr-only">Chat history</span>
                </SidebarMenuButton>
              </HoverCardTrigger>

              <HoverCardContent side="right" align="start">
                To be worked on :D
              </HoverCardContent>
            </HoverCard>
          )}
          <HistoryCommandDialog open={commandDialogOpen} setOpen={setCommandDialogOpen} />
        </>
      ) : (
        <HoverCard openDelay={300} closeDelay={300}>
          <HoverCardTrigger>
            <SidebarMenuButton disabled>
              <History />
              <span className="ml-2">History</span>
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
