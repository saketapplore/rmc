import {useEffect, useRef} from 'react'
import MessageItem from "./MessageItem";

const MessageList = ({messages}) => {

    const bottomRef = useRef(null)

    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        
      })  

    }, [messages])

    if(!messages.length) {
        return (
            <div className="text-center py-4 text-gray-500">
                <p>No messages yet</p>

                <p className="text-sm text-gray-500">
                    Start a new conversation to get started
                </p>
            </div>
            
        )
    }

    return (

        <div className="flex flex-col -gap-3">

           {
            messages.map((message) => (
                
                <MessageItem 
                key={message.id}
                message={message}
                />

            ))
           }

           <div ref={bottomRef} />
          
        </div>

    )

}

export default MessageList;