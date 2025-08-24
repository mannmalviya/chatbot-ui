"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div>
        {/*<ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />*/}
        <Link href="https://www.chelsio.com/">
          <Image
            src={
              theme === "dark"
                ? "/Chelsio_chat_dark.png"
                : "/Chelsio_chat_light.png"
            }
            alt="Chelsio Logo"
            width={1000}
            height={1000}
          />
        </Link>
      </div>

      <div className="mt-2 text-4xl font-bold">Chatbot UI</div>

      <Link
        className="mt-4 flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2 font-semibold"
        href="/login"
      >
        Start Chatting
        <IconArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  )
}
