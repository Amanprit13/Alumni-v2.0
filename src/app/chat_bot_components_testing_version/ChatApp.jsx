// components/ChatApp.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Mock alumni list
  const alumniList = [
    { id: "1", name: "John Doe", image: "https://via.placeholder.com/40", status: "Online" },
    { id: "2", name: "Jane Smith", image: "https://via.placeholder.com/40", status: "Offline" },
    { id: "3", name: "Robert Brown", image: "https://via.placeholder.com/40", status: "Online" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar alumniList={alumniList} onSelectChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default ChatApp;
