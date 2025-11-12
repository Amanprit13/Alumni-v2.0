// 'use client';

// import { useState } from 'react';
// import { useChatManager } from './useChatManager';
// import ChatMessage from './ChatMessage';
// import ChatInput from './chatinput';
// import TypingIndicator from './TypingIndicator';
// import { Menu, SquarePen, Plus } from 'lucide-react';

// // Dummy sidebar data (replace with your own chat list API later)
// const sampleChats = [
//   { id: '1', name: 'Alice', lastMessage: 'See you soon!', imageUrl: 'https://i.pravatar.cc/150?img=1', timestamp: '10:45 AM', },
//   { id: '2', name: 'Bob', lastMessage: 'Let’s catch up later.', imageUrl: 'https://i.pravatar.cc/150?img=2', timestamp: 'Yesterday', },
//   { id: '3', name: 'Charlie', lastMessage: 'Typing...', imageUrl: 'https://i.pravatar.cc/150?img=3', timestamp: '9/28/2025', },
// ];

// export default function ChatPage({ currentUser }) {
//   // 🌟 NEW STATE: Tracks the currently selected chat ID
//   // Initialize with the first chat's ID, or null/empty if no chat should be active initially
//   const [activeChatId, setActiveChatId] = useState(sampleChats[0]?.id || null);
//   const { messages, isLoading, error, isConnected, sendMessage, isTyping } =
//     useChatManager(currentUser, activeChatId);

//   // 🌟 NEW HANDLER: Function to switch the active chat
//   const selectChat = (chatId) => {
//     setActiveChatId(chatId);
//     // In a real app, you'd also call a function here to load messages for this chatId
//     console.log(`Loading messages for chat ID: ${chatId}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         Loading chat history...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   const handleNewChat = () => alert('Starting a new 1-on-1 chat...');
//   const handleNewGroup = () => alert('Creating a new group...'); // Called in JSX
//   const handleMenu = () => alert('Opening sidebar menu/options...');

//   const activeChat = sampleChats.find(chat => chat.id === activeChatId);

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
//       {/* Sidebar */}
//       <aside className="w-1/4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col min-w-80 relative">
//         {/* 🌟 min-w-80 and relative added for better layout/FAB */}

//         {/* 1. WhatsApp-Style Header Toolbar (Replaces 'Chats' header) */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="font-bold text-2xl text-white">
//             Chats
//           </div>
//           <div className="flex space-x-4">
//             {/* Compose/New Chat Icon (Square with Pencil) */}
//             <SquarePen
//               className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-100"
//               onClick={handleNewChat} // Re-using the New Chat handler
//               title="New Chat"
//             />
//             {/* Menu Icon (Three Horizontal Lines/Hamburger) */}
//             <Menu
//               className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-100"
//               onClick={handleMenu}
//               title="Menu/Options"
//             />
//           </div>
//         </div>

//         {/* 2. Search Bar (Improved Styling) */}
//         <div className="p-2 border-b border-gray-200 dark:border-gray-700">
//           <div className="relative">
//             {/* Replaced SVG with Search icon for consistency */}
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//             <input
//               type="text"
//               placeholder="Search chats" /* Changed placeholder to be shorter */
//               className="w-full py-2 pl-10 pr-4 text-sm rounded-full bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-400"
//             // You would connect this to a state variable (e.g., value={searchTerm} onChange={handleSearch})
//             />
//           </div>
//         </div>

//         {/* Chat List (No structural changes needed here) */}
//         <div className="flex-1 overflow-y-auto"> {/* 🌟 Added overflow-y-auto */}
//           {sampleChats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => selectChat(chat.id)}
//               className={`flex items-center p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 transition duration-150 ease-in-out ${chat.id === activeChatId
//                 ? 'bg-gray-200 dark:bg-gray-700' // Active/Selected style
//                 : 'hover:bg-gray-100 dark:hover:bg-gray-700' // Hover style
//                 }`}
//             >
//               {/* 1. User Image (Avatar) */}
//               <img
//                 src={chat.imageUrl}
//                 alt={chat.name}
//                 className="w-12 h-12 rounded-full object-cover mr-4"
//               />

