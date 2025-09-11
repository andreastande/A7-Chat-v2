"use client"

import { removeChat as removeChatDB } from "@/actions/chat"
import { useChatHistory } from "@/components/providers/ChatHistoryProvider"
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
import { Chat } from "@/db/schema/chat"
import { Folder, FolderInput, FolderPlus, MoreVertical, PencilLine, Pin, Share, Trash } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ChatTitleEditor from "./ChatTitleEditor"

export default function ChatEntry({ chat }: { chat: Chat }) {
  const { removeChat } = useChatHistory()

  const pathname = usePathname()
  const router = useRouter()

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState(chat.title)

  const activeChatId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined

  const startEditing = () => {
    setDraftTitle(chat.title)
    setIsEditingTitle(true)
  }

  const handleDeleteChat = async () => {
    toast.promise(removeChatDB(chat.id), {
      loading: "Deleting chat…",
      success: () => {
        removeChat(chat.id)

        if (chat.id === activeChatId) {
          router.push("/")
        }
        return `Chat "${chat.title}" deleted!`
      },
      error: "Couldn't delete chat.",
    })
  }

  useEffect(() => {
    if (!isEditingTitle) setDraftTitle(chat.title)
  }, [chat.title, isEditingTitle])

  return (
    <>
      {isEditingTitle ? (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton isActive>
            <ChatTitleEditor
              chatId={chat.id}
              initialTitle={chat.title}
              draftTitle={draftTitle}
              setDraftTitle={setDraftTitle}
              closeEditor={() => setIsEditingTitle(false)}
            />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ) : (
        <DropdownMenu>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild isActive={chat.id === activeChatId || isEditingTitle}>
              <Link href={`/chat/${chat.id}`}>
                <span className="whitespace-nowrap">{chat.title}</span>
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
              <DropdownMenuItem onClick={startEditing}>
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
