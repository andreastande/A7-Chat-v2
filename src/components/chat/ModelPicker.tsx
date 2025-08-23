import { MODELS } from "@/config/models"
import { PROVIDERS } from "@/types/model"
import Image from "next/image"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import WithTooltip from "../WithTooltip"

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
              <DropdownMenuSubContent>
                {MODELS.filter((model) => model.provider === provider).map((model) => (
                  <DropdownMenuItem key={model.label}>
                    <Image
                      src={`/logos/model-families/${model.modelFamily}.svg`}
                      alt={`Model family ${model.modelFamily}`}
                      width={16}
                      height={16}
                    />
                    {model.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
