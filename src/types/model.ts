export const PROVIDERS = ["OpenAI", "Anthropic", "Google", "xAI", "Meta", "DeepSeek"] as const

export type ProviderOptions = (typeof PROVIDERS)[number]

export type CapabilitiesOptions = {
  reasoning?: boolean
  vision?: boolean
  imageGeneration?: boolean
  audio?: boolean
  webSearch?: boolean
}

export type Model = {
  label: string
  provider: ProviderOptions
  modelFamily: string
  description: string
  apiName: string
  price?: {
    input: number
    output: number
  }
  tokenLimits?: {
    input: number
    output: number
  }
  capabilities?: CapabilitiesOptions
}
