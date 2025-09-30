import { changeChatModel } from "@/actions/chat"
import { useModel } from "@/components/providers/ModelProvider"
import { Button } from "@/components/ui/button"
import { getModelProvider } from "@/lib/model"
import { type Model } from "@/types/model"
import { useChatId } from "@ai-sdk-tools/store"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Model({
  model,
  closeModelPicker,
  onHover,
}: {
  model: Model
  closeModelPicker: () => void
  onHover: (model: Model) => void
}) {
  const { selectedModel, setSelectedModel } = useModel()
  const pathname = usePathname()
  const chatId = useChatId()

  const handleSelectModel = async (model: Model) => {
    setSelectedModel(model)
    closeModelPicker()
    if (pathname === `/chat/${chatId}`) {
      await changeChatModel(chatId, model.id) // db
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSelectModel(model)}
      onMouseEnter={() => onHover(model)}
      onMouseLeave={() => onHover(selectedModel)}
      onFocus={() => onHover(model)}
      onBlur={() => onHover(selectedModel)}
      data-selected={model.id === selectedModel.id}
      data-slot="model-option"
      className="data-[selected=true]:bg-accent dark:data-[selected=true]:bg-accent/50 justify-start font-normal"
    >
      <Image
        src={getModelProvider(model).logoPath}
        alt={`${getModelProvider(model).name} logo`}
        width={12}
        height={12}
      />
      {model.name}
    </Button>
  )
}