//               {/* 2. Message Content (Name & Last Message) */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                   {/* Name */}
//                   <div className="font-semibold text-base truncate">
//                     {chat.name}
//                   </div>
//                   {/* 3. Timestamp (Right Aligned) - WhatsApp Style */}
//                   <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
//                     {chat.timestamp}
//                   </div>
//                 </div>
//                 {/* Last Message */}
//                 <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                   {chat.lastMessage}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 3. Floating Action Button (FAB) for New Chat */}
//         <button
//           onClick={handleNewChat}
//           // Positioned absolutely within the 'relative' aside
//           className="absolute bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
//           title="New Chat"
//         >
//           <Plus className="w-6 h-6" />
//         </button>
//       </aside>

//       {/* Main Chat Window */}
//       <main className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
//           <div className="font-semibold">
//             {/* 🌟 CHANGE: Display active chat name, or a default message */}
//             {activeChat ? `Chat with ${activeChat.name}` : 'Select a Chat'}
//           </div>
//           <div className="text-sm text-gray-500">
//             {isConnected ? 'Online' : 'Offline'}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black">

//           {/* 🌟 KEY CHANGE: Check if a chat is actively selected */}
//           {!activeChatId ? (
//             <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
//               <svg
//                 className="w-16 h-16 mb-4"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10c0 3.866-3.582 7-8 7a8.882 8.882 0 01-3.695-.875L2 18l1.373-4.885A9.957 9.957 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <p className="text-lg font-semibold">Select a conversation to begin!</p>
//               <p>Your messages will appear here.</p>
//             </div>
//           ) : messages.length === 0 ? (
//             // 🌟 IF chat is selected BUT messages are empty
//             <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
//               <p className="text-lg font-semibold">Say Hi to {activeChat.name}!</p>
//               <p>Start your conversation now.</p>
//             </div>
//           ) : (
//             // 🌟 IF chat is selected AND messages exist
//             messages.map((msg) => (
//               <ChatMessage
//                 key={msg.id || msg.timestamp}
//                 message={msg}
//                 currentUser={currentUser}
//               />
//             ))
//           )}
//           {activeChatId && isTyping && <TypingIndicator />} {/* Only show typing if a chat is active */}
//         </div>

//         {/* Input Bar */}
//         <div className="fixed bottom-0 left-1/4 right-0 z-10">
//           <ChatInput onSendMessage={sendMessage} currentUser={currentUser} />
//         </div>

//         {/* Connection Banner */}
//         {!isConnected && (
//           <div className="text-center py-2 text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//             Reconnecting...
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Send, Paperclip, Smile, Mic, Phone, Search, MoreVertical } from 'lucide-react';

// // A unique key for storing messages in localStorage
// const LOCAL_STORAGE_KEY = 'chat-app-messages';

// // --- Helper Hook: useChatManager ---
// // Manages chat state, including sending, receiving, and persisting messages.
// const useChatManager = (currentUser, activeChatId) => {
//   const [allMessages, setAllMessages] = useState(() => {
//     try {
//       if (typeof window !== 'undefined') {
//         const savedMessages = window.localStorage.getItem(LOCAL_STORAGE_KEY);
//         return savedMessages ? JSON.parse(savedMessages) : [];
//       }
//     } catch (error) {
//       console.error("Failed to load messages from localStorage:", error);
//     }
//     return [];
//   });

//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allMessages));
//     } catch (error) {
//       console.error("Failed to save messages to localStorage:", error);
//     }
//   }, [allMessages]);

//   useEffect(() => {
//     if (activeChatId) {
//       const filtered = allMessages
//         .filter(msg => String(msg.chatId) === String(activeChatId))
//         .sort((a, b) => a.timestamp - b.timestamp);
//       setMessages(filtered);
//     } else {
//       setMessages([]);
//     }
//   }, [activeChatId, allMessages]);

//   const sendMessage = useCallback((text) => {
//     if (!text.trim() || !currentUser || !activeChatId) return;

//     const newMessage = {
//       id: `${currentUser}-${Date.now()}`,
//       chatId: activeChatId,
//       user: currentUser,
//       text: text.trim(),
//       timestamp: Date.now(),
//     };
//     setAllMessages(prevMessages => [...prevMessages, newMessage]);
//   }, [currentUser, activeChatId]);

