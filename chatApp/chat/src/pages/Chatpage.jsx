import { useState , useMemo, useEffect, useCallback} from "react";
import Chatlayout from "../components/Chatlayout";
import Chatwindow from "../components/Chatwindow";
import Conversationlist from "../components/Conversationlist";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import useLocalStorage from "../hooks/useLocalStorage";

const Chatpage = () => {

    
  const initialConversations = [
    {
      id: 101,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "10:32 AM",
      unreadCount: 2,
      online: true,
    },

    {
      id: 102,
      name: "Sarah",
      lastMessage: "See you tomorrow",
      timestamp: "10:25 AM",
      unreadCount: 5,
      online: false,
    },

    {
      id: 103,
      name: "Mike",
      lastMessage: "Okay 👍",
      timestamp: "9:50 AM",
      unreadCount: 0,
      online: true,
    },

    {
      id: 104,
      name: "Alex",
      lastMessage: "Let's talk later",
      timestamp: "9:20 AM",
      unreadCount: 1,
      online: true,
    },
  ];

  const initialMessages = [
    {
      id: 1,
      conversationId: 101,
      senderId: "john",
      text: "Hey! How are you?",
      timestamp: "10:30 AM",
    },

    {
      id: 2,
      conversationId: 101,
      senderId: "me",
      text: "I am good! How about you?",
      timestamp: "10:31 AM",
    },

    {
      id: 3,
      conversationId: 101,
      senderId: "john",
      text: "I'm doing great!",
      timestamp: "10:32 AM",
    },

    {
      id: 4,
      conversationId: 102,
      senderId: "sarah",
      text: "Are we meeting today?",
      timestamp: "10:20 AM",
    },

    {
      id: 5,
      conversationId: 102,
      senderId: "me",
      text: "Yes, definitely.",
      timestamp: "10:21 AM",
    },
  ];

  const [search, setSearch] = useState("")
  const [selectedConversationId, setSelectedConversationId] = useState(101)
  const [messages, setMessages] = useLocalStorage("chat-messages", initialMessages)
  const [conversations, setConversations] = useLocalStorage("chat-conversations", initialConversations)
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

   const handleSendMessage = useCallback((text) => {

    const newMessage = {
      id: Date.now(),
      conversationId: selectedConversationId,
      senderId: 'me',
      text: text,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, newMessage])

    setConversations((prevConversations) => 
     prevConversations.map((conversation) => {

      if(conversation.id === selectedConversationId){
        return {
          ...conversation,
          lastMessage: text,
          timestamp: "Just now",
        }
      }

      return conversation

     })
    )

   }, [selectedConversationId, setMessages])

   useEffect(() => {
    
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    },1000)

    return () => clearTimeout(timer)

   }, [])

   const handleTyping = (text) => {
    setIsTyping(text.length > 0)
   }

   const handleSelectConversation = (conversationId) => {

    setSelectedConversationId(conversationId)

    setConversations((prevConversations) =>
     prevConversations.map((conversation) => {

      if(conversation.id === conversationId){
        return {
          ...conversation,
          unreadCount: 0,
        }
      }

      return conversation

     })
    )

   }

   const handleRetry = () => {

     setError(false)
     setIsLoading(true)

     setTimeout(() => {
      setIsLoading(false)
     }, 1000)

   }

   const filteredConversations = useMemo(() => {

     return conversations.filter((conversation) => 
       conversation.name.toLowerCase().includes(search.toLowerCase())
     )

   }, [conversations, search])

    return (
        <div className="flex h-screen">
          <SearchBar search={search} setSearch={setSearch} />
            <Chatlayout>
                  {
                    loading ? (
                      <Loader />
                    ) : 
                    error ? (
                      <Error message="Failed to load conversations" onRetry={handleRetry} />
                    ) : ( 
                    
                      <Conversationlist conversations={filteredConversations}
                  selectedConversationId={selectedConversationId}
                  onSelect={handleSelectConversation}
                  />
                    )
                  }
                  <Chatwindow messages={messages}
                    conversations={conversations}
                    selectedConversationId={selectedConversationId}
                    onSend={handleSendMessage}
                    onTyping={handleTyping}
                    isTyping={isTyping}
                  />
            </Chatlayout>

        </div>
    );
};

export default Chatpage;