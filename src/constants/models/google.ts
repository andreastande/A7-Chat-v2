import { Model } from "@/types/model"

export const googleModels: Model[] = [
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    price: {
      inputTokens: 2.5,
      outputTokens: 10,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    price: {
      inputTokens: 0.3,
      outputTokens: 2.5,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "google/gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    price: {
      inputTokens: 0.1,
      outputTokens: 0.4,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "google/gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    price: {
      inputTokens: 0.15,
      outputTokens: 0.6,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "google/gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    price: {
      inputTokens: 0.07,
      outputTokens: 0.3,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
  {
    id: "google/gemini-2.5-flash-image-preview",
    name: "Gemini 2.5 Flash Image",
    price: {
      inputTokens: 0.3,
      outputTokens: 2.5,
    },
    tokenLimits: {
      context: 1_000_000,
    },
  },
]
