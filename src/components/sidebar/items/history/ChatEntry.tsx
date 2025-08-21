import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuSubAction, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import { Folder, FolderInput, FolderPlus, MoreVertical, PencilLine, Pin, Share, Trash } from "lucide-react"
import Link from "next/link"
import z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
type Chat = z.infer<typeof chatSchema>

export default function ChatEntry({ activeChatId, chat }: { activeChatId?: string; chat: Chat }) {
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
            <span className="sr-only">Chat options</span>
          </SidebarMenuSubAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" align="start" onCloseAutoFocus={(e) => e.preventDefault()} className="w-45">
          <DropdownMenuItem>
            <Pin /> Pin
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share /> Share
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilLine /> Rename
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderInput /> Move to project
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40">
                <DropdownMenuItem>
                  <FolderPlus /> New project
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem>
                  <Folder /> Project 1
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Folder /> Project 2
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator className="mx-2" />
          <DropdownMenuItem>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </SidebarMenuSubItem>
    </DropdownMenu>
  )
}
