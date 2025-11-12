// components/MessageInput.jsx
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <footer className="p-4 border-t border-gray-200 bg-white flex">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2 focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </footer>
  );
};

export default MessageInput;
