import { LanguageModelUsage, UIMessage as UIMessageAI } from "ai"

export type UsageCosts = {
  inputTokens: number
  outputTokens: number
  reasoningTokens?: number
  cachedInputTokens?: number
}

export type MessageMetadata = {
  model: string
  usage: {
    tokens: LanguageModelUsage
    cost: UsageCosts
  }
}

export type UIMessage = UIMessageAI<MessageMetadata>
