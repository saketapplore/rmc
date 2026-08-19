import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
    selectedConversationId,
    conversations,
    messages,
    onSend,
    onTyping,
    isTyping
  }) => {
  
    const selectedConversation = conversations.find(
      (conversation) =>
        conversation.id === selectedConversationId
    );

    const conversationMessages = messages.filter(
      (message) => 
        message.conversationId === selectedConversationId
    )
  
    return (
      <div className="md:col-span-2 p-4">
  
        <div className="border-b pb-4">
  
          <h2 className="text-xl font-bold">
            {selectedConversation?.name}
          </h2>
  
          <p className="text-sm text-gray-500">
            {selectedConversation?.online
              ? "● Online"
              : "○ Offline"}
          </p>
  
        </div>
  
        <div className="flex-1 p-4 overflow-y-auto" >
           <MessageList messages={conversationMessages} />
        </div>

        <MessageInput onSend={onSend} onTyping={onTyping} />

        <TypingIndicator name={selectedConversation?.name} isTyping={isTyping} />
  
      </div>
    );
  };
  
  export default ChatWindow;