//   return { messages, sendMessage, isLoading: false, error: null };
// };


// // --- UI Component: ChatMessage ---
// function ChatMessage({ message, currentUser }) {
//   const isSentByMe = message.user === currentUser;
//   const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
//     hour: '2-digit', minute: '2-digit', hour12: true,
//   });

//   return (
//     <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
//       {!isSentByMe && (
//         <img
//           src={`https://i.pravatar.cc/40?u=${message.user}`}
//           alt="Avatar"
//           className="w-8 h-8 rounded-full mr-2 self-start flex-shrink-0"
//           onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/4B5563/FFFFFF?text=U"; }}
//         />
//       )}
//       <div className={`relative flex flex-col max-w-[80%] md:max-w-[70%] py-2 px-3 rounded-xl shadow-md ${isSentByMe ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}`}>
//         {!isSentByMe && (
//           <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
//             {message.user}
//           </p>
//         )}
//         <p className="text-base break-words pb-0.5 pr-10 whitespace-pre-wrap">
//           {message.text}
//         </p>
//         <div className={`absolute bottom-1 right-2 flex items-center text-xs ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
//           {formattedTime}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- UI Component: ChatInput ---
// function ChatInput({ onSendMessage }) {
//   const [input, setInput] = useState('');
//   const isInputActive = input.trim().length > 0;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isInputActive) {
//       onSendMessage(input);
//       setInput('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const WHATSAPP_GREEN = 'bg-green-500 hover:bg-green-600';
//   const ICON_COLOR = 'text-gray-500 dark:text-gray-400';

//   return (
//     <form onSubmit={handleSubmit} className="flex items-end w-full py-2 px-3 relative bg-gray-100 dark:bg-gray-800">
//       <div className="flex-1 relative flex items-center mr-2">
//         <button type="button" className={`absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 ${ICON_COLOR} hover:text-black dark:hover:text-white`} aria-label="Emoji">
//           <Smile size={24} />
//         </button>
//         <input
//           type="text" value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="Type a message"
//           className="flex-1 py-3 pl-12 pr-12 text-base rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
//         />
//         <button type="button" className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 ${ICON_COLOR} hover:text-black dark:hover:text-white`} aria-label="Attach file">
//           <Paperclip size={20} />
//         </button>
//       </div>
//       <button type="submit" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg flex-shrink-0 ${WHATSAPP_GREEN} text-white active:scale-95`} aria-label={isInputActive ? "Send message" : "Send voice note"}>
//         {isInputActive ? <Send size={24} /> : <Mic size={24} />}
//       </button>
//     </form>
//   );
// }

// // --- Main Page Component ---
// export default function ChatPage({ currentUser = "You" }) {
//   const [activeChatId, setActiveChatId] = useState('1'); // Default to 'General Chat'
//   const { messages, isLoading, error, sendMessage } = useChatManager(currentUser, activeChatId);
//   const messagesEndRef = useRef(null);

//   const sampleChats = [
//     { id: '1', name: 'General Chat', imageUrl: 'https://placehold.co/150x150/7E22CE/FFFFFF?text=GC' },
//     { id: '2', name: 'Bob', imageUrl: 'https://i.pravatar.cc/150?img=2' },
//     { id: '3', name: 'Charlie', imageUrl: 'https://i.pravatar.cc/150?img=3' },
//   ];
//   const activeChat = sampleChats.find(chat => chat.id === activeChatId);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
//       <main className="flex-1 flex flex-col h-screen">
//         <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm flex-shrink-0">
//           {activeChat ? (
//             <>
//               <div className="flex items-center">
//                 <img src={activeChat.imageUrl} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3" />
//                 <div>
//                   <div className="font-semibold text-gray-800 dark:text-white">{activeChat.name}</div>
//                   <div className="text-sm text-green-500">Online</div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
//                 <button className="hover:text-black dark:hover:text-white"><Phone size={20} /></button>
//                 <button className="hover:text-black dark:hover:text-white"><Search size={20} /></button>
//                 <button className="hover:text-black dark:hover:text-white"><MoreVertical size={20} /></button>
//               </div>
//             </>
//           ) : (
//             <div className="font-semibold text-gray-800 dark:text-white">Select a Chat</div>
//           )}
//         </header>

