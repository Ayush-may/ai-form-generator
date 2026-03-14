"use client"
import React, { useRef } from 'react'
import "@/styles/ChatComponent.css"
import { BiSend } from 'react-icons/bi'

const ChatComponent = () => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleOnInput = () => {
        const el = textAreaRef.current
        if (!el) return

        // reset height
        el.style.height = "auto"

        // limit max height
        const newHeight = Math.min(el.scrollHeight, 200)

        el.style.height = newHeight + "px"
    }

    return (
        <div className='__chat-compo'>
            <div>
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
    )
}

export default ChatComponent