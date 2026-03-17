"use client"

import { ChatStatus, UIMessage, UIMessagePart } from "ai"
import { memo, useMemo } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
    message: UIMessage,
    status: ChatStatus
}

const MessageMarkdown = memo(({ message, status }: Props) => {

    const text = useMemo(() => {
        return message.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text ?? "")
            .join("")
    }, [message.parts])

    const isStreaming = status === "streaming"

    return (
        <div
            className={`__chat-area-message ${message.role === "user" ? "me" : "ai"}`}
        >
            <Markdown remarkPlugins={[remarkGfm]}>
                {text}
            </Markdown>
        </div>
    )
})

export default MessageMarkdown