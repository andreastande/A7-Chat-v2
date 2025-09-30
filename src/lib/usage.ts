import { UsageCosts } from "@/types/message"
import { LanguageModelUsage } from "ai"
import { getModel } from "./model"

type BillableToken = "inputTokens" | "outputTokens" | "reasoningTokens" | "cachedInputTokens"

export function computeMessageCostUSD(modelId: string, totalUsage: LanguageModelUsage) {
  const model = getModel(modelId)

  const entries: [BillableToken, number | undefined][] = [
    ["inputTokens", totalUsage.inputTokens],
    ["outputTokens", totalUsage.outputTokens],
    ["reasoningTokens", totalUsage.reasoningTokens],
    ["cachedInputTokens", totalUsage.cachedInputTokens],
  ]

  const costs: UsageCosts = { inputTokens: 0, outputTokens: 0 }

  for (const [tokenType, amount] of entries) {
    if (amount == undefined || amount === 0) continue

    switch (tokenType) {
      case "inputTokens":
        costs.inputTokens = (amount / 1_000_000) * model.price.inputTokens
        break
      case "outputTokens":
        costs.outputTokens = (amount / 1_000_000) * model.price.outputTokens
        break
      case "reasoningTokens":
        costs.reasoningTokens = (amount / 1_000_000) * model.price.outputTokens
        break
      case "cachedInputTokens":
        if (model.price.cachedInputTokens == undefined) {
          throw new Error(`Cached input token price not added to ${model.id} in model registry!`)
        }
        costs.cachedInputTokens = (amount / 1_000_000) * model.price.cachedInputTokens
        break
    }
  }

  return costs
}

export function formatTokenAmount(tokens: number) {
  if (tokens >= 1_000_000) {
    return `${Math.round(tokens / 1_000_000)}M`
  }

  if (tokens >= 1_000) {
    return `${Math.round(tokens / 1_000)}K`
  }

  return tokens.toString()
}
