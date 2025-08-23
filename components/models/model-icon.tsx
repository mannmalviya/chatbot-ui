import { cn } from "@/lib/utils"
import mistral from "@/public/providers/mistral.png"
import groq from "@/public/providers/groq.png"
import perplexity from "@/public/providers/perplexity.png"
import { ModelProvider } from "@/types"
import { IconSparkles } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "../icons/anthropic-svg"
import { GoogleSVG } from "../icons/google-svg"
import { OpenAISVG } from "../icons/openai-svg"

import deepseek from "@/public/models/deepseek-color.png"
import gemma from "@/public/models/gemma-color.png"
// ... other model logos

const OLLAMA_MODEL_ICONS = {
  "deepseek-r1:32b": deepseek,
  "deepseek-r1:14b": deepseek,
  "gemma3:12b": gemma
  // ... other model mappings
}

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: ModelProvider
  modelId?: string // Added this prop
  height: number
  width: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  modelId,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as ModelProvider) {
    case "ollama":
      const modelIcon =
        OLLAMA_MODEL_ICONS[modelId as keyof typeof OLLAMA_MODEL_ICONS]
      if (modelIcon) {
        return (
          <Image
            className={cn(
              "rounded-sm p-1",
              theme === "dark" ? "bg-black" : "bg-white"
            )}
            src={modelIcon.src}
            alt={modelId || "Ollama model"}
            width={width}
            height={height}
          />
        )
      }
      return //<IconSparkles size={width} />  // fallback for ollama case
    case "openai":
      return (
        <OpenAISVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "mistral":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={mistral.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    case "groq":
      return (
        <Image
          className={cn(
            "rounded-sm p-0",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={groq.src}
          alt="Groq"
          width={width}
          height={height}
        />
      )
    case "anthropic":
      return (
        <AnthropicSVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "google":
      return (
        <GoogleSVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "perplexity":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={perplexity.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    default:
      return <IconSparkles size={width} />
  }
}
