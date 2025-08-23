import { Model } from "@/types/model"

const OPENAI_MODELS: Model[] = [
  {
    label: "GPT 4.1 Nano",
    provider: "OpenAI",
    modelFamily: "GPT",
    description: "Cool model",
    apiName: "gpt-4.1-nano-2025-04-14",
  },
]

const ANTHROPIC_MODELS: Model[] = [
  {
    label: "Claude Sonnet 4",
    provider: "Anthropic",
    modelFamily: "Claude",
    description: "Cool model",
    apiName: "",
  },
]

const GOOGLE_MODELS: Model[] = [
  {
    label: "Gemini 2.5 Flash",
    provider: "Google",
    modelFamily: "Gemini",
    description: "Cool model",
    apiName: "gemini-2.5-flash",
  },
]

const XAI_MODELS: Model[] = [
  {
    label: "Grok 4",
    provider: "xAI",
    modelFamily: "Grok",
    description: "Cool model",
    apiName: "",
  },
]

const META_MODELS: Model[] = [
  {
    label: "Llama 4 Scout",
    provider: "Meta",
    modelFamily: "Llama",
    description: "Cool model",
    apiName: "llama-4-scout",
  },
]

const DEEPSEEK_MODELS: Model[] = [
  {
    label: "DeepSeek R1",
    provider: "DeepSeek",
    modelFamily: "DeepSeek",
    description: "Cool model",
    apiName: "deepseek-r1",
  },
]

// prettier-ignore
export const MODELS: Model[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
  ...XAI_MODELS,
  ...META_MODELS,
  ...DEEPSEEK_MODELS
]
