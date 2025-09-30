import { useModel } from "@/components/providers/ModelProvider"
import { Model } from "@/types/model"
import { useEffect } from "react"

export function useInitializeModel(initialModel: Model) {
  const { setSelectedModel } = useModel()

  useEffect(() => {
    setSelectedModel(initialModel, false)
  }, [initialModel, setSelectedModel])
}
