// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import io from 'socket.io-client';
// // // Change: Import URLs from the central config file.
// // import { CHAT_SERVER_URL, API_SERVER_URL } from '../chat/lib/config';

// // const API_URL = `${API_SERVER_URL}/api/messages`;
// // let socket;

// // // Raw message data (replace with actual API fetch later)
// // const rawMessagesData = [
// //   // --- Messages for Alice (id: '1') ---
// //   {
// //     id: 'msg-101',
// //     chatId: '1',
// //     senderId: 'Alice', // Assuming senderId is the name for simplicity in this mock data
// //     text: 'Hey there! Long time no talk. How have you been?',
// //     timestamp: new Date('2025-10-01T09:00:00Z').getTime(),
// //     isMe: false, // Alice sent this
// //   },
// //   {
// //     id: 'msg-102',
// //     chatId: '1',
// //     senderId: 'currentUser',
// //     text: 'I\'m doing great, thanks! Just working on this new chat app interface. 🙂',
// //     timestamp: new Date('2025-10-01T09:01:30Z').getTime(),
// //     isMe: true, // You sent this
// //   },
// //   {
// //     id: 'msg-103',
// //     chatId: '1',
// //     senderId: 'Alice',
// //     text: 'That sounds like fun! See you soon!',
// //     timestamp: new Date('2025-10-01T09:02:45Z').getTime(),
// //     isMe: false,
// //   },

// //   // --- Messages for Bob (id: '2') ---
// //   {
// //     id: 'msg-201',
// //     chatId: '2',
// //     senderId: 'currentUser',
// //     text: 'Did we confirm the meeting time?',
// //     timestamp: new Date('2025-09-30T14:30:00Z').getTime(),
// //     isMe: true,
// //   },
// //   {
// //     id: 'msg-202',
// //     chatId: '2',
// //     senderId: 'Bob',
// //     text: 'Yes, it\'s rescheduled to 2 PM.',
// //     timestamp: new Date('2025-09-30T14:31:15Z').getTime(),
// //     isMe: false,
// //   },

// //   // --- Messages for Charlie (id: '3') ---
// //   {
// //     id: 'msg-301',
// //     chatId: '3',
// //     senderId: 'currentUser',
// //     text: 'Are you available to debug that issue?',
// //     timestamp: new Date('2025-09-28T11:05:00Z').getTime(),
// //     isMe: true,
// //   },
// // ];

// // // Change: The hook now accepts the current user's name.
// // export const useChatManager = (currentUser, activeChatId) => {
// //   const [activeChatId, setActiveChatId] = useState(sampleChats[0]?.id || null);
// //   const [allMessages, setAllMessages] = useState(rawMessagesData);
// //   const { messages, isLoading, error, isConnected, sendMessage, isTyping } =
// //     // The previous error occurred because this line was likely before useState
// //     useChatManager(currentUser, activeChatId); 

// //   // Connection logic remains similar but uses the centralized URL
// //   const connectSocket = useCallback(() => {
// //     if (socket) return;

// //     // Change: Use URL from config
// //     socket = io(CHAT_SERVER_URL);

// //     socket.on('connect', () => setIsConnected(true));
// //     socket.on('disconnect', () => setIsConnected(false));
// //     socket.on('connect_error', (err) => {
// //       console.error("WebSocket connection error:", err);
// //       setError("Failed to connect to the chat server.");
// //     });
// //     socket.on('message', (msg) => {
// //       // Add a check to prevent echoing messages sent by the current user
// //       // if the server broadcasts to all clients including the sender.
// //       if (msg.user !== currentUser) {
// //         // Check 2 (Optional, but good practice): Ensure it has a chatId
// //         if (msg.chatId) {
// //           // Update the internal state containing ALL messages
// //           setAllMessages(prevAllMessages => [...prevAllMessages, msg]);
// //         }
// //       }
// //     });
// //     socket.on('typing', (data) => setIsTyping(data.isTyping));
// //   }, [currentUser]); // Added currentUser dependency

