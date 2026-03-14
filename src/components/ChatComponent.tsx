import React from 'react'
import "@/styles/ChatComponent.css"

const ChatComponent = () => {
    return (
        <div className='__chat-compo' >
            <div>
                <h4 className='__chat-compo--header'>
                    What form would you like to create today?
                </h4>
                <textarea
                    className='__chat-compo-textarea'
                    placeholder={`Ask Formiq to generate a form... \nExample: Create a customer feedback form with name, email, rating and comments.`}
                ></textarea>
            </div>
        </div>
    )
}

export default ChatComponent