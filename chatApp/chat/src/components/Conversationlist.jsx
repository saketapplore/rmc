import ConversationItem from "./ConversationItem";
const Conversationlist = ({
    conversations,
    selectedConversationId,
    onSelect
}) => {

  if(conversations.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>No conversations found</p>
      </div>
    )
  }

 return (

    <>
       <div className="border-r p-4">

          <h2 className="text-lg font-bold mb-4">
            Conversations
          </h2>

          
      <div className="space-y-2">

{conversations.map((conversation) => (

  <ConversationItem
    key={conversation.id}
    conversation={conversation}
    selectedConversationId={selectedConversationId}
    onSelect={onSelect}
  />

))}

</div>

        </div>    
    </>
 )

};

export default Conversationlist;