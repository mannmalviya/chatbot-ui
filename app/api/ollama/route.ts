import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("!!!!route.ts called")

    // Use localhost here since this runs on the server
    const response = await fetch("http://localhost:11434/api/tags", {
      cache: "no-store" // always bypass cache
    })
    if (!response.ok) {
      throw new Error("Ollama server is not responding.")
    }

    const data = await response.json()
    console.log("!!!!route.ts data=", data)

    return NextResponse.json(data)
  } catch (error) {
    console.warn("Error fetching Ollama models: " + error)
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    )
  }
}
