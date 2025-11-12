// // ChatMessage.jsx
// 'use client';

// // Function to render the status icon
// const MessageStatusIcon = ({ status }) => {
//   // Checkmark SVG paths for sent (single), delivered (double outline), and read (double blue)
//   const baseCheck = "M17 9l-7 7-4-4";
  
//   if (status === 'read') {
//     return (
//       <svg className="w-4 h-4 text-blue-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={baseCheck} />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 9l-7 7-4-4" />
//       </svg>
//     );
//   }
//   if (status === 'delivered') {
//     return (
//       <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={baseCheck} />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 9l-7 7-4-4" />
//       </svg>
//     );
//   }
//   if (status === 'sent') {
//     return (
//       <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//       </svg>
//     );
//   }
//   return null; // No icon for received or unknown status
// };


// export default function ChatMessage({ message, currentUser }) {
//   // NOTE: You must pass `currentUser` as a prop or get it from context/hook in a real app.
//   // Using a hardcoded value here only if it's missing from props.
//   const user = currentUser || "Current User"; 
//   const isSentByMe = message.user === user;

//   const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true, // Use 12-hour format
//   });

//   return (
//     <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
      
//       {/* Received Message Avatar (Only for messages NOT sent by me) */}
//       {!isSentByMe && (
//         <img 
//           src={`https://i.pravatar.cc/40?u=${message.user}`} 
//           alt="Avatar" 
//           className="w-8 h-8 rounded-full mr-1 self-start flex-shrink-0"
//         />
//       )}
      
//       {/* Message Bubble Container */}
//       <div 
//         className={`
//           relative flex flex-col 
//           max-w-[80%] md:max-w-[70%] lg:max-w-[60%] 
//           py-2 px-3 rounded-xl shadow-md
          
//           ${isSentByMe
//             // WhatsApp Sent Bubble: Light Green
//             ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none'
//             // Received Bubble: Light Gray/White
//             : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}
//         `}
//       >
//         {/* The small tail/arrow (purely visual) */}
//         <div className={`
//           absolute w-3 h-3 top-0 
//           ${isSentByMe 
//             ? 'right-0 -mr-3 bg-green-200 dark:bg-green-700' 
//             : 'left-0 -ml-3 bg-white dark:bg-gray-800'} 
//           transform rotate-45 rounded-sm`} 
//         />

//         {/* Sender Name (Hidden for self, visible for others/groups) */}
//         {!isSentByMe && (
//           <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
//             {message.user}
//           </p>
//         )}
        
//         {/* Message Text */}
//         <p className="text-base break-words pb-0.5 pr-10"> 
//           {message.text}
//         </p>

//         {/* Timestamp and Status Icon */}
//         <div className={`absolute bottom-1 right-2 flex items-center ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
//           <span className="text-xs">
//             {formattedTime}
//           </span>
//           {isSentByMe && <MessageStatusIcon status={message.status} />}
//         </div>

//       </div>
//     </div>
//   );
// }

// ChatMessage.jsx
// 'use client';

// // Removed MessageStatusIcon component as backend doesn't provide 'status'.
// // We'll rely on the optimistic update and confirmation via socket broadcast.

// export default function ChatMessage({ message, currentUser }) {
//     // The useChatManager hook adds the 'isMe' flag, but for robustness,
//     // we calculate it here based on the user prop, matching the existing logic.
//     const isSentByMe = message.user === currentUser;

//     const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true, // Use 12-hour format
//     });

//     return (
//         <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
            
//             {/* Received Message Avatar (Only for messages NOT sent by me) */}
//             {!isSentByMe && (
//                 // Using the user name as the seed for a unique avatar image
//                 <img 
//                     src={`https://i.pravatar.cc/40?u=${message.user}`} 
//                     alt="Avatar" 
//                     className="w-8 h-8 rounded-full mr-1 self-start flex-shrink-0"
//                 />
//             )}
            
//             {/* Message Bubble Container */}
//             <div 
//                 className={`
//                     relative flex flex-col 
//                     max-w-[80%] md:max-w-[70%] lg:max-w-[60%] 
//                     py-2 px-3 rounded-xl shadow-md
                    
