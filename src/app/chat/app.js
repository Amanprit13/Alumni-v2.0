// "use client";
// import { useState, useRef } from "react";
// // Assuming ChatPage is the component from page.jsx
// import ChatPage from "./ChatPage"; // Change: Import the main chat page
// import Sidebar from "./components/Sidebar";
// import AIChat from "./components/AIChat";
// import AuthModal from "./components/AuthModal";
// import Modal from "./components/Modal";

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [isLoginView, setIsLoginView] = useState(true);
//   const [modalData, setModalData] = useState(null);

//   const usernameInputRef = useRef(null);
//   const passwordInputRef = useRef(null);

//   const handleAuth = () => {
//     // In a real app, you would validate credentials here.
//     const user = usernameInputRef.current.value;
//     if (user.trim()) {
//       setIsLoggedIn(true);
//       setUsername(user);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
//       {!isLoggedIn ? (
//         <AuthModal
//           isLoginView={isLoginView}
//           setIsLoginView={setIsLoginView}
//           usernameRef={usernameInputRef}
//           passwordRef={passwordInputRef}
//           handleAuth={handleAuth}
//         />
//       ) : (
//         <div className="flex flex-col lg:flex-row w-full max-w-7xl h-[90vh] md:h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
//           {/* This structure assumes you want a Sidebar, a main Chat Page, and an AI Chat panel.
//             For this example, we'll render ChatPage directly. 
//           */}
//           {/* <Sidebar /> */}
//           {/* Passing the logged-in username to the ChatPage */}
//           <ChatPage currentUser={username} />
//           {/* <AIChat /> */}
//         </div>
//       )}

//       {modalData && (
//         <Modal
//           title={modalData.title}
//           message={modalData.message}
//           onClose={() => setModalData(null)}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useRef, useCallback } from "react";
// Assuming ChatPage is the component from page.jsx (or a subcomponent of the chat view)
import ChatPage from "./ChatPage"; 
import Sidebar from "./components/Sidebar";
import AIChat from "./components/AIChat";
import AuthModal from "./components/AuthModal";
import Modal from "./components/Modal";

// --- Mock Chat Data for the Sidebar ---
const mockChats = [
    { id: '1', name: 'General Support', lastMessage: 'See you soon!', timestamp: new Date('2025-10-01T09:02:45Z').getTime() },
    { id: '2', name: 'Project Alpha Team', lastMessage: 'It\'s rescheduled to 2 PM.', timestamp: new Date('2025-09-30T14:31:15Z').getTime() },
    { id: '3', name: 'Debug Session', lastMessage: 'Are you available to debug?', timestamp: new Date('2025-09-28T11:05:00Z').getTime() },
    { id: 'ai', name: 'AI Assistant', lastMessage: 'How can I help you today?', timestamp: Date.now() },
];


export default function App() {
    // --- Authentication and Global State ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);
    const [modalData, setModalData] = useState(null);

    // 🌟 NEW STATE: Manages which chat is currently open/displayed
    const [activeChatId, setActiveChatId] = useState('1'); 
    
    // --- Refs for Auth Modal (Unchanged) ---
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    // --- Authentication Handler (Unchanged) ---
    const handleAuth = useCallback(() => {
        const user = usernameInputRef.current?.value;
        if (user && user.trim()) {
            setIsLoggedIn(true);
            setUsername(user.trim());
        }
    }, []);

    // --- Chat Selection Handler ---
    const selectChat = useCallback((chatId) => {
        setActiveChatId(chatId);
    }, []);

    // --- Component Render ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
            {!isLoggedIn ? (
                // --- Authentication Modal ---
                <AuthModal
                    isLoginView={isLoginView}
                    setIsLoginView={setIsLoginView}
                    usernameRef={usernameInputRef}
                    passwordRef={passwordInputRef}
                    handleAuth={handleAuth}
                />
            ) : (
                // --- Main Chat Application Layout ---
                <div className="flex flex-col lg:flex-row w-full max-w-7xl h-[90vh] md:h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* 🌟 INTEGRATION: Sidebar for Chat Selection */}
                    <Sidebar
                        chats={mockChats}
                        activeChatId={activeChatId}
                        onSelectChat={selectChat}
                        currentUser={username}
                        // Placeholder for future logic:
                        // onLogout={() => { setIsLoggedIn(false); setUsername(''); setActiveChatId(null); }}
                    />
                    
                    {/* Main Chat Area */}
                    <div className="flex-1 flex min-w-0">
                        {/* 🌟 CONDITIONAL RENDERING: Display ChatPage or AIChat based on selection */}
                        {activeChatId === 'ai' ? (
                            <AIChat currentUser={username} />
                        ) : activeChatId ? (
                            <ChatPage 
                                currentUser={username} 
                                activeChatId={activeChatId} // <--- Pass the currently selected chat ID
                            />
                        ) : (
                            // Default view when logged in but no chat is selected
                            <div className="flex items-center justify-center flex-1 text-gray-500">
                                Select a chat to begin messaging.
                            </div>
                        )}
                    </div>
                    
                </div>
            )}

            {modalData && (
                // --- Global Modal Display ---
                <Modal
                    title={modalData.title}
                    message={modalData.message}
                    onClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}