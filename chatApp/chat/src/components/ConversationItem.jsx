import { memo } from "react";

const ConversationItem = ({
    conversation,
    selectedConversationId,
    onSelect
}) => {

    const isSelected = selectedConversationId === conversation.id

    return (
        <>
          
          <div
          onClick={() => onSelect(conversation.id)}
          className={`p-3 rounded-lg cursor-pointer ${
            isSelected ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
          >

            <div className="flex justify-between">
                  
                  <p className="font-medium">  
                    {conversation.name}
                  </p>

                  {
                    conversation.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                        </span>
                    )
                  }

            </div>

            <p className="text-sm text-gray-500 truncate">
                {conversation.lastMessage}
            </p>

            <p className="text-xs text-gray-400">
                {conversation.timestamp}
            </p>

          </div>

        </>
    )

}

export default memo(ConversationItem);