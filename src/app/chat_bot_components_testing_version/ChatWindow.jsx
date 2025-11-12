// components/ChatWindow.jsx
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    const newMessage = {
      id: Date.now(),
      text,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="p-4 border-b border-gray-200 bg-white">
        <h2 className="font-bold text-lg">{selectedChat.name}</h2>
        <p className="text-sm text-gray-500">{selectedChat.status}</p>
      </header>

      <MessageList messages={messages} />

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
