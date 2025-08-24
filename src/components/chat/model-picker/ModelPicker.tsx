import { ScrollArea } from "@/components/ui/scroll-area"
import { MODELS_BY_PROVIDER } from "@/config/models"
import { PROVIDERS } from "@/types/model"
import Image from "next/image"
import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import WithTooltip from "../../WithTooltip"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import ModelHoverContent from "./ModelHoverContent"

function ModelList({ provider, hoverCardSideOffset }: { provider: string; hoverCardSideOffset: number }) {
  return MODELS_BY_PROVIDER[provider].map((model) => (
    <HoverCard key={model.label} openDelay={120} closeDelay={120}>
      <HoverCardTrigger asChild>
        <DropdownMenuItem>
          <Image
            src={`/logos/model-families/${model.modelFamily}.svg`}
            alt={`Model family ${model.modelFamily}`}
            width={13}
            height={13}
          />
          <span className="text-[13px]">{model.label}</span>
        </DropdownMenuItem>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="center" className="w-80" sideOffset={hoverCardSideOffset}>
        <ModelHoverContent model={model} />
      </HoverCardContent>
    </HoverCard>
  ))
}

export default function ModelPicker() {
  return (
    <DropdownMenu>
      <WithTooltip content="Select model" side="bottom">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Select model, current: 4.1 Nano"
            className="cursor-pointer font-normal"
          >
            <Image src="/logos/providers/OpenAI.svg" alt="OpenAI Logo" width={16} height={16} />
            GPT 4.1 Nano
          </Button>
        </DropdownMenuTrigger>
      </WithTooltip>

      <DropdownMenuContent side="bottom" align="start" onCloseAutoFocus={(e) => e.preventDefault()} className="w-40">
        {PROVIDERS.map((provider) => (
          <DropdownMenuSub key={provider}>
            <DropdownMenuSubTrigger>
              {provider === "xAI" ? (
                <div className="size-4">
                  <Image src={`/logos/providers/${provider}.svg`} alt={`${provider} logo`} width={12.5} height={12.5} />
                </div>
              ) : (
                <Image src={`/logos/providers/${provider}.svg`} alt={`${provider} logo`} width={16} height={16} />
              )}
              {provider}
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-50">
                {MODELS_BY_PROVIDER[provider].length > 4 ? (
                  <ScrollArea className="h-35 pr-3">
                    <ModelList provider={provider} hoverCardSideOffset={22} />
                  </ScrollArea>
                ) : (
                  <ModelList provider={provider} hoverCardSideOffset={10} />
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
