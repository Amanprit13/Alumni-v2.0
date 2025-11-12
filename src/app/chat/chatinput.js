// // // ChatInput.jsx - WhatsApp Style (Dedicated Send/Voice Button)
// // 'use client';

// // import { useState, useRef } from 'react';
// // import { Send, Paperclip, Smile, Mic } from 'lucide-react'; // Added Mic icon

// // export default function ChatInput({ onSendMessage, currentUser, onTypingStatusChange }) {
// //   const [input, setInput] = useState('');
// //   const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
// //   const fileInputRef = useRef(null);
  
// //   // The input is active if the user has typed something
// //   const isInputActive = input.trim().length > 0;

// //   // --- Handlers ---

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (isInputActive && currentUser) {
// //       onSendMessage(input.trim(), currentUser); 
// //       setInput('');
// //       if (onTypingStatusChange) onTypingStatusChange(false);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const newValue = e.target.value;
// //     setInput(newValue);
// //     if (onTypingStatusChange) onTypingStatusChange(newValue.length > 0);
// //   };

// //   // The floating button handles Send (if text) or Voice (if no text)
// //   const handleFloatingButtonClick = () => {
// //     if (isInputActive) {
// //       handleSubmit({ preventDefault: () => {} });
// //     } else {
// //       alert("Recording Voice Note..."); // Placeholder for voice recording
// //     }
// //   };

// //   const handleAttachClick = () => {
// //     // Only Attachment icon is available inside the input field
// //     fileInputRef.current.click();
// //   };

// //   const handleFileChange = (e) => {
// //     if (e.target.files.length > 0) {
// //       const fileName = e.target.files[0].name;
// //       onSendMessage(`[Attachment: ${fileName} uploaded!]`, currentUser);
// //       e.target.value = null; 
// //     }
// //   };

// //   const handleEmojiClick = () => {
// //     setIsEmojiPickerOpen(prev => !prev);
// //   };
  
// //   // --- Styling Constants ---
// //   // Background of the entire bar (like WhatsApp's bottom bar)
// //   const BAR_BG = 'bg-gray-800 dark:bg-gray-800'; 
// //   // Background of the chat input bubble
// //   const INPUT_BG = 'bg-gray-700 dark:bg-gray-700'; 
// //   // WhatsApp's signature green color
// //   const WHATSAPP_GREEN = 'bg-green-500 hover:bg-green-600'; 
// //   const ICON_COLOR = 'text-gray-400 dark:text-gray-400';

// //   return (
// //     // Form Container: Added horizontal padding to give room for the floating button
// //     <form 
// //       onSubmit={handleSubmit} 
// //       className={`flex items-end w-full py-2 px-3 relative border-t border-gray-700 ${BAR_BG}`}
// //     >
      
// //       {/* --- HIDDEN FILE INPUT --- */}
// //       <input
// //         type="file"
// //         ref={fileInputRef}
// //         onChange={handleFileChange}
// //         className="hidden"
// //       />
      
// //       {/* --- EMOJI PICKER (Placeholder) --- */}
// //       {isEmojiPickerOpen && (
// //         <div className="absolute bottom-full left-3 mb-2 w-72 h-64 bg-gray-700 border border-gray-600 rounded-lg shadow-xl p-4 z-10">
// //           <p className="text-center text-sm text-gray-400">[Placeholder for Emoji Picker UI]</p>
// //         </div>
// //       )}

// //       {/* 1. Message Input Container (Flexible Middle Section) */}
// //       <div className="flex-1 relative flex items-center mr-2">
        
// //         {/* Input Field */}
// //         <input
// //           type="text"
// //           value={input}
// //           onChange={handleInputChange}
// //           placeholder="Type a message" 
// //           // Increased py/pl/pr for the tall, sleek, integrated look
// //           className={`flex-1 py-3.5 pl-12 pr-12 text-base rounded-full ${INPUT_BG} text-gray-200 border-none focus:ring-0 transition-colors focus:outline-none placeholder-gray-400`}
// //         />

// //         {/* --- ICONS INSIDE THE INPUT FIELD --- */}
        
// //         {/* Emoji Button (Left of text) */}
// //         <button 
// //           type="button"
// //           // Positioned on the left inside the input field
// //           className={`absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 ${ICON_COLOR} hover:text-white transition-colors`}
// //           onClick={handleEmojiClick}
// //           aria-label="Toggle emoji picker"
// //         >
// //           <Smile size={24} className={isEmojiPickerOpen ? 'text-green-400' : ''} />
// //         </button>
        
// //         {/* Attachment Button (Right of text) */}
// //         <button 
// //           type="button"
// //           // Positioned on the right inside the input field
// //           className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 ${ICON_COLOR} hover:text-white transition-colors`}
// //           onClick={handleAttachClick} 
// //           aria-label="Attach file"
// //         >
// //           <Paperclip size={20} />
// //         </button>
// //       </div>

// //       {/* 2. Floating Send/Voice Button (Far Right) */}
// //       <button
// //         type="button" // Type button prevents default form submission
// //         onClick={handleFloatingButtonClick}
// //         // Circular, large, and WhatsApp Green
// //         className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl flex-shrink-0 ${WHATSAPP_GREEN} text-white transform active:scale-95`}
// //         aria-label={isInputActive ? "Send message" : "Send voice note"}
// //       >
// //         {/* Renders Send if text is typed, otherwise renders Mic */}
// //         {isInputActive ? <Send size={24} /> : <Mic size={24} />}
// //       </button>
// //     </form>
// //   );
// // }

// // ChatInput.jsx - WhatsApp Style (Dedicated Send/Voice Button)
// 'use client';

// import { useState, useRef, useCallback } from 'react';
// import { Send, Paperclip, Smile, Mic } from 'lucide-react'; 

// export default function ChatInput({ 
//     onSendMessage, 
//     currentUser, 
//     onTypingStatusChange,
//     activeChatId 
// }) {
//     const [input, setInput] = useState('');
//     const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
//     const fileInputRef = useRef(null);
    
//     const isInputActive = input.trim().length > 0;

//     // --- Core Send Logic ---

//     // Unified function for sending the message
//     const sendChatMessage = useCallback(() => {
//         if (isInputActive && currentUser && activeChatId) {
//             // Pass the message details (text, user, chatId) to the parent handler
//             onSendMessage({
//                 text: input.trim(),
//                 user: currentUser,
//                 chatId: activeChatId, 
//             }); 
//             setInput('');
//             // Ensure typing status is turned off after sending
//             if (onTypingStatusChange) onTypingStatusChange(false);
//         }
//     }, [input, isInputActive, currentUser, activeChatId, onSendMessage, onTypingStatusChange]);


//     // --- Event Handlers ---

//     // Handles form submission (e.g., clicking a button *inside* the form)
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         sendChatMessage();
//     };

//     // 🛑 CRITICAL FIX: Explicitly handle the Enter key press
//     const handleKeyPress = (e) => {
//         // Check if the key is 'Enter' and not Shift+Enter (for multi-line inputs)
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault(); // Prevents default form submission/newline behavior
//             sendChatMessage();
//         }
//     };

//     const handleInputChange = (e) => {
//         const newValue = e.target.value;
//         setInput(newValue);
//         if (onTypingStatusChange) onTypingStatusChange(newValue.length > 0);
//     };

//     const handleFloatingButtonClick = () => {
//         if (isInputActive) {
//             sendChatMessage(); // Call the unified send action
//         } else {
//             // Placeholder for voice recording
//             // IMPORTANT: Never use alert() in production/Canvas environment. Replace with a modal UI.
//             console.log("Recording Voice Note..."); 
//         }
//     };

//     const handleAttachClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files.length > 0 && currentUser && activeChatId) {
//             const fileName = e.target.files[0].name;
            
//             onSendMessage({
//                 text: `[Attachment: ${fileName} uploaded!]`,
//                 user: currentUser,
//                 chatId: activeChatId, 
//             });
//             e.target.value = null; 
//         }
//     };

//     const handleEmojiClick = () => {
//         setIsEmojiPickerOpen(prev => !prev);
//     };
    
//     // --- Styling Constants ---
//     const BAR_BG = 'bg-gray-800 dark:bg-gray-800'; 
//     const INPUT_BG = 'bg-gray-700 dark:bg-gray-700'; 
//     const WHATSAPP_GREEN = 'bg-green-500 hover:bg-green-600'; 
//     const ICON_COLOR = 'text-gray-400 dark:text-gray-400';

//     return (
//         // Form Container
//         <form 
//             onSubmit={handleSubmit} 
//             className={`flex items-end w-full py-2 px-3 relative border-t border-gray-700 ${BAR_BG}`}
//         >
            
//             {/* --- HIDDEN FILE INPUT --- */}
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//             />
            
//             {/* --- EMOJI PICKER (Placeholder) --- */}
//             {isEmojiPickerOpen && (
//                 <div className="absolute bottom-full left-3 mb-2 w-72 h-64 bg-gray-700 border border-gray-600 rounded-lg shadow-xl p-4 z-10">
//                     <p className="text-center text-sm text-gray-400">[Placeholder for Emoji Picker UI]</p>
//                 </div>
//             )}

//             {/* 1. Message Input Container (Flexible Middle Section) */}
//             <div className="flex-1 relative flex items-center mr-2">
                
//                 {/* Input Field with onKeyDown handler */}
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={handleInputChange}
//                     // 🔑 THE FIX: Attach the key press handler
//                     onKeyDown={handleKeyPress} 
//                     placeholder="Type a message" 
//                     className={`flex-1 py-3.5 pl-12 pr-12 text-base rounded-full ${INPUT_BG} text-gray-200 border-none focus:ring-0 transition-colors focus:outline-none placeholder-gray-400`}
//                 />

//                 {/* --- ICONS INSIDE THE INPUT FIELD --- */}
                
//                 {/* Emoji Button (Left of text) */}
//                 <button 
//                     type="button"
//                     className={`absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 ${ICON_COLOR} hover:text-white transition-colors`}
//                     onClick={handleEmojiClick}
//                     aria-label="Toggle emoji picker"
//                 >
//                     <Smile size={24} className={isEmojiPickerOpen ? 'text-green-400' : ''} />
//                 </button>
                
//                 {/* Attachment Button (Right of text) */}
//                 <button 
//                     type="button"
//                     className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 ${ICON_COLOR} hover:text-white transition-colors`}
//                     onClick={handleAttachClick} 
//                     aria-label="Attach file"
//                 >
//                     <Paperclip size={20} />
//                 </button>
//             </div>

//             {/* 2. Floating Send/Voice Button (Far Right) */}
//             <button
//                 // Change type to 'submit' when input is active so it acts as the primary form submission button
//                 type={isInputActive ? "submit" : "button"} 
//                 onClick={handleFloatingButtonClick}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl flex-shrink-0 ${WHATSAPP_GREEN} text-white transform active:scale-95`}
//                 aria-label={isInputActive ? "Send message" : "Send voice note"}
//             >
//                 {/* Renders Send if text is typed, otherwise renders Mic */}
//                 {isInputActive ? <Send size={24} /> : <Mic size={24} />}
//             </button>
//         </form>
//     );
// }

'use client';

import { useState } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const isInputActive = input.trim().length > 0;

  // --- HANDLERS ---

  // Handles form submission, triggered by button click or Enter key
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    if (isInputActive) {
      onSendMessage(input); // Pass the input text to the parent
      setInput(''); // Clear the input field after sending
    }
  };

  // 🔑 FIX: Handles the "Enter" key press to send the message
  const handleKeyPress = (e) => {
    // Check if the key pressed is "Enter" and the Shift key is NOT held down
    // (This allows Shift+Enter for new lines in the future if needed)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent creating a new line in the input
      handleSubmit(e);    // Trigger the same logic as clicking the send button
    }
  };

  // Handles the floating button's action (send or voice)
  const handleFloatingButtonClick = (e) => {
    if (isInputActive) {
      handleSubmit(e);
    } else {
      // Placeholder for voice recording functionality
      console.log("Voice recording not implemented.");
    }
  };

  // --- RENDER ---
  const BAR_BG = 'bg-gray-100 dark:bg-gray-800';
  const INPUT_BG = 'bg-white dark:bg-gray-700';
  const WHATSAPP_GREEN = 'bg-green-500 hover:bg-green-600';
  const ICON_COLOR = 'text-gray-500 dark:text-gray-400';

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-end w-full py-2 px-3 relative ${BAR_BG}`}
    >
      <div className="flex-1 relative flex items-center mr-2">
        <button
          type="button"
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 p-2 ${ICON_COLOR} hover:text-black dark:hover:text-white transition-colors`}
          aria-label="Toggle emoji picker"
        >
          <Smile size={24} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Attach the key press handler here
          placeholder="Type a message"
          className={`flex-1 py-3 pl-12 pr-12 text-base rounded-full ${INPUT_BG} text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400`}
        />
        <button
          type="button"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 p-2 ${ICON_COLOR} hover:text-black dark:hover:text-white transition-colors`}
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleFloatingButtonClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg flex-shrink-0 ${WHATSAPP_GREEN} text-white transform active:scale-95`}
        aria-label={isInputActive ? "Send message" : "Send voice note"}
      >
        {isInputActive ? <Send size={24} /> : <Mic size={24} />}
      </button>
    </form>
  );
}
