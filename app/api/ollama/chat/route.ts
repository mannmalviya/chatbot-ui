import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract relevant data for your RAG pipeline
    const { model, messages, options } = body

    // Format for your custom RAG API
    const ragPayload = {
      userQuery: messages[messages.length - 1]?.content || "",
      conversationHistory: messages.slice(0, -1), // All messages except the last one
      selectedModel: model,
      temperature: options?.temperature
    }

    // Send to your custom RAG pipeline instead of Ollama
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ragPayload)
    })

    if (!response.ok) {
      throw new Error("RAG pipeline is not responding.")
    }

    // Return the streaming response from your RAG pipeline
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked"
      }
    })
  } catch (error) {
    console.error("Error in RAG pipeline API:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}
