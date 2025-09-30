import { Model } from "@/types/model"

export const anthropicModels: Model[] = [
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.3,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.3,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude Sonnet 3.7",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.3,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude Sonnet 3.5",
    price: {
      inputTokens: 3,
      outputTokens: 15,
      cachedInputTokens: 0.3,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "anthropic/claude-opus-4.1",
    name: "Claude Opus 4.1",
    price: {
      inputTokens: 15,
      outputTokens: 75,
      cachedInputTokens: 1.5,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "anthropic/claude-opus-4",
    name: "Claude Opus 4",
    price: {
      inputTokens: 15,
      outputTokens: 75,
      cachedInputTokens: 1.5,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
]
