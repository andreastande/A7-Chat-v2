import { useModel } from "@/components/providers/ModelProvider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toggle } from "@/components/ui/toggle"
import WithTooltip from "@/components/WithTooltip"
import { getModel, getModelProvider, getModels, getProviders } from "@/lib/model"
import { Model as ModelT, ProviderId } from "@/types/model"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import Model from "./Model"
import ModelInfo from "./ModelInfo"
import Provider from "./Provider"

export default function ModelPicker() {
  const { selectedModel } = useModel()

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<"favorites" | ProviderId | undefined>("favorites")

  const [infoModel, setInfoModel] = useState<ModelT>(selectedModel)

  const handleHover = useCallback((model: ModelT) => {
    setInfoModel(model)
  }, [])

  const toggleModelPicker = (open: boolean) => {
    setOpen(open)
    if (!open) {
      setInfoModel(selectedModel)
      setTimeout(() => setFilter("favorites"), 100)
    }
  }

  const closeModelPicker = () => toggleModelPicker(false) // TODO: useCallback?

  return (
    <Popover open={open} onOpenChange={toggleModelPicker}>
      <WithTooltip content="Select model" side="bottom" open={open ? false : undefined}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Select model, current: ${selectedModel.name}`}
            className="font-normal"
          >
            <Image
              src={getModelProvider(selectedModel).logoPath}
              alt={`${getModelProvider(selectedModel).name} logo`}
              width={16}
              height={16}
            />
            {selectedModel.name}
          </Button>
        </PopoverTrigger>
      </WithTooltip>

      <PopoverContent
        side="bottom"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="grid h-70 w-100 grid-cols-2 divide-x !p-0"
      >
        <div className="divide-y">
          <div className="flex h-10 items-center justify-between p-1.5">
            <Toggle
              pressed={filter === "favorites"}
              onPressedChange={(pressed) => (pressed ? setFilter("favorites") : setFilter(undefined))}
              className="hover:text-accent-foreground mr-4 size-7 min-w-7 px-0 hover:bg-sky-50 data-[state=on]:bg-sky-100"
            >
              <Heart className="size-3.5" />
              <span className="sr-only">Your favorite models</span>
            </Toggle>
            <div className="flex space-x-0.5">
              {getProviders().map((provider) => (
                <Provider
                  key={provider.id}
                  provider={provider}
                  isSelected={provider.id === filter}
                  onSelectProvider={(select) => (select ? setFilter(provider.id) : setFilter(undefined))}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <ScrollArea className="h-60 pb-0.5">
              <div className="flex flex-col space-y-0.25 p-1.5">
                {filter === "favorites" ? (
                  <>
                    <Model model={getModel("openai/gpt-5")} closeModelPicker={closeModelPicker} onHover={handleHover} />
                    <Model
                      model={getModel("anthropic/claude-sonnet-4.5")}
                      closeModelPicker={closeModelPicker}
                      onHover={handleHover}
                    />
                    <Model
                      model={getModel("google/gemini-2.5-flash")}
                      closeModelPicker={closeModelPicker}
                      onHover={handleHover}
                    />
                    <Model model={getModel("xai/grok-4")} closeModelPicker={closeModelPicker} onHover={handleHover} />
                  </>
                ) : (
                  getModels(filter).map((model) => (
                    <Model key={model.id} model={model} closeModelPicker={closeModelPicker} onHover={handleHover} />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="p-3">
          <ModelInfo model={infoModel} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
