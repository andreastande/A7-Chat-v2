"use client"

import { MODELS } from "@/config/models"
import type { Model } from "@/types/model"
import * as React from "react"

const MODEL_COOKIE_NAME = "selected_model" // single latest (SSR uses this)
const RECENT_COOKIE_NAME = "recent_models" // CSV of up to 3 apiNames (MRU -> LRU)
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const MAX_RECENT = 3

// fast lookup to resolve apiName -> Model
// TODO: Move into /config/models.ts at bottom
const MODELS_BY_API = new Map(MODELS.map((m) => [m.apiName, m] as const))

type ModelContextValue = {
  model: Model
  recentModels: Model[] // most recent first, up to 3
  setModel: (value: Model | ((prev: Model) => Model)) => void
}

const ModelContext = React.createContext<ModelContextValue | null>(null)

function readCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1]
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}`
}

export function useModel() {
  const ctx = React.useContext(ModelContext)
  if (!ctx) throw new Error("useModel must be used within a ModelProvider.")
  return ctx
}

export function ModelProvider({ initialModel, children }: { initialModel: Model; children: React.ReactNode }) {
  const [model, _setModel] = React.useState<Model>(initialModel)

  // Holds the three most recently used *models* (MRU -> LRU)
  const [recentModels, setRecentModels] = React.useState<Model[]>([initialModel])

  // On mount, hydrate MRU from cookie; ensure `initialModel` is first, dedupe, clamp.
  React.useEffect(() => {
    const raw = readCookie(RECENT_COOKIE_NAME)
    if (!raw) {
      writeCookie(MODEL_COOKIE_NAME, encodeURIComponent(initialModel.apiName))
      writeCookie(RECENT_COOKIE_NAME, encodeURIComponent(initialModel.apiName))
      return
    }

    const parsedApiNames = decodeURIComponent(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const parsedModels = parsedApiNames.map((api) => MODELS_BY_API.get(api)).filter(Boolean) as Model[]

    const merged = [initialModel, ...parsedModels.filter((m) => m.apiName !== initialModel.apiName)].slice(
      0,
      MAX_RECENT
    )

    setRecentModels(merged)
    writeCookie(RECENT_COOKIE_NAME, encodeURIComponent(merged.map((m) => m.apiName).join(",")))
    writeCookie(MODEL_COOKIE_NAME, encodeURIComponent(merged[0].apiName)) // keep single latest for SSR
  }, [initialModel])

  const setModel = React.useCallback((next: Model | ((prev: Model) => Model)) => {
    _setModel((prev) => {
      const resolved = typeof next === "function" ? (next as (p: Model) => Model)(prev) : next

      setRecentModels((prevList) => {
        const merged = [resolved, ...prevList.filter((m) => m.apiName !== resolved.apiName)].slice(0, MAX_RECENT)
        writeCookie(MODEL_COOKIE_NAME, encodeURIComponent(resolved.apiName))
        writeCookie(RECENT_COOKIE_NAME, encodeURIComponent(merged.map((m) => m.apiName).join(",")))
        return merged
      })

      return resolved
    })
  }, [])

  const value = React.useMemo(() => ({ model, recentModels, setModel }), [model, recentModels, setModel])

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}
