export type ProviderId = "openai" | "anthropic" | "google" | "xai"

export type Model = {
  id: string
  name: string
  price: {
    inputTokens: number
    outputTokens: number
    cachedInputTokens?: number
  }
  tokenLimits: {
    context: number
  }
}

export type Provider = {
  id: ProviderId
  name: string
  logoPath: string
}
