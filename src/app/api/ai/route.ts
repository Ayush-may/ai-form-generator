export async function POST(req: Request) {

    const { prompt } = await req.json()

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "qwen2.5:3b",
            prompt: prompt
        })
    })

    return new Response(ollamaResponse.body, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}