// //   // const fetchMessages = useCallback(async () => {
// //   //   try {
// //   //     setIsLoading(true);
// //   //     const response = await fetch(API_URL);
// //   //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //   //     const data = await response.json();
// //   //     setMessages(data);
// //   //   } catch (err) {
// //   //     console.error("Failed to fetch messages:", err);
// //   //     setError("Failed to load message history.");
// //   //   } finally {
// //   //     setIsLoading(false);
// //   //   }
// //   // }, []);

// //   useEffect(() => {
// //     // fetchMessages();
// //     connectSocket();
// //     return () => {
// //       if (socket) {
// //         socket.disconnect();
// //         socket = null; // Clean up the instance
// //       }
// //     };
// //   }, [connectSocket]); //[fetchMessages, connectSocket]);

// //   // Use useEffect to filter the messages whenever the active chat changes
// //   useEffect(() => {
// //       // 1. Check if a chat is selected
// //       if (activeChatId) {
// //           // 2. Filter the entire message history by the activeChatId
// //           const filteredMessages = allMessages
// //               .filter(msg => String(msg.chatId) === String(activeChatId))
// //               .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
              
// //           // 3. Update the 'messages' state (the one being displayed)
// //           setMessages(filteredMessages);
// //       } else {
// //           // If no chat is active, clear the display messages
// //           setMessages([]);
// //       }
      
// //       // The effect runs when the active chat or the source message list changes
// //   }, [activeChatId, allMessages]);

// //   // Change: No longer needs 'user' as a parameter, as it's known from the hook's scope.
// //   const sendMessage = useCallback((text) => {
// //     if (socket && isConnected && currentUser && activeChatId) {
// //       const message = {
// //         user: currentUser,
// //         text,
// //         chatId: activeChatId,
// //         timestamp: new Date().toISOString(),
// //         id: `${currentUser}-${Date.now()}` // Add a temporary client-side ID
// //       };
// //       socket.emit('message', message);
// //       // Add the message to our own state immediately for a better UX
// //       setAllMessages(prevAllMessages => [...prevAllMessages, message]); 
// //     } else {
// //       console.error("Socket is not connected or user is not defined.");
// //     }
// //   }, [isConnected, currentUser, activeChatId]);

// //   return { messages, isLoading, isConnected, error, sendMessage, isTyping };
// // };

// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import io from 'socket.io-client';
// // // Change: Import URLs from the central config file.
// // import { CHAT_SERVER_URL, API_SERVER_URL } from '../chat/lib/config';

// // const API_URL = `${API_SERVER_URL}/api/messages`;
// // let socket;

// // // Raw message data (used as the initial state for allMessages)
// // const rawMessagesData = [
// //   // NOTE: The 'user' key is used for socket logic, 'senderId' for display (if needed).
// //   // Ensure consistency: 'currentUser' matches the user passed to the hook.
// //   { id: 'msg-101', chatId: '1', user: 'Alice', senderId: 'Alice', text: 'Hey there! Long time no talk. How have you been?', timestamp: new Date('2025-10-01T09:00:00Z').getTime(), isMe: false },
// //   { id: 'msg-102', chatId: '1', user: 'currentUser', senderId: 'currentUser', text: 'I\'m doing great, thanks! Just working on this new chat app interface. 🙂', timestamp: new Date('2025-10-01T09:01:30Z').getTime(), isMe: true },
// //   { id: 'msg-103', chatId: '1', user: 'Alice', senderId: 'Alice', text: 'That sounds like fun! See you soon!', timestamp: new Date('2025-10-01T09:02:45Z').getTime(), isMe: false },

// //   { id: 'msg-201', chatId: '2', user: 'currentUser', senderId: 'currentUser', text: 'Did we confirm the meeting time?', timestamp: new Date('2025-09-30T14:30:00Z').getTime(), isMe: true },
// //   { id: 'msg-202', chatId: '2', user: 'Bob', senderId: 'Bob', text: 'Yes, it\'s rescheduled to 2 PM.', timestamp: new Date('2025-09-30T14:31:15Z').getTime(), isMe: false },

