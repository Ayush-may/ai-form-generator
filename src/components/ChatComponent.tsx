"use client"
import React, { memo, useEffect, useRef, useState } from 'react'
import "@/styles/ChatComponent.css"
import { BiSend } from 'react-icons/bi'
import useResizablePreview from '@/hooks/useResizablePreview'
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import { useChat } from '@ai-sdk/react'
import { ChatStatus, DefaultChatTransport, UIMessage } from 'ai'
import MessageMarkdown from './MessageMarkdown'
import MessageList from './MessageList'

const message = `Sure! I've created a basic Gym Membership Form for you.

Fields included:
• Full Name
• Email Address
• Phone Number
• Age
• Membership Plan (Monthly / Quarterly / Yearly)
• Preferred Workout Time
• Emergency Contact Number

You can preview the form on the right panel.`

const markdownMessage = `### ✅ Gym Membership Form Created

I've generated a **Gym Membership Form** for you.  
You can see the **live preview on the right panel**.

#### 📝 Fields Included

- Full Name
- Email Address
- Phone Number
- Age
- Membership Plan
  - Monthly
  - Quarterly
  - Yearly
- Preferred Workout Time
- Emergency Contact Number

#### ⚙️ Validation Rules

- **Email** must be a valid email address  
- **Phone Number** must contain 10 digits  
- **Age** must be between \`16\` and \`65\`

#### 📌 What would you like to change?

You can ask me to:

- ➕ Add more fields  
- 🔄 Change field types (e.g., text → dropdown)  
- 🧾 Add sections like *Medical Information*  
- 🎨 Customize form layout or styling  

Just tell me what you'd like to update and I'll modify the form instantly.`;

type AIMessage = {
    role: "assistant" | "user"
    content: string
    form?: FormSchema
}

type FormSchema = {
    title: string
    fields: {
        type: string
        label: string
        required?: boolean
    }[]
}

const ChatComponent = () => {

    // const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState<AIMessage[]>([])
    const [inputText, setInputText] = useState("")

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const chatComponentRef = useRef<HTMLDivElement>(null)
    const { previewWidth, startResize } = useResizablePreview() // div is commented righ now

    const { messages, setMessages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/ai"
        })
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()

            if (!message.trim()) return

            const userMessage: AIMessage = {
                role: "user",
                content: message
            }

            if (inputText.trim()) {

                if (message.length >= 10) {
                    setMessages(message => message.splice(0, 10))
                }
                sendMessage({ text: inputText })
                setInputText("")

                textAreaRef.current?.focus();
            }
        }
    }

    if (textAreaRef.current) {
        setTimeout(() => {
            textAreaRef.current?.focus();
        }, 1000);
    }

    return (
        <div className='__chat-multi-panel' >

            <div className='__chat-compo'  >
                <div className='__chat-area' >
                    <MessageList messages={messages} status={status} />
                </div>

                {/* textarea */}
                <div className='__chat-compo-area move-down' ref={chatComponentRef} >
                    {/* <h4 className='__chat-compo--header'>
                        What form would you like to create today?
                    </h4> */}
                    <div className='__chat-compo-textarea-container' >
                        <textarea
                            id='textarea-id'
                            ref={textAreaRef}
                            onKeyDown={handleKeyDown}

                            onChange={(e: any) => setInputText(e.target.value)}
                            disabled={status !== 'ready'}
                            value={inputText}

                            className='__chat-compo-textarea'
                            placeholder={`Ask Formiq to generate a form...\nExample: Create a customer feedback form with name, email, rating and comments.`}
                        />
                        <BiSend size={20} className='__chat-compo-icon' />
                    </div>
                </div>
            </div>


            {/* <div className="__resize-divider" onMouseDown={startResize} />
            <div className='__preview-panel' style={{ width: previewWidth }} >
                asdsad
            </div> */}
        </div>
    )
}

export default ChatComponent