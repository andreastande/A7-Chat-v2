import { Model } from "@/types/model"

const OPENAI_MODELS: Model[] = [
  {
    label: "GPT-5",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "OpenAI's flagship reasoning model, designed for highly complex problem solving, analysis, and creative tasks with top-tier accuracy.",
    apiName: "gpt-5",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 1.25,
      output: 10,
    },
    tokenLimits: {
      input: 272,
      output: 128,
    },
  },
  {
    label: "GPT-5 mini",
    provider: "OpenAI",
    modelFamily: "GPT",
    description: "A smaller, faster version of GPT-5, balancing reasoning ability with much lower cost and latency.",
    apiName: "gpt-5-mini",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 0.25,
      output: 2,
    },
    tokenLimits: {
      input: 272,
      output: 128,
    },
  },
  {
    label: "GPT-5 nano",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "The most lightweight GPT-5 variant, optimized for speed and affordability while still offering solid reasoning.",
    apiName: "gpt-5-nano",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 0.05,
      output: 0.4,
    },
    tokenLimits: {
      input: 272,
      output: 128,
    },
  },
  {
    label: "GPT-4o",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "The first multimodal “omni” model from OpenAI, capable of handling text, vision, and audio seamlessly in real time.",
    apiName: "gpt-4o",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 2.5,
      output: 10,
    },
    tokenLimits: {
      input: 112,
      output: 16,
    },
  },
  {
    label: "GPT-4.1",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "A refined GPT-4 series model with improved performance, efficiency, and broader context handling compared to GPT-4o.",
    apiName: "gpt-4.1",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 2,
      output: 8,
    },
    tokenLimits: {
      input: 968,
      output: 32,
    },
  },
  {
    label: "o3 Pro",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "An advanced reasoning model specialized for deeply analytical, structured, and multi-step problem solving.",
    apiName: "o3-pro",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 20,
      output: 80,
    },
    tokenLimits: {
      input: 100,
      output: 100,
    },
  },
  {
    label: "o3",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "A lighter variant of the o-series reasoning models, offering strong reasoning ability at lower cost and speed.",
    apiName: "o3",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 2,
      output: 8,
    },
    tokenLimits: {
      input: 100,
      output: 100,
    },
  },
  {
    label: "o4-mini",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "A compact next-gen model focused on efficiency, offering good reasoning capabilities with low latency and cost.",
    apiName: "o4-mini",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 1.1,
      output: 4.4,
    },
    tokenLimits: {
      input: 100,
      output: 100,
    },
  },
  {
    label: "GPT Image 1",
    provider: "OpenAI",
    modelFamily: "GPT",
    description:
      "OpenAI's text-to-image model, generating detailed, high-quality images from natural language prompts.",
    apiName: "gpt-image-1",
    capabilities: {
      reasoning: true,
      webSearch: true,
    },
    price: {
      input: 5,
      output: 40,
    },
  },
]

const ANTHROPIC_MODELS: Model[] = [
  {
    label: "Claude Sonnet 4",
    provider: "Anthropic",
    modelFamily: "Claude",
    description: "Cool model",
    apiName: "claude-sonnet-4",
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
    apiName: "grok-4",
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

export const MODELS_BY_PROVIDER = MODELS.reduce<Record<string, typeof MODELS>>(
  (acc, m) => {
    ;(acc[m.provider] ??= []).push(m)
    return acc
  },
  {} as Record<string, typeof MODELS>
)
