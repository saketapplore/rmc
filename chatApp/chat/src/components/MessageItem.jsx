import { memo } from "react";

const MessageItem = ({ message }) => {

    const isMine = message.senderId === "me";
  
    return (
      <div
        className={`flex ${
          isMine ? "justify-end" : "justify-start"
        }`}
      >
  
        <div
          className={`max-w-[70%] px-4 py-2 rounded-lg ${
            isMine
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
  
          <p>
            {message.text}
          </p>
  
          <p
            className={`text-xs mt-1 ${
              isMine
                ? "text-blue-100"
                : "text-gray-500"
            }`}
          >
            {message.timestamp}
          </p>
  
        </div>
  
      </div>
    );
  };
  
  export default memo(MessageItem);