//         <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//           {messages.map((msg) => (
//             <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
//           <ChatInput onSendMessage={sendMessage} />
//         </footer>
//       </main>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { 
//   Menu, SquarePen, Plus, Send, Paperclip, 
//   Smile, Mic, Phone, Search, MoreVertical 
// } from 'lucide-react';

// // A unique key for storing all chat messages in localStorage
// const LOCAL_STORAGE_KEY = 'chat-app-messages-all-chats';

// // --- 1. Helper Hook: useChatManager ---
// // Manages chat state across different chats, including sending, receiving, and persisting messages.
// const useChatManager = (currentUser, activeChatId) => {
//   // State for ALL messages across ALL chats, loaded from localStorage
//   const [allMessages, setAllMessages] = useState(() => {
//     try {
//       if (typeof window !== 'undefined') {
//         const savedMessages = window.localStorage.getItem(LOCAL_STORAGE_KEY);
//         return savedMessages ? JSON.parse(savedMessages) : [];
//       }
//     } catch (error) {
//       console.error("Failed to load messages from localStorage:", error);
//     }
//     return [];
//   });

//   // State for messages of the CURRENTLY active chat
//   const [messages, setMessages] = useState([]);

//   // Effect to save all messages to localStorage whenever they change
//   useEffect(() => {
//     try {
//       window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allMessages));
//     } catch (error) {
//       console.error("Failed to save messages to localStorage:", error);
//     }
//   }, [allMessages]);

//   // Effect to filter and display messages for the selected chat
//   useEffect(() => {
//     if (activeChatId) {
//       const filtered = allMessages
//         .filter(msg => String(msg.chatId) === String(activeChatId))
//         .sort((a, b) => a.timestamp - b.timestamp);
//       setMessages(filtered);
//     } else {
//       setMessages([]); // Clear messages if no chat is active
//     }
//   }, [activeChatId, allMessages]);

//   // Function to add a new message to the list
//   const sendMessage = useCallback((text) => {
//     if (!text.trim() || !currentUser || !activeChatId) return;

//     const newMessage = {
//       id: `${currentUser}-${Date.now()}`,
//       chatId: activeChatId, // Associate message with the active chat
//       user: currentUser,
//       text: text.trim(),
//       timestamp: Date.now(),
//     };
//     setAllMessages(prevMessages => [...prevMessages, newMessage]);
//   }, [currentUser, activeChatId]);
  
//   // isLoading and error are returned for future-proofing (e.g., when fetching from an API)
//   return { messages, sendMessage, isLoading: false, error: null };
// };


// // --- 2. UI Component: ChatMessage ---
// // Displays a single chat bubble with appropriate styling.
// function ChatMessage({ message, currentUser }) {
//   const isSentByMe = message.user === currentUser;
//   const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
//     hour: '2-digit', minute: '2-digit', hour12: true,
//   });

//   return (
//     <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
//       {/* Avatar for received messages */}
//       {!isSentByMe && (
//         <img
//           src={`https://i.pravatar.cc/40?u=${message.user}`}
//           alt="Avatar"
//           className="w-8 h-8 rounded-full mr-2 self-start flex-shrink-0"
//           onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/4B5563/FFFFFF?text=U"; }}
//         />
//       )}
//       <div className={`relative flex flex-col max-w-[80%] md:max-w-[70%] py-2 px-3 rounded-xl shadow-md ${isSentByMe ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}`}>
//         {/* User name for received messages in a group chat context */}
//         {!isSentByMe && (
//           <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
//             {message.user}
//           </p>
//         )}
//         <p className="text-base break-words pb-0.5 pr-10 whitespace-pre-wrap">
//           {message.text}
//         </p>
//         <div className={`absolute bottom-1 right-2 flex items-center text-xs ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
//           {formattedTime}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- 3. UI Component: ChatInput ---
// // Renders the message input field with emoji, attachment, and send/mic buttons.
// function ChatInput({ onSendMessage }) {
//   const [input, setInput] = useState('');
//   const isInputActive = input.trim().length > 0;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isInputActive) {
//       onSendMessage(input);
//       setInput('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex items-end w-full py-2 px-3 bg-gray-100 dark:bg-gray-800">
//       <div className="flex-1 relative flex items-center mr-2">
//         <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" aria-label="Emoji">
//           <Smile size={24} />
//         </button>
//         <input
//           type="text" value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="Type a message"
//           className="flex-1 py-3 pl-12 pr-12 text-base rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
//         />
//         <button type="button" className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" aria-label="Attach file">
//           <Paperclip size={20} />
//         </button>
//       </div>
//       <button type="submit" className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg flex-shrink-0 bg-green-500 hover:bg-green-600 text-white active:scale-95" aria-label={isInputActive ? "Send message" : "Send voice note"}>
//         {isInputActive ? <Send size={24} /> : <Mic size={24} />}
//       </button>
//     </form>
//   );
// }


