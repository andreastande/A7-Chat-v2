import { Model } from "@/types/model"
import { Brain, Eye, Globe, ImageIcon, Mic } from "lucide-react"
import Image from "next/image"

export default function ModelHoverContent({ model }: { model: Model }) {
  const hasCapabilities = Boolean(model.capabilities && Object.values(model.capabilities).some(Boolean))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Image
          src={`/logos/model-families/${model.modelFamily}.svg`}
          alt={`${model.provider} logo`}
          width={18}
          height={18}
        />
        <div>
          <div className="text-sm font-medium">{model.label}</div>
          <div className="text-muted-foreground text-xs">{model.provider}</div>
        </div>
      </div>

      {model.description && <p className="text-muted-foreground text-sm leading-snug">{model.description}</p>}

      {hasCapabilities && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {model.capabilities?.reasoning && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Brain className="size-3.5" /> Reasoning
            </span>
          )}
          {model.capabilities?.vision && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Eye className="size-3.5" /> Vision
            </span>
          )}
          {model.capabilities?.imageGeneration && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <ImageIcon className="size-3.5" /> Image
            </span>
          )}
          {model.capabilities?.audio && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Mic className="size-3.5" /> Audio
            </span>
          )}
          {model.capabilities?.webSearch && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Globe className="size-3.5" /> Web
            </span>
          )}
        </div>
      )}

      {(model.price || model.tokenLimits) && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {model.price && (
            <div className="rounded border p-2">
              <div className="text-muted-foreground mb-2 text-[10px] uppercase">Price</div>
              <div className="space-y-0.5">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">In</span>
                  <div>
                    <span className="font-medium">${model.price.input}</span>
                    <span className="text-muted-foreground text-[8px]"> / 1M</span>
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Out</span>
                  <div>
                    <span className="font-medium">${model.price.output}</span>
                    <span className="text-muted-foreground text-[8px]"> / 1M</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {model.tokenLimits && (
            <div className="rounded border p-2">
              <div className="text-muted-foreground mb-2 text-[10px] uppercase">Token limits</div>
              <div className="space-y-0.5">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">In</span>
                  <span className="font-medium">{model.tokenLimits.input}k</span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Out</span>
                  <span className="font-medium">{model.tokenLimits.output}k</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
