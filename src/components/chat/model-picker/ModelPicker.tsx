import { ScrollArea } from "@/components/ui/scroll-area"
import { MODELS_BY_PROVIDER } from "@/config/models"
import { PROVIDERS } from "@/types/model"
import Image from "next/image"
import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import WithTooltip from "../../WithTooltip"

import { useModel } from "@/components/providers/ModelProvider"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import ModelHoverContent from "./ModelHoverContent"

function ModelList({ provider, hoverCardSideOffset }: { provider: string; hoverCardSideOffset: number }) {
  const { setModel } = useModel()

  return MODELS_BY_PROVIDER[provider].map((model) => (
    <HoverCard key={model.label} openDelay={120} closeDelay={120}>
      <HoverCardTrigger asChild>
        <DropdownMenuItem onClick={() => setModel(model)}>
          <Image
            src={`/logos/model-families/${model.modelFamily}.svg`}
            alt={`Model family ${model.modelFamily}`}
            width={13}
            height={13}
          />
          <span className="text-[13px]">{model.label}</span>
        </DropdownMenuItem>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" className="w-80" sideOffset={hoverCardSideOffset}>
        <ModelHoverContent model={model} />
      </HoverCardContent>
    </HoverCard>
  ))
}

export default function ModelPicker() {
  const { model, recentModels, setModel } = useModel()

  return (
    <DropdownMenu>
      <WithTooltip content="Select model" side="bottom">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Select model, current: ${model.label}`}
            className="cursor-pointer font-normal"
          >
            <Image
              src={`/logos/model-families/${model.modelFamily}.svg`}
              alt={`${model.modelFamily} logo`}
              width={16}
              height={16}
            />
            {model.label}
          </Button>
        </DropdownMenuTrigger>
      </WithTooltip>

      <DropdownMenuContent side="bottom" align="start" onCloseAutoFocus={(e) => e.preventDefault()} className="w-54">
        {recentModels.length > 1 && (
          <>
            <DropdownMenuLabel>Recently used</DropdownMenuLabel>
            {recentModels.map((model) => (
              <DropdownMenuItem key={model.label} onClick={() => setModel(model)}>
                <Image
                  src={`/logos/model-families/${model.modelFamily}.svg`}
                  alt={`Model family ${model.modelFamily}`}
                  width={13}
                  height={13}
                />
                <span className="text-[13px]">{model.label}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="mx-2" />
            <DropdownMenuLabel>Providers</DropdownMenuLabel>
          </>
        )}

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
