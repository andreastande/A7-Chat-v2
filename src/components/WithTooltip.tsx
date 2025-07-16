import { Root } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface WithTooltipProps extends React.ComponentProps<typeof Root> {
  content: string
  side?: "top" | "right" | "bottom" | "left"
}

export default function WithTooltip({ children, content, side = "top", ...props }: WithTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  )
}
