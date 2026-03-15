"use client"
import React, { useEffect, useRef, useState } from 'react'
import "@/styles/ChatComponent.css"
import { BiSend } from 'react-icons/bi'
import useResizablePreview from '@/hooks/useResizablePreview'
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm"

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

const ChatComponent = () => {

    const [message, setMessage] = useState("")

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const chatComponentRef = useRef<HTMLDivElement>(null)
    const { previewWidth, startResize } = useResizablePreview()

    useEffect(() => {
        sendPrompt();
    }, [])

    const sendPrompt = async () => {
        const res: any = await fetch("/api/ai", {
            method: "POST",
            body: JSON.stringify({
                prompt: `
You are a senior form designer.

Create a Gym Membership Registration Form.

STRICT RULES:

1. Output MUST be valid Markdown.
2. DO NOT use markdown tables.
3. Use headings and bullet lists only.
4. Organize the form into sections.
5. Each field should be listed clearly.

FORMAT:

# Form Title

## Section Name

- Field Name
  - type: text/email/select/date
  - placeholder: example value
  - required: yes/no

Example:

# Example Form

## Personal Information

- Full Name
  - type: text
  - placeholder: Enter your full name
  - required: yes

- Email Address
  - type: email
  - placeholder: example@email.com
  - required: yes

Now generate the gym membership form.
`
            })
        })

        console.log(res)

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        let result = ""

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)

            const lines = chunk.split("\n")

            for (const line of lines) {
                if (!line) continue

                const json = JSON.parse(line)
                result += json.response

                setMessage(result)
            }
        }
    }

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     const el = chatComponentRef.current;
        //     if (!el) return;
        //     el.classList.add("move-down");
        //     return () => {
        //         clearTimeout(timer)
        //     }
        // }, 1000);
    }, [chatComponentRef])

    const handleOnInput = () => {
        const el = textAreaRef.current
        if (!el) return
        el.style.height = "auto"
        const newHeight = Math.min(el.scrollHeight, 200)
        el.style.height = newHeight + "px"
    }

    return (
        <div className='__chat-multi-panel' >

            <div className='__chat-compo'  >
                <div className='__chat-area' >
                    {/* <div className='__chat-area-message me' >{message}</div> */}
                    <div className='__chat-area-message me' >
                        <Markdown remarkPlugins={[remarkGfm]} >{message}</Markdown>
                    </div>

                    <div className='__chat-area-message ai' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, veniam.</div>
                </div>

                {/* textarea */}
                <div className='__chat-compo-area move-down' ref={chatComponentRef} >
                    <h4 className='__chat-compo--header'>
                        What form would you like to create today?
                    </h4>
                    <div className='__chat-compo-textarea-container' >
                        <textarea
                            ref={textAreaRef}
                            onInput={handleOnInput}
                            className='__chat-compo-textarea'
                            placeholder={`Ask Formiq to generate a form...\nExample: Create a customer feedback form with name, email, rating and comments.`}
                        />
                        <BiSend size={20} className='__chat-compo-icon' />
                    </div>
                </div>
            </div>


            <div className="__resize-divider" onMouseDown={startResize} />
            <div className='__preview-panel' style={{ width: previewWidth }} >
                asdsad
            </div>
        </div>
    )
}

export default ChatComponent