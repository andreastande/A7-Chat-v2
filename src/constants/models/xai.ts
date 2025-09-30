import { Model } from "@/types/model"

export const xaiModels: Model[] = [
  {
    id: "xai/grok-4",
    name: "Grok 4",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.75,
    },
    tokenLimits: {
      context: 256_000,
    },
  },
  {
    id: "xai/grok-4-fast-reasoning",
    name: "Grok 4 Fast",
    price: {
      inputTokens: 0.2,
      outputTokens: 0.5,
      cachedInputTokens: 0.05,
    },
    tokenLimits: {
      context: 2_000_000,
    },
  },
  {
    id: "xai/grok-code-fast-1",
    name: "Grok Code Fast 1",
    price: {
      inputTokens: 0.2,
      outputTokens: 1.5,
      cachedInputTokens: 0.02,
    },
    tokenLimits: {
      context: 256_000,
    },
  },
  {
    id: "xai/grok-3",
    name: "Grok 3",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.75,
    },
    tokenLimits: {
      context: 131_000,
    },
  },
  {
    id: "xai/grok-3-mini",
    name: "Grok 3 Mini",
    price: {
      inputTokens: 0.3,
      outputTokens: 0.5,
      cachedInputTokens: 0.075,
    },
    tokenLimits: {
      context: 131_000,
    },
  },
]
