import { Model } from "@/types/model"

export const openaiModels: Model[] = [
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    price: {
      inputTokens: 1.25,
      outputTokens: 10,
      cachedInputTokens: 0.125,
    },
    tokenLimits: {
      context: 400_000,
    },
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 mini",
    price: {
      inputTokens: 0.25,
      outputTokens: 2,
      cachedInputTokens: 0.025,
    },
    tokenLimits: {
      context: 400_000,
    },
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 nano",
    price: {
      inputTokens: 0.05,
      outputTokens: 0.4,
      cachedInputTokens: 0.005,
    },
    tokenLimits: {
      context: 400_000,
    },
  },
  {
    id: "openai/o4-mini",
    name: "o4-mini",
    price: {
      inputTokens: 1.1,
      outputTokens: 4.4,
      cachedInputTokens: 0.275,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "openai/o3",
    name: "o3",
    price: {
      inputTokens: 2,
      outputTokens: 8,
      cachedInputTokens: 0.5,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "openai/o3-mini",
    name: "o3-mini",
    price: {
      inputTokens: 1.1,
      outputTokens: 4.4,
      cachedInputTokens: 0.55,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    price: {
      inputTokens: 2.5,
      outputTokens: 10,
      cachedInputTokens: 1.25,
    },
    tokenLimits: {
      context: 128_000,
    },
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o mini",
    price: {
      inputTokens: 0.15,
      outputTokens: 0.6,
      cachedInputTokens: 0.075,
    },
    tokenLimits: {
      context: 200_000,
    },
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    price: {
      inputTokens: 2,
      outputTokens: 8,
      cachedInputTokens: 0.5,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 mini",
    price: {
      inputTokens: 0.5,
      outputTokens: 1.6,
      cachedInputTokens: 0.1,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 nano",
    price: {
      inputTokens: 0.1,
      outputTokens: 0.4,
      cachedInputTokens: 0.025,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
]
