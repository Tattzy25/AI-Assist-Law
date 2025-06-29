import { groq } from "@ai-sdk/groq"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: groq("llama-3.1-70b-versatile"), // Using available GROQ model
      messages: [
        {
          role: "system",
          content: `You are an expert immigration AI assistant for Paper Trail Assassin. You help people with:

- USCIS forms (I-485, I-130, I-140, N-400, I-589, I-821D, etc.)
- Immigration processes and requirements
- Document preparation and checklists
- Timeline estimates and case status
- Eligibility requirements
- Common mistakes to avoid

Provide accurate, helpful, and specific immigration guidance. Always remind users that for complex cases, they should consult with a qualified immigration attorney.

Keep responses concise but comprehensive. Use bullet points and clear formatting when helpful.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Error processing chat request", { status: 500 })
  }
}
