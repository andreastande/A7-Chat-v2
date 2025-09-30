"use client"

import { Model } from "@/types/model"
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react"

type ModelContextValue = {
  selectedModel: Model
  setSelectedModel: (m: Model, persist?: boolean) => void
}

const ModelContext = createContext<ModelContextValue | null>(null)

export function ModelProvider({ initialModel, children }: { initialModel: Model; children: ReactNode }) {
  const [selectedModel, _setSelectedModel] = useState(initialModel)

  const setSelectedModel = useCallback((next: Model, persist: boolean = true) => {
    _setSelectedModel(next)
    if (persist) {
      document.cookie = `last_selected_model=${encodeURIComponent(next.id)}; path=/; max-age=${7 * 24 * 60 * 60}`
    }
  }, [])

  const value = useMemo(() => ({ selectedModel, setSelectedModel }), [selectedModel, setSelectedModel])

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}

export function useModel(): ModelContextValue {
  const ctx = useContext(ModelContext)
  if (!ctx) {
    throw new Error("useModel must be used within <ModelProvider2>")
  }
  return ctx
}
