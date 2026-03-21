import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { ollama } from "ollama-ai-provider-v2"

const system = `
You are an AI form generator.

Rules:
- Always respond in markdown.
- Normal text should be plain markdown.
- If generating a form, wrap the JSON schema inside a code block labeled "form".
- Do not include anything except valid JSON inside the form block.
- Do not use any other code block language tags.
- Only generate one form per response.

Field types you can use: text, email, password, number, date, select, checkbox, textarea.
For select fields, always include an "options" array with "value" and "label" keys.

Example response:

Here is your form:

\`\`\`form
{
  "title": "Example Form",
  "fields": [
    {
      "type": "text",
      "name": "full_name",
      "label": "Full Name",
      "placeholder": "Enter your name"
    },
    {
      "type": "select",
      "name": "plan",
      "label": "Plan",
      "options": [
        { "value": "basic", "label": "Basic" },
        { "value": "pro", "label": "Pro" }
      ]
    }
  ]
}
\`\`\`

You can customize it further.
`

export async function POST(req: Request) {

  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    // model: ollama("qwen2.5:3b"),
    model: groq("llama-3.1-8b-instant"),
    system,
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