// // --- 4. Main Page Component ---
// export default function ChatPage({ currentUser = "You" }) {
//   // Dummy sidebar data (replace with your own chat list API later)
//   const sampleChats = [
//     { id: '1', name: 'General Chat', lastMessage: 'This is a group for everyone.', imageUrl: 'https://placehold.co/150x150/7E22CE/FFFFFF?text=GC', timestamp: '11:30 AM', },
//     { id: '2', name: 'Bob', lastMessage: 'Let’s catch up later.', imageUrl: 'https://i.pravatar.cc/150?img=2', timestamp: 'Yesterday', },
//     { id: '3', name: 'Charlie', lastMessage: 'That sounds great!', imageUrl: 'https://i.pravatar.cc/150?img=3', timestamp: '9/28/2025', },
//   ];
  
//   // State to track the currently selected chat ID
//   const [activeChatId, setActiveChatId] = useState(sampleChats[0]?.id || null);
//   const { messages, isLoading, error, sendMessage } = useChatManager(currentUser, activeChatId);
//   const messagesEndRef = useRef(null);

//   const activeChat = sampleChats.find(chat => chat.id === activeChatId);
  
//   // Effect to automatically scroll to the bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Handler to switch the active chat
//   const selectChat = (chatId) => {
//     setActiveChatId(chatId);
//   };

//   const handleNewChat = () => alert('Starting a new chat...');
//   const handleMenu = () => alert('Opening sidebar menu...');

//   if (isLoading) return <div className="flex items-center justify-center h-screen text-gray-500">Loading chat history...</div>;
//   if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
//       {/* Sidebar */}
//       <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col min-w-[320px] relative">
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="font-bold text-2xl text-gray-800 dark:text-white">Chats</div>
//           <div className="flex space-x-4">
//             <SquarePen className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" onClick={handleNewChat} title="New Chat" />
//             <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" onClick={handleMenu} title="Menu" />
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="p-2 border-b border-gray-200 dark:border-gray-700">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search chats"
//               className="w-full py-2 pl-10 pr-4 text-sm rounded-full bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-400"
//             />
//           </div>
//         </div>

//         {/* Chat List */}
//         <div className="flex-1 overflow-y-auto">
//           {sampleChats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => selectChat(chat.id)}
//               className={`flex items-center p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 transition duration-150 ease-in-out ${chat.id === activeChatId ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
//             >
//               <img src={chat.imageUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover mr-4" />
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                   <div className="font-semibold text-base truncate text-gray-800 dark:text-white">{chat.name}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{chat.timestamp}</div>
//                 </div>
//                 <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Floating Action Button for New Chat */}
//         <button onClick={handleNewChat} className="absolute bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50" title="New Chat">
//           <Plus className="w-6 h-6" />
//         </button>
//       </aside>

