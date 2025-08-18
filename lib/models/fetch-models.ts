import { Tables } from "@/supabase/types"
import { LLM, LLMID, OpenRouterLLM } from "@/types"
import { toast } from "sonner"
import { LLM_LIST_MAP } from "./llm/llm-list"

export const fetchHostedModels = async (profile: Tables<"profiles">) => {
  // Return empty list (disables all cloud-hosted models)
  return {
    envKeyMap: {}, // No environment keys in use
    hostedModels: [] // No models from OpenAI/Anthropic/etc.
  }
}
/*
export const fetchOllamaModels = async () => {
  console.log("!!!!!!!!!!!!!!!NEXT_PUBLIC_OLLAMA_URL:", process.env.NEXT_PUBLIC_OLLAMA_URL);
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OLLAMA_URL + "/api/tags"
    )
    console.log("!!!!!!!!!!!!!!!NEXT_PUBLIC_OLLAMA_URL:", process.env.NEXT_PUBLIC_OLLAMA_URL);

    if (!response.ok) {
      throw new Error(`Ollama server is not responding.`)
    }

    const data = await response.json()
    console.log("!!!!!!!DATA", data);

    const localModels: LLM[] = data.models.map((model: any) => ({
      modelId: model.name as LLMID,
      modelName: model.name,
      provider: "ollama",
      hostedId: model.name,
      platformLink: "https://ollama.ai/library",
      imageInput: false
    }))

    return localModels
  } catch (error) {
    console.warn("Error fetching Ollama models: " + error)
  }
}
*/

export const fetchOllamaModels = async () => {
  console.log("!!!!!!!!!!!!!!!Start of fetchOllamaModels function:")
  try {
    const response = await fetch("/api/ollama")

    if (!response.ok) {
      throw new Error("Ollama server is not responding.")
    }

    const data = await response.json()
    console.log("!!!!!!!DATA", data)

    const localModels: LLM[] = data.models.map((model: any) => ({
      modelId: model.name as LLMID,
      modelName: model.name,
      provider: "ollama",
      hostedId: model.name,
      platformLink: "https://ollama.ai/library",
      imageInput: false
    }))

    return localModels
  } catch (error) {
    console.warn("Error fetching Ollama models: " + error)
  }
}

export const fetchOpenRouterModels = async () => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models")

    if (!response.ok) {
      throw new Error(`OpenRouter server is not responding.`)
    }

    const { data } = await response.json()

    const openRouterModels = data.map(
      (model: {
        id: string
        name: string
        context_length: number
      }): OpenRouterLLM => ({
        modelId: model.id as LLMID,
        modelName: model.id,
        provider: "openrouter",
        hostedId: model.name,
        platformLink: "https://openrouter.dev",
        imageInput: false,
        maxContext: model.context_length
      })
    )

    return openRouterModels
  } catch (error) {
    console.error("Error fetching Open Router models: " + error)
    toast.error("Error fetching Open Router models: " + error)
  }
}