// //   { id: 'msg-301', chatId: '3', user: 'currentUser', senderId: 'currentUser', text: 'Are you available to debug that issue?', timestamp: new Date('2025-09-28T11:05:00Z').getTime(), isMe: true },
// // ];

// // /**
// //  * Custom hook to manage WebSocket connection, message history, and filtering.
// //  * @param {string} currentUser - The ID/name of the current authenticated user.
// //  * @param {string | null} activeChatId - The ID of the currently selected chat room.
// //  */
// // export const useChatManager = (currentUser, activeChatId) => {
// //   // 🌟 FIX 1: Defines the internal state for ALL messages (initialized with mock data).
// //   const [allMessages, setAllMessages] = useState(rawMessagesData);
  
// //   // 🌟 FIX 2: This holds the FILTERED messages for display in the component.
// //   const [messages, setMessages] = useState([]); 
  
// //   // The other necessary state variables for the hook
// //   const [isConnected, setIsConnected] = useState(false);
// //   // Set to false since API fetch is commented out (Fixes the hanging loader)
// //   const [isLoading, setIsLoading] = useState(false); 
// //   const [error, setError] = useState(null);
// //   const [isTyping, setIsTyping] = useState(false);


// //   // Connection logic remains similar
// //   const connectSocket = useCallback(() => {
// //     if (socket) return;

// //     socket = io(CHAT_SERVER_URL);

// //     socket.on('connect', () => setIsConnected(true));
// //     socket.on('disconnect', () => setIsConnected(false));
// //     socket.on('connect_error', (err) => {
// //       console.error("WebSocket connection error:", err);
// //       setError("Failed to connect to the chat server.");
// //     });
    
// //     // Update listener to use the internal setAllMessages state
// //     socket.on('message', (msg) => {
// //       if (msg.user !== currentUser) { // Only process messages from others (non-echo)
// //         if (msg.chatId) {
// //           setAllMessages(prevAllMessages => [...prevAllMessages, msg]);
// //         }
// //       }
// //     });
// //     socket.on('typing', (data) => setIsTyping(data.isTyping));
// //   }, [currentUser]); 

// //   // Socket Lifecycle Management
// //   useEffect(() => {
// //     connectSocket();
// //     return () => {
// //       if (socket) {
// //         socket.disconnect();
// //         socket = null; 
// //       }
// //     };
// //   }, [connectSocket]);

// //   // 🌟 FILTERING LOGIC: Runs when the active chat or the source message list changes
// //   useEffect(() => {
// //       if (activeChatId) {
// //           // Filter and sort the messages for the currently selected chat
// //           const filteredMessages = allMessages
// //               .filter(msg => String(msg.chatId) === String(activeChatId))
// //               .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
              
// //           // Update the state that the main component consumes
// //           setMessages(filteredMessages);
// //       } else {
// //           setMessages([]);
// //       }
// //   }, [activeChatId, allMessages]);

// //   // Send Message Logic
// //   const sendMessage = useCallback((text) => {
// //     // Ensure a chat is active and connected before sending
// //     if (socket && isConnected && currentUser && activeChatId) {
// //       const message = {
// //         user: currentUser,
// //         text,
// //         chatId: activeChatId, // Include chatId
// //         timestamp: Date.now(),
// //         id: `${currentUser}-${Date.now()}`
// //       };
// //       socket.emit('message', message);
// //       // Optimistically update the internal state
// //       setAllMessages(prevAllMessages => [...prevAllMessages, message]); 
// //     } else {
// //       console.error("Socket is not connected, or user/active chat is not defined.");
// //     }
// //   }, [isConnected, currentUser, activeChatId]); // Added activeChatId dependency

// //   // Return the filtered messages
// //   return { messages, isLoading, isConnected, error, sendMessage, isTyping };
// // };

// // 'use client';

// // import { useState, useEffect, useCallback, useMemo } from 'react';
// // import io from 'socket.io-client';
// // import axios from 'axios';
// // import { CHAT_SERVER_URL, API_SERVER_URL } from '../chat/lib/config';

