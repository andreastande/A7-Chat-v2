import { ScrollArea } from "@/components/ui/scroll-area"
import { MODELS_BY_PROVIDER } from "@/config/models"
import { Model, PROVIDERS } from "@/types/model"
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
import { Info } from "lucide-react"
import ModelHoverContent from "./ModelHoverContent"

function ModelList({ models, hoverCardSideOffset }: { models: Model[]; hoverCardSideOffset: number }) {
  const { setModel } = useModel()

  return models.map((model) => (
    <HoverCard key={model.label} openDelay={120} closeDelay={120}>
      <DropdownMenuItem onClick={() => setModel(model)} className="justify-between">
        <div className="flex gap-2">
          <Image
            src={`/logos/model-families/${model.modelFamily}.svg`}
            alt={`Model family ${model.modelFamily}`}
            width={13}
            height={13}
          />
          <span className="text-[13px]">{model.label}</span>
        </div>

        <HoverCardTrigger>
          <Info className="hidden size-3 group-focus/dropdown-menu-item:flex" />
        </HoverCardTrigger>
      </DropdownMenuItem>

      <HoverCardContent side="right" align="start" className="w-80" sideOffset={hoverCardSideOffset} alignOffset={-9}>
        <ModelHoverContent model={model} />
      </HoverCardContent>
    </HoverCard>
  ))
}

export default function ModelPicker() {
  const { model, recentModels } = useModel()

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
            <ModelList models={recentModels} hoverCardSideOffset={18} />
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
                    <ModelList models={MODELS_BY_PROVIDER[provider]} hoverCardSideOffset={30} />
                  </ScrollArea>
                ) : (
                  <ModelList models={MODELS_BY_PROVIDER[provider]} hoverCardSideOffset={18} />
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
