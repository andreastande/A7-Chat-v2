import { getModelProvider } from "@/lib/model"
import { formatTokenAmount } from "@/lib/usage"
import { Model } from "@/types/model"
import Image from "next/image"

export default function ModelInfo({ model }: { model: Model }) {
  return (
    <>
      <div className="mb-2 flex gap-2">
        <Image
          src={getModelProvider(model).logoPath}
          alt={`${getModelProvider(model).name} logo`}
          width={18}
          height={18}
        />
        <div>
          <p className="text-sm font-semibold">{model.name}</p>
          <p className="text-muted-foreground text-[11px]">{getModelProvider(model).name}</p>
        </div>
      </div>
      <div className="[&_p]:text-muted-foreground [&_p]:text-[11px]">
        <div className="space-y-1">
          <div className="flex justify-between">
            <p>Intelligence</p>
            <p className="!text-foreground">5</p>
          </div>
          <div className="flex justify-between">
            <p>Speed</p>
            <p className="!text-foreground">5</p>
          </div>
          <div className="flex justify-between">
            <p>Thinking</p>
            <p className="!text-foreground">High</p>
          </div>
          <div className="flex justify-between">
            <p>Context window</p>
            <p className="!text-foreground">{formatTokenAmount(model.tokenLimits.context)}</p>
          </div>
          <div className="flex justify-between">
            <p>Estimated TPS</p>
            <p className="!text-foreground">50</p>
          </div>
          <div className="flex justify-between">
            <p>Capabilities</p>
            <p className="!text-foreground">Many</p>
          </div>
        </div>

        <hr className="my-1.5" />

        <div className="space-y-1">
          <p className="!text-foreground !text-xs">
            Pricing <span className="text-muted-foreground text-[10px]">(per 1M tokens)</span>
          </p>
          <div className="flex justify-between">
            <p>Input</p>
            <p className="!text-foreground !text-xs">${model.price.inputTokens}</p>
          </div>
          <div className="flex justify-between">
            <p>Output</p>
            <p className="!text-foreground !text-xs">${model.price.outputTokens}</p>
          </div>
          <div className="flex justify-between">
            <p>Cached input</p>
            <p className="!text-foreground !text-xs">${model.price.cachedInputTokens}</p>
          </div>
        </div>
      </div>
    </>
  )
}