// // // NOTE: We assume the Flask backend serves the chat API at /messages
// // const API_MESSAGES_ENDPOINT = `${API_SERVER_URL}/messages`;
// // let socket;

// // // --- Helper for Filtering Messages ---
// // const getInitialMessages = (allMsgs, chatId) => {
// //     if (!chatId) return [];
// //     return allMsgs
// //         .filter(msg => String(msg.chatId) === String(chatId))
// //         .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
// // };

// // /**
// //  * Custom hook to manage WebSocket connection, message history, and filtering.
// //  * @param {string} currentUser - The ID/name of the current authenticated user (e.g., user ID).
// //  * @param {string | null} activeChatId - The ID of the currently selected chat room.
// //  */
// // export const useChatManager = (currentUser, activeChatId) => {
    
// //     const [allMessages, setAllMessages] = useState([]);
// //     const [messages, setMessages] = useState([]); 
    
// //     const [isConnected, setIsConnected] = useState(false);
// //     const [isLoading, setIsLoading] = useState(true); 
// //     const [error, setError] = useState(null);
// //     const [isTyping, setIsTyping] = useState(false);

// //     // --- API Fetch Logic ---
// //     const fetchMessages = useCallback(async (token) => {
// //         if (!currentUser || !token) {
// //             setError("Authentication required to fetch messages.");
// //             setIsLoading(false);
// //             return;
// //         }
        
// //         setIsLoading(true);
// //         setError(null);

// //         try {
// //             const response = await axios.get(API_MESSAGES_ENDPOINT, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //                 params: {
// //                     userId: currentUser,
// //                 }
// //             });

// //             setAllMessages(response.data); 
// //         } catch (err) {
// //             console.error("Failed to fetch message history:", err);
// //             setError(err.response?.data?.message || "Failed to load message history from server.");
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     }, [currentUser]);

// //     // --- Socket Connection Logic ---
// //     const connectSocket = useCallback(() => {
// //         if (socket) return;
// //         socket = io(CHAT_SERVER_URL);

// //         socket.on('connect', () => setIsConnected(true));
// //         socket.on('disconnect', () => setIsConnected(false));
// //         socket.on('connect_error', (err) => {
// //             console.error("WebSocket connection error:", err);
// //             setError("Failed to connect to the chat server.");
// //         });
        
// //         socket.on('message', (msg) => {
// //             if (msg.user !== currentUser) { 
// //                 if (msg.chatId) {
// //                     setAllMessages(prevAllMessages => [...prevAllMessages, msg]);
// //                 }
// //             }
// //         });
        
// //         socket.on('typing', (data) => {
// //             if (String(data.chatId) === String(activeChatId) && data.user !== currentUser) {
// //                 setIsTyping(data.isTyping);
// //             } else if (String(data.chatId) !== String(activeChatId)) {
// //                 setIsTyping(false); 
// //             }
// //         });

// //     }, [currentUser, activeChatId]); // activeChatId needs to be a dependency for the typing listener update

// //     // --- Main Lifecycle Effect (Fetch & Connect) ---
// //     useEffect(() => {
// //         const token = localStorage.getItem('access_token');
// //         if (!token) {
// //             console.warn("No access token found. Cannot fetch messages.");
// //         }
        
// //         fetchMessages(token);
// //         connectSocket();
        
// //         return () => {
// //             if (socket) {
// //                 socket.disconnect();
// //                 socket = null; 
// //             }
// //         };
// //     }, [fetchMessages, connectSocket]); 
    
// //     // -------------------------------------------------------------------
// //     // 🌟 CRITICAL NEW EFFECT: Manage Socket.IO Chat Rooms
// //     // -------------------------------------------------------------------
// //     useEffect(() => {
// //         // Only run if the socket is connected and an active chat is selected
// //         if (isConnected && socket && activeChatId) {
// //             console.log(`Attempting to join chat room: ${activeChatId}`);
            
// //             // 1. Tell the server to join the new room
// //             socket.emit('join_chat', { chatId: activeChatId, user: currentUser });

