import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuSubAction, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
type Chat = z.infer<typeof chatSchema>

export default function ChatEntry({ activeChatId, chat }: { activeChatId?: string; chat: Chat }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  return (
    <DropdownMenu>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={chat.id === activeChatId} className="peer/sidebar-menu-sub-button">
          <Link href={`/chat/${chat.id}`}>
            <span className="whitespace-nowrap">{chat.title}</span>
          </Link>
        </SidebarMenuSubButton>

        <DropdownMenuTrigger asChild>
          <SidebarMenuSubAction showOnHover className="bg-sidebar-accent text-sidebar-accent-foreground">
            <MoreVertical />
          </SidebarMenuSubAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </SidebarMenuSubItem>
    </DropdownMenu>
  )
}