//       {/* Main Chat Window */}
//       <main className="flex-1 flex flex-col h-screen">
//         {/* Main Header */}
//         <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm flex-shrink-0">
//           {activeChat ? (
//             <>
//               <div className="flex items-center">
//                 <img src={activeChat.imageUrl} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3" />
//                 <div>
//                   <div className="font-semibold text-gray-800 dark:text-white">{activeChat.name}</div>
//                   <div className="text-sm text-green-500">Online</div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
//                 <button className="hover:text-black dark:hover:text-white"><Phone size={20} /></button>
//                 <button className="hover:text-black dark:hover:text-white"><Search size={20} /></button>
//                 <button className="hover:text-black dark:hover:text-white"><MoreVertical size={20} /></button>
//               </div>
//             </>
//           ) : (
//             <div className="font-semibold text-gray-800 dark:text-white">Select a Chat</div>
//           )}
//         </header>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//           {!activeChatId ? (
//             <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
//               <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.882 8.882 0 01-3.695-.875L2 18l1.373-4.885A9.957 9.957 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"></path></svg>
//               <p className="text-lg font-semibold">Select a conversation to begin!</p>
//               <p>Your messages will appear here.</p>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
//               <p className="text-lg font-semibold">Say Hi to {activeChat.name}!</p>
//               <p>This is the beginning of your conversation.</p>
//             </div>
//           ) : (
//             messages.map((msg) => (
//               <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
//             ))
//           )}
//           {/* Dummy div to attach the scroll ref to */}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Footer */}
//         <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
//           <ChatInput onSendMessage={sendMessage} />
//         </footer>
//       </main>
//     </div>
//   );
// }

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Menu, SquarePen, Plus, Send, Paperclip,
  Smile, Mic, Phone, Search, MoreVertical
} from 'lucide-react';

// A unique key for storing all chat messages in localStorage
const LOCAL_STORAGE_KEY = 'chat-app-messages-all-chats';

// --- 1. Helper Hook: useChatManager (No changes needed here) ---
const useChatManager = (currentUser, activeChatId) => {
  const [allMessages, setAllMessages] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedMessages = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedMessages ? JSON.parse(savedMessages) : [];
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage:", error);
    }
    return [];
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allMessages));
    } catch (error) {
      console.error("Failed to save messages to localStorage:", error);
    }
  }, [allMessages]);

  useEffect(() => {
    if (activeChatId) {
      const filtered = allMessages
        .filter(msg => String(msg.chatId) === String(activeChatId))
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(filtered);
    } else {
      setMessages([]);
    }
  }, [activeChatId, allMessages]);

  const sendMessage = useCallback((text) => {
    if (!text.trim() || !currentUser || !activeChatId) return;

    const newMessage = {
      id: `${currentUser}-${Date.now()}`,
      chatId: activeChatId,
      user: currentUser,
      text: text.trim(),
      timestamp: Date.now(),
    };
    setAllMessages(prevMessages => [...prevMessages, newMessage]);
  }, [currentUser, activeChatId]);

  return { messages, sendMessage, isLoading: false, error: null };
};


