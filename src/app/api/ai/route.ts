import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { ollama } from "ollama-ai-provider-v2"

export async function POST(req: Request) {

    const { messages }: { messages: UIMessage[] } = await req.json()

    const result = streamText({
        // model: ollama("qwen2.5:3b"),
        model: groq("llama-3.1-8b-instant"),
        system: 'return data in markdown format!',
        messages: await convertToModelMessages(messages)
    })

    return result.toUIMessageStreamResponse();
}


/**
 * old code and working
 */
// export async function POST(req: Request) {

//     const { messages } = await req.json()

//     const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "qwen2.5:3b",
//             messages: messages,
//             stream: true
//         })
//     })

//     return new Response(ollamaResponse.body, {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// }