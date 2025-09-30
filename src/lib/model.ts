import { models, providers } from "@/constants"
import { Model, ProviderId } from "@/types/model"

export function getProvider(providerId?: ProviderId) {
  return providers.find((provider) => provider.id === providerId)
}

export function getProviders() {
  return providers
}

export function getModels(providerId?: ProviderId) {
  if (providerId) {
    return models.filter((model) => getModelProviderId(model) === providerId)
  }

  return models
}

export function getModel(modelId: string) {
  return models.find((model) => model.id === modelId)!
}

export function getModelProvider(model: Model) {
  return providers.find((provider) => provider.id === getModelProviderId(model))!
}

export function getModelProviderId(model: Model) {
  return model.id.split("/")[0]
}
