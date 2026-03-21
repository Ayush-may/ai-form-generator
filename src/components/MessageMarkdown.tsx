"use client"

import { ChatStatus, UIMessage } from "ai"
import { memo, useMemo } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Segment =
  | { type: "text"; content: string }
  | { type: "code"; lang: string; content: string }

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = []
  let remaining = text

  while (remaining.length > 0) {
    const start = remaining.indexOf("```")

    if (start === -1) {
      segments.push({ type: "text", content: remaining })
      break
    }

    if (start > 0) {
      segments.push({ type: "text", content: remaining.slice(0, start) })
    }

    const end = remaining.indexOf("```", start + 3)

    if (end === -1) {
      segments.push({ type: "text", content: remaining.slice(start) })
      break
    }

    const blockContent = remaining.slice(start + 3, end)
    const newline = blockContent.indexOf("\n")
    const lang = newline !== -1 ? blockContent.slice(0, newline).trim() : ""
    const content = newline !== -1 ? blockContent.slice(newline + 1) : blockContent

    segments.push({ type: "code", lang, content })
    remaining = remaining.slice(end + 3)
  }

  return segments
}

function FormPreview({ json }: { json: string }) {
  try {
    const schema = JSON.parse(json)
    return (
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "12px 0",
        backgroundColor: "#fafafa"
      }}>
        <h2 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "12px" }}>
          {schema.title}
        </h2>
        {schema.fields.map((field: any, i: number) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            {field.type !== "checkbox" && (
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>
                {field.label}
              </label>
            )}
            {field.type === "select" ? (
              <select style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "6px 8px",
                width: "100%",
                fontSize: "14px"
              }}>
                {field.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id={field.name} />
                <label htmlFor={field.name} style={{ fontSize: "14px" }}>
                  {field.label}
                </label>
              </div>
            ) : (
              <input
                type={field.type ?? "text"}
                placeholder={field.placeholder ?? ""}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "6px 8px",
                  width: "100%",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            )}
          </div>
        ))}
      </div>
    )
  } catch {
    return <pre style={{ color: "red", fontSize: "13px" }}>Invalid form JSON</pre>
  }
}

type Props = {
  message: UIMessage
  status: ChatStatus
}

const MessageMarkdown = memo(({ message, status }: Props) => {
  const text = useMemo(() => {
    return message.parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text ?? "")
      .join("")
  }, [message.parts])

  const segments = useMemo(() => parseSegments(text), [text])

  return (
    <div className={`__chat-area-message ${message.role === "user" ? "me" : "ai"}`}>
      {segments.map((segment, i) => {
        if (segment.type === "text") {
          return (
            <Markdown key={i} remarkPlugins={[remarkGfm]}>
              {segment.content}
            </Markdown>
          )
        }

        if (segment.lang === "form") {
          return <FormPreview key={i} json={segment.content} />
        }

        return (
          <pre key={i} style={{
            backgroundColor: "#f4f4f4",
            borderRadius: "6px",
            padding: "12px",
            overflowX: "auto",
            fontSize: "13px"
          }}>
            <code>{segment.content}</code>
          </pre>
        )
      })}
    </div>
  )
})

export default MessageMarkdown