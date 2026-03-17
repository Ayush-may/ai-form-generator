"use client"

import { memo } from "react"
import { ChatStatus, UIMessage } from "ai"
import MessageMarkdown from "./MessageMarkdown"

type Props = {
    messages: UIMessage[],
    status: ChatStatus
}

const MessageList = memo(({ messages, status }: Props) => {
    console.log("MessageList render")

    return (
        <>
            {messages.map((m) => (
                <MessageMarkdown key={m.id} message={m} status={status} />
            ))}
        </>
    )
})

export default MessageList