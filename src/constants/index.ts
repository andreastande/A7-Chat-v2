import { Model, Provider } from "@/types/model"
import { anthropicModels } from "./models/anthropic"
import { googleModels } from "./models/google"
import { openaiModels } from "./models/openai"
import { xaiModels } from "./models/xai"

export const models: Model[] = [...openaiModels, ...anthropicModels, ...googleModels, ...xaiModels]

export const providers: Provider[] = [
  {
    id: "openai",
    name: "OpenAI",
    logoPath: "/logos/providers/OpenAI.svg",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logoPath: "/logos/providers/Anthropic.svg",
  },
  {
    id: "google",
    name: "Google",
    logoPath: "/logos/providers/Google.svg",
  },
  {
    id: "xai",
    name: "xAI",
    logoPath: "/logos/providers/xAI.svg",
  },
]