// //             // Note: Since Socket.IO handles leaving automatically if the server manages
// //             // rooms correctly, we primarily focus on joining the new one here.
// //             // If the socket reconnects (e.g., connection drop), this will rerun and rejoin.
// //         }

// //         // Cleanup: This part is tricky. Socket.IO doesn't have a simple 'leave_chat'
// //         // event built in. The server handles it when the client disconnects or 
// //         // explicitly joins a different room. For this hook, we rely on the server
// //         // to manage the room membership when a client joins a new one.
        
// //     }, [isConnected, activeChatId, currentUser]); // Reruns when chat switches or connection status changes
// //     // -------------------------------------------------------------------

// //     // --- Filtering Logic ---
// //     useEffect(() => {
// //         setMessages(getInitialMessages(allMessages, activeChatId));
// //     }, [activeChatId, allMessages]);


// //     // --- Send Message Logic ---
// //     const sendMessage = useCallback((text) => {
// //         if (socket && isConnected && currentUser && activeChatId) {
// //             const message = {
// //                 user: currentUser,
// //                 text,
// //                 chatId: activeChatId, 
// //                 timestamp: Date.now(),
// //                 id: `${currentUser}-${Date.now()}`
// //             };
// //             socket.emit('message', message);
// //             setAllMessages(prevAllMessages => [...prevAllMessages, message]); 
// //         } else {
// //             console.error("Cannot send message: Socket is not ready or chat not defined.");
// //         }
// //     }, [isConnected, currentUser, activeChatId]);


// //     // --- Send Typing Status Logic ---
// //     const sendTypingStatus = useCallback((isTyping) => {
// //         if (socket && isConnected && currentUser && activeChatId) {
// //             socket.emit('typing', {
// //                 user: currentUser,
// //                 chatId: activeChatId,
// //                 isTyping: isTyping,
// //             });
// //         }
// //     }, [isConnected, currentUser, activeChatId]);


// //     // Return the necessary state and functions
// //     return { 
// //         messages, 
// //         isLoading, 
// //         isConnected, 
// //         error, 
// //         sendMessage, 
// //         isTyping,
// //         sendTypingStatus,
// //     };
// // };

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { CHAT_SERVER_URL, API_SERVER_URL } from '../chat/lib/config';

// // The API endpoint for fetching chat messages
// const API_MESSAGES_ENDPOINT = `${API_SERVER_URL}/api/messages`;
// let socket;

// /**
//  * Custom hook to manage WebSocket connection, message history, and filtering.
//  * This version safely loads authentication tokens on the client side only.
//  */
// export const useChatManager = (activeChatId) => {
    
//     // FIX: Initialize token and user with state, not direct localStorage access
//     const [currentUser, setCurrentUser] = useState(null);
//     const [token, setToken] = useState(null);
    
//     // State declarations
//     const [allMessages, setAllMessages] = useState([]); 
//     const [messages, setMessages] = useState([]); 
//     const [isConnected, setIsConnected] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); 
//     const [error, setError] = useState(null);
//     const [isTyping, setIsTyping] = useState(false);


//     // NEW EFFECT: Load token and user ID on the client side only (after mounting)
//     useEffect(() => {
//         // Check if window (browser environment) exists
//         if (typeof window !== 'undefined') {
//             const storedToken = localStorage.getItem('access_token');
//             const storedUser = localStorage.getItem('user_id');
            
//             // Set state only if values are found
//             if (storedToken && storedUser) {
//                 setToken(storedToken);
//                 setCurrentUser(storedUser);
//                 setIsLoading(true); // Start loading immediately after tokens are found
//             }
//         }
//     }, []); // Runs once on the client side after the initial SSR render

//     // --- API Fetch Logic ---
//     const fetchMessages = useCallback(async () => {
        