// --- 2. UI Component: ChatMessage (No changes needed here) ---
function ChatMessage({ message, currentUser }) {
  const isSentByMe = message.user === currentUser;
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isSentByMe && (
        <img
          src={`https://i.pravatar.cc/40?u=${message.user}`}
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2 self-start flex-shrink-0"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/4B5563/FFFFFF?text=U"; }}
        />
      )}
      <div className={`relative flex flex-col max-w-[80%] md:max-w-[70%] py-2 px-3 rounded-xl shadow-md ${isSentByMe ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}`}>
        {!isSentByMe && (
          <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
            {message.user}
          </p>
        )}
        <p className="text-base break-words pb-0.5 pr-10 whitespace-pre-wrap">
          {message.text}
        </p>
        <div className={`absolute bottom-1 right-2 flex items-center text-xs ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

// --- 3. UI Component: ChatInput (No changes needed here) ---
function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const isInputActive = input.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInputActive) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end w-full py-2 px-3 bg-gray-100 dark:bg-gray-800">
      <div className="flex-1 relative flex items-center mr-2">
        <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" aria-label="Emoji">
          <Smile size={24} />
        </button>
        <input
          type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message"
          className="flex-1 py-3 pl-12 pr-12 text-base rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <button type="button" className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" aria-label="Attach file">
          <Paperclip size={20} />
        </button>
      </div>
      <button type="submit" className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg flex-shrink-0 bg-green-500 hover:bg-green-600 text-white active:scale-95" aria-label={isInputActive ? "Send message" : "Send voice note"}>
        {isInputActive ? <Send size={24} /> : <Mic size={24} />}
      </button>
    </form>
  );
}


// --- 4. Main Page Component ---
export default function ChatPage({ currentUser = "You" }) {
  // 🌟 NEW: State for the list of chats, search term, and loading status
  const [chats, setChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // State to track the currently selected chat ID
  const [activeChatId, setActiveChatId] = useState(null);
  const { messages, sendMessage } = useChatManager(currentUser, activeChatId);
  const messagesEndRef = useRef(null);

  // 🌟 NEW: Effect to simulate fetching the chat list on component mount
  useEffect(() => {
    setIsLoadingChats(true);
    // This timeout simulates a network request to an API
    setTimeout(() => {
      const fetchedChats = [
        { id: '1', name: 'Bob', lastMessage: 'Let’s catch up later.', imageUrl: 'https://i.pravatar.cc/150?img=2', timestamp: 'Yesterday', },
        { id: '2', name: 'Charlie', lastMessage: 'That sounds great!', imageUrl: 'https://i.pravatar.cc/150?img=3', timestamp: '9/28/2025', },
        { id: '3', name: 'Diana', lastMessage: 'Can you review this document?', imageUrl: 'https://i.pravatar.cc/150?img=4', timestamp: '10:15 AM', },
      ];
      setChats(fetchedChats);
      // Set the first chat as active after they are loaded
      if (fetchedChats.length > 0) {
        setActiveChatId(fetchedChats[0].id);
      }
      setIsLoadingChats(false);
    }, 1000); // 1-second delay
  }, []); // Empty array ensures this runs only once on mount

  // 🌟 NEW: Filter chats based on the search term
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Find the full object for the active chat from the main chats list
  const activeChat = chats.find(chat => chat.id === activeChatId);

  // Effect to automatically scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectChat = (chatId) => setActiveChatId(chatId);
  const handleNewChat = () => alert('Starting a new chat...');
  const handleMenu = () => alert('Opening sidebar menu...');

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col min-w-[320px] relative">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="font-bold text-2xl text-gray-800 dark:text-white">Chats</div>
          <div className="flex space-x-4">
            <SquarePen className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" onClick={handleNewChat} title="New Chat" />
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" onClick={handleMenu} title="Menu" />
          </div>
        </div>

        {/* Search Bar - Now fully functional */}
        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search User"
              className="w-full py-2 pl-10 pr-4 text-sm rounded-full bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete='nope'
            />
          </div>
        </div>

        {/* Chat List - Now shows loading state and filtered results */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingChats ? (
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">Loading chats...</div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`flex items-center p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 transition duration-150 ease-in-out ${chat.id === activeChatId ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              >
                <img src={chat.imageUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-base truncate text-gray-800 dark:text-white">{chat.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{chat.timestamp}</div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={handleNewChat} className="absolute bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50" title="New Chat">
          <Plus className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col h-screen">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm flex-shrink-0">
          {activeChat ? (
            <>
              <div className="flex items-center">
                <img src={activeChat.imageUrl} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{activeChat.name}</div>
                  <div className="text-sm text-green-500">Online</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <button className="hover:text-black dark:hover:text-white"><Phone size={20} /></button>
                <button className="hover:text-black dark:hover:text-white"><Search size={20} /></button>
                <button className="hover:text-black dark:hover:text-white"><MoreVertical size={20} /></button>
              </div>
            </>
          ) : (
            <div className="font-semibold text-gray-800 dark:text-white">
              {isLoadingChats ? 'Loading...' : 'Select a Chat'}
            </div>
          )}
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {!activeChatId ? (
            <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.882 8.882 0 01-3.695-.875L2 18l1.373-4.885A9.957 9.957 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"></path></svg>
              <p className="text-lg font-semibold">Select a conversation to begin!</p>
              <p>Your messages will appear here.</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col h-full justify-center items-center text-center text-gray-400">
              <p className="text-lg font-semibold">Say Hi to {activeChat.name}!</p>
              <p>This is the beginning of your conversation.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
          <ChatInput onSendMessage={sendMessage} />
        </footer>
      </main>
    </div>
  );
}