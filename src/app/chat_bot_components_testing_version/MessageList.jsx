// components/MessageList.jsx
import React, { useEffect, useRef } from "react";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-3">
          <p className="font-medium">{msg.sender}</p>
          <p>{msg.text}</p>
          <span className="text-xs text-gray-500">{msg.timestamp}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
