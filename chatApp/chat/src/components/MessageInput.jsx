    import { useState } from "react";

const MessageInput = ({onSend, onTyping}) => {

    const [text, setText] = useState('')

    const handleSubmit = () => {

        const trimmedText = text.trim()

        if(!trimmedText){
            return ;
        }

        onSend(trimmedText)
        setText('')
        onTyping('')    

    }

    const handleKeyDown = (e) => {

        if(e.key === 'Enter' && !e.shiftKey){

            e.preventDefault()
            handleSubmit()

        }

    }

    return (

        <div className="border-t p-4">
            <div className="flex gap-2">

               <textarea 
               value={text}
               onChange={(e) => {
                setText(e.target.value)
                onTyping(e.target.value)
               }}
               onKeyDown={handleKeyDown}
               placeholder="Type your message..."
               className="flex-1 border rounded-md p-2 resize-none focus:outline-none"
               />

               <button
               disabled={!text.trim()}
               onClick={handleSubmit}
               >
                  Send
               </button>

            </div>
        </div>

    )

}

export default MessageInput;