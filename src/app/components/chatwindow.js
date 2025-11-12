// "use client";

// import { useRef, useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider";

// export default function ChatWindow({ activeChat, sendMessage, isLoadingMessages }) {
//   const mainChatContainerRef = useRef(null);
//   const messageInputRef = useRef(null);
//   const { user } = useAuth();

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (mainChatContainerRef.current) {
//       mainChatContainerRef.current.scrollTop = mainChatContainerRef.current.scrollHeight;
//     }
//   }, [activeChat?.messages]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       sendMessage(messageInputRef.current.value);
//       // messageInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-gray-100">
//       {/* Chat Header */}
//       <div className="p-4 border-b border-gray-300 flex justify-between items-center">
//         <h2 className="text-lg font-semibold">{activeChat?.name || "Select a chat"}</h2>
//         <span className="text-sm text-gray-500">{user?.username}</span>
//       </div>

//       {/* Chat Messages */}
//       <div
//         ref={mainChatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom"
//       >
//         {isLoadingMessages ? (
//           <p className="text-gray-400 text-center">Loading messages...</p>
//         ) : activeChat?.messages?.length === 0 ? (
//           <p className="text-gray-400 text-center">No messages yet. Say hello!</p>
//         ) : (
//           activeChat.messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.sender === user.username ? "justify-end" : "justify-start"}`}
//             >
//               <div className={`flex flex-col max-w-[70%]`}>
//                 <div className={`text-xs font-semibold ${msg.sender === user.username ? "text-gray-500" : "text-gray-700"}`}>
//                   {msg.sender} <span className="text-gray-400 text-[10px] ml-1">{msg.timestamp}</span>
//                 </div>
//                 <p
//                   className={`p-3 rounded-2xl break-words shadow-sm ${
//                     msg.sender === user.username
//                       ? "bg-blue-600 text-white rounded-br-none"
//                       : "bg-gray-200 text-gray-800 rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input Box */}
//       <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
//         <input
//           ref={messageInputRef}
//           type="text"
//           placeholder="Type a message..."
//           onKeyDown={handleKeyDown}
//           className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={() => {
//             sendMessage(messageInputRef.current.value);
//             messageInputRef.current.value = "";
//           }}
//           className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition duration-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
