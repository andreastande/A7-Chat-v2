import { Toggle } from "@/components/ui/toggle"
import WithTooltip from "@/components/WithTooltip"
import { cn } from "@/lib/utils"
import { type Provider } from "@/types/model"
import Image from "next/image"

export default function Provider({
  provider,
  isSelected,
  onSelectProvider,
}: {
  provider: Provider
  isSelected: boolean
  onSelectProvider: (select: boolean) => void
}) {
  return (
    <WithTooltip key={provider.id} content={provider.name}>
      <Toggle
        pressed={isSelected}
        onPressedChange={onSelectProvider}
        className={cn("size-7 min-w-7 px-0 hover:bg-sky-50", isSelected && "bg-sky-100 hover:bg-sky-100")}
      >
        <Image src={provider.logoPath} alt={`${provider.name} logo`} width={14} height={14} />
        <span className="sr-only">Models from {provider.name}</span>
      </Toggle>
    </WithTooltip>
  )
}
