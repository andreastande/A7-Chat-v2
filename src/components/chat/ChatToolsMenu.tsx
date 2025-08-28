import { Paperclip, Plus } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import WithTooltip from "../WithTooltip"

export default function ChatToolsMenu() {
  return (
    <DropdownMenu>
      <WithTooltip content="Add files and more" side="bottom">
        <div>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground dark:data-[state=open]:bg-accent/50 size-8 cursor-pointer"
            >
              <Plus />
              <span className="sr-only">Add files and more</span>
            </Button>
          </DropdownMenuTrigger>
        </div>
      </WithTooltip>
      <DropdownMenuContent side="bottom" align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuItem>
          <Paperclip /> Add photos & files
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-2" />
        <DropdownMenuItem>More later :D</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
