"use client"

import { deleteChat as deleteChatDb } from "@/actions/chat"
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
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod"
import ChatTitleEditor from "./ChatTitleEditor"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
type Chat = z.infer<typeof chatSchema>

export default function ChatEntry({ chat, deleteChat }: { chat: Chat; deleteChat: (id: string) => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(chat.title)

  const activeChatId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined

  const handleDeleteChat = async () => {
    toast.promise(deleteChatDb(chat.id), {
      loading: "Deleting chat…",
      success: () => {
        deleteChat(chat.id)

        if (chat.id === activeChatId) {
          router.push("/")
        }
        return `Chat "${chat.title}" deleted!`
      },
      error: "Couldn't delete chat.",
    })
  }

  return (
    <>
      {isEditingTitle ? (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton isActive>
            <ChatTitleEditor
              chatId={chat.id}
              currentTitle={title}
              setTitle={setTitle}
              closeEditor={() => setIsEditingTitle(false)}
            />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ) : (
        <DropdownMenu>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild isActive={chat.id === activeChatId || isEditingTitle}>
              <Link href={`/chat/${chat.id}`}>
                <span className="whitespace-nowrap">{title}</span>
              </Link>
            </SidebarMenuSubButton>

            <DropdownMenuTrigger asChild>
              <SidebarMenuSubAction
                showOnHover
                className="bg-sidebar-accent text-sidebar-accent-foreground"
                aria-label="Chat options"
              >
                <MoreVertical />
                <span className="sr-only">Chat options</span>
              </SidebarMenuSubAction>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="w-45"
            >
              <DropdownMenuItem>
                <Pin /> Pin
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
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
              <DropdownMenuItem onClick={handleDeleteChat}>
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </SidebarMenuSubItem>
        </DropdownMenu>
      )}
    </>
  )
}