//         if (!currentUser || !token) {
//             console.warn("No access token or user ID found. Cannot fetch messages.");
//             setError("Authentication required to fetch messages.");
//             setIsLoading(false);
//             return;
//         }
        
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.get(API_MESSAGES_ENDPOINT, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 params: activeChatId ? { chatId: activeChatId } : {}
//             });
//             setAllMessages(response.data); 
//         } catch (err) {
//             console.error("Failed to fetch message history:", err);
//             if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                 setError("Session expired. Please log in again.");
//             } else {
//                 setError(err.response?.data?.detail || "Failed to load message history from server.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     }, [currentUser, token, activeChatId]);


//     // --- Socket Connection Logic ---
//     const connectSocket = useCallback(() => {
        
//         if (!currentUser) {
//             if (socket) {
//                 socket.disconnect();
//                 socket = null;
//             }
//             setIsConnected(false);
//             return;
//         }

//         if (socket) return; 
        
//         // Proceed with connection
//         socket = io(CHAT_SERVER_URL, {
//             query: { userId: currentUser, token: token }
//         });

//         socket.on('connect', () => setIsConnected(true));
//         socket.on('disconnect', () => setIsConnected(false));
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket connection error:", err);
//             setError("Failed to connect to the chat server.");
//         });
        
//         // 💡 CHANGE: The server should now send a message back only from other users
//         // If the server is updated to use Socket.IO acknowledgments, 
//         // this handler now only needs to handle messages from OTHERS.
//         socket.on('message', (msg) => {
//             // Note: The message is added optimistically in sendMessage. 
//             // We only add it here if it's NOT the current user's message.
//             if (msg.user !== currentUser) { 
//                 setAllMessages(prevAllMessages => [...prevAllMessages, msg]);
//             }
//         });
        
//         socket.on('typing', (data) => {
//             if (String(data.chatId) === String(activeChatId) && data.user !== currentUser) {
//                 setIsTyping(data.isTyping);
//             } else {
//                 setIsTyping(false); 
//             }
//         });

//     }, [currentUser, token, activeChatId]); 

//     // --- Main Lifecycle Effect (Fetch & Connect - DEPENDS ON STATE) ---
//     useEffect(() => {
//         if (currentUser && token) {
//             fetchMessages(); 
//             connectSocket();
//         }
        
//         return () => {
//             if (socket) {
//                 socket.disconnect();
//                 socket = null; 
//             }
//         };
//     }, [currentUser, token, fetchMessages, connectSocket]); 
    
//     // --- Room Joining & Filtering Logic (Unchanged) ---
//     useEffect(() => {
//         if (isConnected && socket && activeChatId) {
//             console.log(`Attempting to join chat room: ${activeChatId}`);
//             socket.emit('join_chat', { chatId: activeChatId, user: currentUser });
//         }
//     }, [isConnected, activeChatId, currentUser]); 

//     useEffect(() => {
//         if (activeChatId) {
//             const filteredMessages = allMessages
//                 .filter(msg => String(msg.chatId) === String(activeChatId))
//                 .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
//             setMessages(filteredMessages);
//         } else {
//             setMessages([]);
//         }
//     }, [activeChatId, allMessages]);

//     // --- Send Message Logic (UPDATED for Acknowledgment) ---
//     const sendMessage = useCallback((text) => { 
//         if (socket && isConnected && currentUser && activeChatId) {
//             const tempId = `${currentUser}-${Date.now()}`;
            
//             // Message structure with a temporary ID for optimistic display
//             const message = {
//                 user: currentUser, 
//                 text,
//                 chatId: activeChatId, 
//                 timestamp: Date.now(),
//                 id: tempId, // Temporary client-side ID
//             };
            
//             // Optimistically update the internal state for instant display
//             setAllMessages(prevAllMessages => [...prevAllMessages, message]); 
            
//             // 💡 CRITICAL CHANGE: Pass the acknowledgment function as the last argument
//             socket.emit('message', message, (response) => {
//                 if (response.status === 'ok') {
//                     // Message successfully saved and broadcasted by server.
//                     // If the server sends back the new MongoDB _id, you could replace the message here.
//                     console.log("Message confirmed by server.");
//                 } else {
//                     // Handle server failure (e.g., delete the optimistically added message)
//                     console.error("Server failed to process message:", response.detail);
//                     // ⚠️ ROLLBACK: Remove the message added optimistically
//                     setAllMessages(prevAllMessages => 
//                         prevAllMessages.filter(msg => msg.id !== tempId)
//                     );
//                     setError("Failed to send message. Please try again.");
//                 }
//             });

//         } else {
//             console.error("Cannot send message: Socket is not ready or chat not defined.");
//             setError("Connection not ready. Cannot send message.");
//         }
//     }, [isConnected, currentUser, activeChatId]);

//     const sendTypingStatus = useCallback((isTyping) => { 
//         if (socket && isConnected && currentUser && activeChatId) {
//             socket.emit('typing', {
//                 user: currentUser,
//                 chatId: activeChatId,
//                 isTyping: isTyping,
//             });
//         }
//     }, [isConnected, currentUser, activeChatId]);


//     // Return the necessary state and functions
//     return { 
//         messages, 
//         isLoading, 
//         isConnected, 
//         error, 
//         sendMessage, 
//         isTyping,
//         sendTypingStatus,
//     };
// };

'use client';

import { useState, useEffect, useCallback } from 'react';

// A unique key for storing messages in localStorage
const LOCAL_STORAGE_KEY = 'chat-app-messages';

/**
 * A custom hook to manage chat state, including sending, receiving,
 * and persisting messages using localStorage.
 * @param {string} currentUser - The name of the current user.
 * @param {string | null} activeChatId - The ID of the currently active chat.
 */
export const useChatManager = (currentUser, activeChatId) => {
  // --- STATE MANAGEMENT ---

  // State for ALL messages across all chats, loaded from localStorage
  const [allMessages, setAllMessages] = useState(() => {
    // This function runs only once on component mount to initialize state
    // It's wrapped in a try-catch block to handle potential parsing errors
    try {
      if (typeof window !== 'undefined') {
        const savedMessages = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        // If messages are found in localStorage, parse and return them
        return savedMessages ? JSON.parse(savedMessages) : [];
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage:", error);
    }
    // Return an empty array if nothing is saved or if an error occurs
    return [];
  });

  // State for the messages that should be displayed in the CURRENTLY active chat
  const [messages, setMessages] = useState([]);
  
  // --- EFFECTS ---

  // EFFECT 1: Save messages to localStorage whenever `allMessages` changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allMessages));
    } catch (error) {
      console.error("Failed to save messages to localStorage:", error);
    }
  }, [allMessages]); // This effect runs every time the allMessages array is updated

  // EFFECT 2: Filter messages whenever the active chat changes.
  useEffect(() => {
    if (activeChatId) {
      const filtered = allMessages
        .filter(msg => String(msg.chatId) === String(activeChatId))
        .sort((a, b) => a.timestamp - b.timestamp); // Ensure messages are in order
      setMessages(filtered);
    } else {
      // If no chat is selected, display no messages
      setMessages([]);
    }
  }, [activeChatId, allMessages]); // Reruns when the chat changes or when a new message is added


  // --- FUNCTIONS ---

  /**
   * Handles sending a new message.
   * It creates a message object and adds it to the central `allMessages` state.
   */
  const sendMessage = useCallback((text) => {
    // Prevent sending empty messages or if user/chat isn't defined
    if (!text.trim() || !currentUser || !activeChatId) {
      return;
    }

    const newMessage = {
      id: `${currentUser}-${Date.now()}`, // A unique ID for the message
      chatId: activeChatId,
      user: currentUser,
      text: text.trim(),
      timestamp: Date.now(),
    };

    // Optimistically update the UI by adding the new message to the state
    // This makes the app feel fast, as the message appears instantly
    setAllMessages(prevMessages => [...prevMessages, newMessage]);

  }, [currentUser, activeChatId]); // Dependencies for the function


  // The hook returns the state and functions needed by the UI components
  return {
    messages,       // The filtered messages for the active chat
    sendMessage,    // The function to send a new message
    isLoading: false, // No longer loading from a server, so set to false
    error: null,      // No server errors to report in this setup
  };
};