//                     ${isSentByMe
//                         // WhatsApp Sent Bubble: Light Green
//                         ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none'
//                         // Received Bubble: Light Gray/White
//                         : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}
//                 `}
//             >
//                 {/* The small tail/arrow (purely visual) */}
//                 {/* Note: Removed the complex rotation tail for a simpler look, 
//                    which is often cleaner and easier to manage in Tailwind.
//                    If you want the tail, ensure the classes for the corners 
//                    (rounded-br-none/rounded-bl-none) are applied correctly.
//                 */}
//                 <div className={`
//                     absolute w-3 h-3 top-0 
//                     ${isSentByMe 
//                         // Positioning the tail based on sender
//                         ? 'right-0 -mr-3 bg-green-200 dark:bg-green-700' 
//                         : 'left-0 -ml-3 bg-white dark:bg-gray-800'} 
//                     transform rotate-45 rounded-sm`} 
//                 />

//                 {/* Sender Name (Hidden for self, visible for others/groups) */}
//                 {!isSentByMe && (
//                     <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
//                         {message.user}
//                     </p>
//                 )}
                
//                 {/* Message Text */}
//                 {/* Added 'whitespace-pre-wrap' for better handling of newlines from backend/input */}
//                 <p className="text-base break-words pb-0.5 pr-10 whitespace-pre-wrap"> 
//                     {message.text}
//                 </p>

//                 {/* Timestamp Container */}
//                 {/* Removed MessageStatusIcon call */}
//                 <div className={`absolute bottom-1 right-2 flex items-center ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
//                     <span className="text-xs">
//                         {formattedTime}
//                     </span>
//                     {/* Placeholder for future status icon (e.g., a simple checkmark for SENT) */}
//                 </div>

//             </div>
//         </div>
//     );
// }



// Removed MessageStatusIcon component as backend doesn't provide 'status'.
// We'll rely on the optimistic update and confirmation via socket broadcast.

export default function ChatMessage({ message, currentUser }) {
    // The useChatManager hook adds the 'isMe' flag, but for robustness,
    // we calculate it here based on the user prop, matching the existing logic.
    const isSentByMe = message.user === currentUser;

    const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour format
    });

    return (
        <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}>
            
            {/* Received Message Avatar (Only for messages NOT sent by me) */}
            {!isSentByMe && (
                // Using the user name as the seed for a unique avatar image
                <img 
                    src={`https://i.pravatar.cc/40?u=${message.user}`} 
                    alt="Avatar" 
                    className="w-8 h-8 rounded-full mr-1 self-start flex-shrink-0"
                    // Added onError to provide a fallback image if the primary avatar URL fails
                    onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop
                        // Use a simple, accessible placeholder image
                        e.target.src = "https://placehold.co/40x40/4B5563/FFFFFF?text=User"; 
                    }}
                />
            )}
            
            {/* Message Bubble Container */}
            <div 
                className={`
                    relative flex flex-col 
                    max-w-[80%] md:max-w-[70%] lg:max-w-[60%] 
                    py-2 px-3 rounded-xl shadow-md
                    
                    ${isSentByMe
                        // WhatsApp Sent Bubble: Light Green
                        ? 'bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white rounded-br-none'
                        // Received Bubble: Light Gray/White
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'}
                `}
            >
                {/* The small tail/arrow (purely visual) */}
                <div className={`
                    absolute w-3 h-3 top-0 
                    ${isSentByMe 
                        // Positioning the tail based on sender
                        ? 'right-0 -mr-3 bg-green-200 dark:bg-green-700' 
                        : 'left-0 -ml-3 bg-white dark:bg-gray-800'} 
                    transform rotate-45 rounded-sm`} 
                />

                {/* Sender Name (Hidden for self, visible for others/groups) */}
                {!isSentByMe && (
                    <p className="text-sm font-semibold mb-1 text-purple-600 dark:text-purple-400">
                        {message.user}
                    </p>
                )}
                
                {/* Message Text */}
                {/* Added 'whitespace-pre-wrap' for better handling of newlines from backend/input */}
                <p className="text-base break-words pb-0.5 pr-10 whitespace-pre-wrap"> 
                    {message.text}
                </p>

                {/* Timestamp Container */}
                {/* Removed MessageStatusIcon call */}
                <div className={`absolute bottom-1 right-2 flex items-center ${isSentByMe ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <span className="text-xs">
                        {formattedTime}
                    </span>
                    {/* Placeholder for future status icon (e.g., a simple checkmark for SENT) */}
                </div>

            </div>
        </div>
    );
}
