'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';
const socket = io(BACKEND_URL, { autoConnect: false });

const userId = 'user-123'; // Static user ID for demonstration
const userName = 'Alice'; // Static user name for demonstration

// Utility function to get avatar color
const getAvatarColor = (username) => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-yellow-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500'
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

// Avatar Component
const Avatar = ({ name, bgColor, size = "w-12 h-12", isAI = false }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className={`relative flex items-center justify-center rounded-full text-white font-bold text-xl flex-shrink-0 ${size} ${bgColor}`}>
      {isAI ? '🤖' : initial}
      {isAI && (
        <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
      )}
    </div>
  );
};

// ReactionPicker Component
const ReactionPicker = ({ onSelect, onClose, position }) => {
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉'];

  return (
    <div className={`absolute top-0 transform -translate-y-full bg-white p-2 rounded-xl shadow-lg border border-gray-200 flex space-x-1 ${position === 'left' ? 'left-0' : 'right-0'}`}>
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="p-1 rounded-full text-xl hover:bg-gray-100 transition-colors"
        >
          {emoji}
        </button>
      ))}
      <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// PollCreator Component
const PollCreator = ({ pollQuestion, pollOptions, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = (optionId) => {
    if (!selectedOption) {
      setSelectedOption(optionId);
      onVote(optionId);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <h3 className="font-semibold text-lg mb-2">{pollQuestion}</h3>
      <div className="space-y-2">
        {pollOptions.map(option => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            className={`w-full p-2 text-left rounded-lg transition-colors ${selectedOption === option.id ? 'bg-[#25D366] text-white' : 'bg-white hover:bg-gray-200'}`}
            disabled={!!selectedOption}
          >
            <span className="font-medium">{option.text}</span>
            {selectedOption && <span className="ml-2 text-sm opacity-70">({option.votes} votes)</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main ChatApp Component
export default function ChatApp() {
  const [chatMode, setChatMode] = useState('group');
  const [chatInput, setChatInput] = useState('');
  const [chatHistoryMap, setChatHistoryMap] = useState({
    group: [],
    'one-to-one': [],
    ai: [],
  });
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState('');
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [selectedMessageForReaction, setSelectedMessageForReaction] = useState(null);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [aiResponseLoading, setAiResponseLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState([{ id: '1', text: '' }, { id: '2', text: '' }]);

  const chatMessagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Initial data fetch and WebSocket setup
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/users?userId=${userId}`);
        const users = await response.json();
        setAllRegisteredUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();

    socket.connect();
    const roomId = chatMode === 'group' ? 'group_chat_room' : selectedChatUser?._id || 'ai_room';

    socket.on('connect', () => {
      console.log('Connected to WebSocket server.');
      if (roomId) {
        socket.emit('joinRoom', roomId);
      }
    });

    socket.on('message', (newMessage) => {
      setChatHistoryMap(prevMap => {
        const currentHistory = prevMap[newMessage.chatMode] || [];
        if (!currentHistory.some(msg => msg.id === newMessage.id)) {
          return {
            ...prevMap,
            [newMessage.chatMode]: [...currentHistory, newMessage]
          };
        }
        return prevMap;
      });
    });

    socket.on('messageEdited', (updatedMessage) => {
      setChatHistoryMap(prevMap => {
        const updatedMessages = prevMap[chatMode].map(msg =>
          msg.id === updatedMessage.id ? { ...msg, text: updatedMessage.text, edited: true } : msg
        );
        return { ...prevMap, [chatMode]: updatedMessages };
      });
    });

    socket.on('messageReaction', (data) => {
      const { messageId, emoji } = data;
      setChatHistoryMap(prevMap => {
        const updatedMessages = prevMap[chatMode].map(msg => {
          if (msg.id === messageId) {
            const newReactions = { ...msg.reactions };
            newReactions[emoji] = (newReactions[emoji] || 0) + 1;
            return { ...msg, reactions: newReactions };
          }
          return msg;
        });
        return { ...prevMap, [chatMode]: updatedMessages };
      });
    });

    socket.on('messageStatus', ({ messageId, status }) => {
      setChatHistoryMap(prevMap => {
        const updatedMessages = prevMap[chatMode].map(msg =>
          msg.id === messageId ? { ...msg, status } : msg
        );
        return { ...prevMap, [chatMode]: updatedMessages };
      });
    });

    socket.on('typing', ({ senderName }) => {
      setTypingUsers(prev => [...new Set([...prev, senderName])]);
    });

    socket.on('stopTyping', ({ senderName }) => {
      setTypingUsers(prev => prev.filter(name => name !== senderName));
    });

    return () => {
      if (roomId) {
        socket.emit('leaveRoom', roomId);
      }
      socket.off('connect');
      socket.off('message');
      socket.off('messageEdited');
      socket.off('messageReaction');
      socket.off('messageStatus');
      socket.off('typing');
      socket.off('stopTyping');
      socket.disconnect();
    };
  }, [chatMode, selectedChatUser]);

  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistoryMap]);

  // User Interactions
  const handleChatModeChange = (mode) => {
    setChatMode(mode);
    setEditingMessageId(null);
    setEditingMessageText('');
    setIsSidebarOpen(false);
    if (mode === 'ai') {
      setSelectedChatUser({ username: 'AI Assistant', _id: 'ai_room' });
    } else if (mode === 'one-to-one' && allRegisteredUsers.length > 0) {
      setSelectedChatUser(allRegisteredUsers[0]);
    } else {
      setSelectedChatUser(null);
    }
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
    const roomId = chatMode === 'group' ? 'group_chat_room' : selectedChatUser?._id || 'ai_room';
    if (e.target.value.length > 0) {
      socket.emit('typing', { senderName: userName, roomId });
    } else {
      socket.emit('stopTyping', { senderName: userName, roomId });
    }
  };

  const handleSendMessage = async (type = 'text', content = {}) => {
    if (editingMessageId) {
      handleSaveEdit();
      return;
    }
    if (chatInput.trim() === '' && type === 'text') {
      return;
    }

    const roomId = chatMode === 'group' ? 'group_chat_room' : selectedChatUser?._id || 'ai_room';
    const newMessage = {
      id: uuidv4(),
      sender: userName,
      originalSenderId: userId,
      text: type === 'text' ? chatInput.trim() : '',
      timestamp: new Date().toISOString(),
      type,
      ...content,
      edited: false,
      reactions: {},
      chatMode,
      roomId,
      status: 'sent',
    };

    // Optimistically add the message to chat history
    setChatHistoryMap(prevMap => ({
      ...prevMap,
      [chatMode]: [...(prevMap[chatMode] || []), newMessage]
    }));

    setChatInput('');
    socket.emit('stopTyping', { senderName: userName, roomId });

    if (chatMode === 'ai') {
      setAiResponseLoading(true);
    } else {
      socket.emit('sendMessage', newMessage);
      // Simulate delivered/read status
      setTimeout(() => {
        setChatHistoryMap(prevMap => {
          const updatedMessages = prevMap[chatMode].map(msg =>
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          );
          return { ...prevMap, [chatMode]: updatedMessages };
        });
        socket.emit('messageStatus', { messageId: newMessage.id, status: 'delivered', roomId });
        setTimeout(() => {
          setChatHistoryMap(prevMap => {
            const updatedMessages = prevMap[chatMode].map(msg =>
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            );
            return { ...prevMap, [chatMode]: updatedMessages };
          });
          socket.emit('messageStatus', { messageId: newMessage.id, status: 'read', roomId });
        }, 1000);
      }, 1000);
    }
  };

  const handleSaveEdit = () => {
    if (editingMessageId && editingMessageText.trim() !== '') {
      const roomId = chatMode === 'group' ? 'group_chat_room' : selectedChatUser?._id || 'ai_room';
      const updatedMessage = {
        id: editingMessageId,
        text: editingMessageText.trim(),
        roomId,
      };
      socket.emit('editMessage', updatedMessage);
      setEditingMessageId(null);
      setEditingMessageText('');
      setChatInput('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingMessageText('');
    setChatInput('');
  };

  const handleEditClick = (msg) => {
    setEditingMessageId(msg.id);
    setEditingMessageText(msg.text);
    setChatInput(msg.text);
  };

  const handleMessageClick = (msg) => {
    setSelectedMessageForReaction(msg);
    setShowReactionPicker(true);
  };

  const handleReactionSelect = (emoji) => {
    if (!selectedMessageForReaction) return;
    const roomId = selectedMessageForReaction.roomId;
    socket.emit('reactToMessage', {
      messageId: selectedMessageForReaction.id,
      emoji,
      senderId: userId,
      roomId,
    });
    setShowReactionPicker(false);
    setSelectedMessageForReaction(null);
  };

  const handleClearChat = () => {
    setChatHistoryMap(prev => ({
      ...prev,
      [chatMode]: []
    }));
  };

  const handleStartVoiceChat = async () => {
    if (isVoiceChatActive) {
      setIsVoiceChatActive(false);
      console.log("Voice chat ended.");
    } else {
      setIsVoiceChatActive(true);
      console.log("Voice chat started.");
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `http://maps.google.com/?q=${latitude},${longitude}`;
        handleSendMessage('location', { locationUrl, locationName: `My Location` });
      });
    }
  };

  const handleCreatePoll = () => {
    setIsCreatingPoll(true);
    setNewPollQuestion('');
    setNewPollOptions([{ id: '1', text: '' }, { id: '2', text: '' }]);
  };

  const handleSendPoll = () => {
    if (newPollQuestion.trim() === '' || newPollOptions.some(opt => opt.text.trim() === '')) {
      return;
    }
    const pollData = {
      pollQuestion: newPollQuestion,
      pollOptions: newPollOptions.map(opt => ({ ...opt, votes: 0 })),
    };
    handleSendMessage('poll', pollData);
    setIsCreatingPoll(false);
  };

  const handlePollVote = (messageId, optionId) => {
    const roomId = chatMode === 'group' ? 'group_chat_room' : selectedChatUser?._id || 'ai_room';
    socket.emit('votePoll', { messageId, optionId, roomId });
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { url } = await response.json();
        handleSendMessage('image', { imageUrl: `${BACKEND_URL}${url}` });
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Network error during image upload:", error);
    }
  };

  const handleDocumentFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { url } = await response.json();
        handleSendMessage('document', { documentUrl: `${BACKEND_URL}${url}`, documentName: file.name });
      } else {
        console.error("Document upload failed.");
      }
    } catch (error) {
      console.error("Network error during document upload:", error);
    }
  };

  const chatMessages = chatHistoryMap[chatMode] || [];

  // Chat Message Component
  const ChatMessage = ({ msg, isUser, onReact, onEdit }) => {
    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isEditing = editingMessageId === msg.id;
    const senderColor = msg.originalSenderId === 'AI' ? 'bg-teal-600' : getAvatarColor(msg.sender);

    const renderReadReceipt = () => {
      if (!isUser) return null;
      if (msg.status === 'read') {
        return (
          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M9 13l4 4" />
          </svg>
        );
      } else if (msg.status === 'delivered') {
        return (
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      } else {
        return (
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4" />
          </svg>
        );
      }
    };

    const renderMessageContent = () => {
      if (isEditing) {
        return (
          <input
            type="text"
            value={editingMessageText}
            onChange={(e) => setEditingMessageText(e.target.value)}
            className="w-full bg-white text-gray-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
          />
        );
      }
      switch (msg.type) {
        case 'text':
          return (
            <div className="flex flex-col">
              <span>{msg.text}</span>
              {msg.edited && (
                <span className="text-xs text-gray-400 mt-1 self-end">(edited)</span>
              )}
            </div>
          );
        case 'image':
          return (
            <div className="max-w-xs overflow-hidden rounded-xl cursor-pointer">
              <img src={msg.imageUrl} alt="Shared" className="rounded-xl object-cover w-full h-auto transform hover:scale-105 transition-transform duration-300" />
            </div>
          );
        case 'document':
          return (
            <a href={msg.documentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 18H8v-2h4v2zm-4-4h8v-2H8v2zm8-4H8v-2h8v2z" />
              </svg>
              <span className="font-medium truncate max-w-[150px]">{msg.documentName}</span>
            </a>
          );
        case 'location':
          return (
            <a href={msg.locationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="font-medium">{msg.locationName}</span>
            </a>
          );
        case 'poll':
          return (
            <PollCreator pollQuestion={msg.pollQuestion} pollOptions={msg.pollOptions} onVote={(optionId) => handlePollVote(msg.id, optionId)} />
          );
        case 'system':
          return <div className="text-sm italic text-center w-full">{msg.text}</div>;
        default:
          return <div>{msg.text}</div>;
      }
    };

    return (
      <div className={`flex items-start ${isUser ? 'justify-end' : ''} mb-6`}>
        {!isUser && (
          <Avatar name={msg.sender} bgColor={senderColor} isAI={msg.originalSenderId === 'AI'} />
        )}
        <div className={`flex flex-col mx-2 relative group max-w-[70%] md:max-w-[50%] message-bubble ${isUser ? 'is-user' : ''}`}>
          <div className={`p-4 rounded-2xl relative shadow-md ${isUser ? 'bg-[#DCF8C6] text-black rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
            {!isUser && (
              <div className="font-semibold text-xs mb-1 opacity-70">{msg.sender}</div>
            )}
            {renderMessageContent()}
            <div className="flex items-center space-x-1">
              <span className={`text-xs mt-2 block ${isUser ? 'text-gray-700' : 'text-gray-500'}`}>{time}</span>
              {renderReadReceipt()}
            </div>
          </div>

          {Object.keys(msg.reactions).length > 0 && (
            <div className={`absolute -bottom-2 ${isUser ? 'left-0' : 'right-0'} bg-white text-xs px-2 py-1 rounded-full shadow-md border border-gray-200 z-10 transition-transform duration-300 transform group-hover:translate-y-1`}>
              {Object.entries(msg.reactions).map(([emoji, count]) => (
                <span key={emoji} className="ml-1">{emoji} {count}</span>
              ))}
            </div>
          )}

          <div className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isUser && msg.type === 'text' && !isEditing && (
              <button onClick={() => handleEditClick(msg)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.414 7.586a2 2 0 112.828 2.828l-8.485 8.485C3.39 19.903 2 18.25 2 16V14h2v2c0 1.05.748 2.072 1.954 2.812l6.232-6.232z" />
                </svg>
              </button>
            )}
            <button onClick={() => handleMessageClick(msg)} className="text-gray-400 hover:text-gray-600 p-1 ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex font-sans antialiased text-gray-800 bg-[#ECE5DD] h-screen">
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #25D366;
          color: #25D366;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #25D366;
          color: #25D366;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0.2s;
        }
        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #25D366;
          color: #25D366;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0.4s;
        }
        @keyframes dot-flashing {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .message-bubble.is-user::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -10px;
          width: 0;
          height: 0;
          border-bottom: 10px solid #DCF8C6;
          border-left: 10px solid transparent;
        }
        .message-bubble:not(.is-user)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -10px;
          width: 0;
          height: 0;
          border-bottom: 10px solid #FFF;
          border-right: 10px solid transparent;
        }
      `}</style>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:flex-col bg-[#F0F2F5] w-full md:w-80 shadow-2xl z-20`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">AlumniConnect</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 flex flex-col space-y-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-2">My Chats</h2>
          <button
            onClick={() => handleChatModeChange('group')}
            className={`p-3 rounded-xl flex items-center space-x-3 transition-colors ${chatMode === 'group' ? 'bg-[#25D366] text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <span className="text-2xl">👥</span>
            <span className="font-medium">Group Chat</span>
          </button>
          <button
            onClick={() => handleChatModeChange('one-to-one')}
            className={`p-3 rounded-xl flex items-center space-x-3 transition-colors ${chatMode === 'one-to-one' ? 'bg-[#25D366] text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <span className="text-2xl">👤</span>
            <span className="font-medium">Direct Message</span>
          </button>
          <button
            onClick={() => handleChatModeChange('ai')}
            className={`p-3 rounded-xl flex items-center space-x-3 transition-colors ${chatMode === 'ai' ? 'bg-[#25D366] text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <span className="text-2xl">🤖</span>
            <span className="font-medium">AI Assistant</span>
          </button>
        </div>

        {chatMode === 'one-to-one' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h2 className="text-xl font-semibold mb-2">Available Alumni</h2>
            {allRegisteredUsers.length > 0 ? allRegisteredUsers.map(user => (
              <button
                key={user._id}
                onClick={() => setSelectedChatUser(user)}
                className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 transition-colors ${selectedChatUser && selectedChatUser._id === user._id ? 'bg-[#25D366]/20' : 'hover:bg-gray-100'}`}
              >
                <Avatar name={user.username} bgColor={getAvatarColor(user.username)} size="w-10 h-10" />
                <div className="flex-1">
                  <div className="font-medium">{user.username}</div>
                  <div className="text-sm text-gray-500 truncate">{user.email}</div>
                </div>
              </button>
            )) : (
              <div className="text-center text-gray-500 italic p-4">No other users found.</div>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#ECE5DD] rounded-l-3xl md:rounded-l-none overflow-hidden transition-all duration-300">
        {/* Chat Header */}
        <div className="bg-[#F0F2F5] p-4 md:p-6 border-b border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Avatar
              name={chatMode === 'group' ? 'Group Chat' : selectedChatUser?.username || 'AI'}
              bgColor={getAvatarColor(chatMode === 'group' ? 'Group Chat' : selectedChatUser?.username || 'AI')}
              isAI={chatMode === 'ai'}
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900">
                {chatMode === 'group' ? 'Alumni Group Chat' : selectedChatUser?.username || 'AI Assistant'}
              </h2>
              {typingUsers.length > 0 && (
                <div className="text-sm text-gray-500 italic">{typingUsers.join(', ')} is typing...</div>
              )}
            </div>
          </div>
          {chatMode !== 'ai' && (
            <div className="flex space-x-2">
              <button onClick={handleStartVoiceChat} className={`p-3 rounded-full transition-colors ${isVoiceChatActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {isVoiceChatActive ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.196L17.29 9.382l-2.613-2.613 1.814-2.538 2.538 1.814-2.613-2.613z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a7 7 0 01-7-7V7a7 7 0 017-7h1a7 7 0 017 7v4z" />
                  )}
                </svg>
              </button>
              <button onClick={handleClearChat} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-red-200 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5-4v4m-2 0h6m4-4v4m-2 0h6m-12 0L8 20" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Message Display Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 pb-20">
          {chatMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 italic">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {chatMode === 'group' && <p>Start a conversation with your peers.</p>}
              {chatMode === 'one-to-one' && (
                <p>This is the beginning of your conversation with {selectedChatUser?.username || 'a user'}.</p>
              )}
              {chatMode === 'ai' && <p>Ask me anything about your alumni network!</p>}
            </div>
          )}
          {chatMessages.map((msg) => (
            <div key={msg.id} className="relative">
              <ChatMessage
                msg={msg}
                isUser={msg.originalSenderId === userId}
                onReact={handleMessageClick}
                onEdit={handleEditClick}
              />
              {showReactionPicker && selectedMessageForReaction?.id === msg.id && (
                <ReactionPicker
                  onSelect={handleReactionSelect}
                  onClose={() => setShowReactionPicker(false)}
                  position={msg.originalSenderId === userId ? 'left' : 'right'}
                />
              )}
            </div>
          ))}
          {aiResponseLoading && chatMode === 'ai' && (
            <div className="flex items-start mb-4">
              <Avatar name="AI" bgColor="bg-teal-600" isAI={true} />
              <div className="mx-2 p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md">
                <div className="dot-flashing"></div>
              </div>
            </div>
          )}
          <div ref={chatMessagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-[#F0F2F5] p-4 md:p-6 border-t border-gray-200 flex items-center shadow-md">
          {isCreatingPoll ? (
            <div className="flex flex-col w-full space-y-2">
              <input
                type="text"
                value={newPollQuestion}
                onChange={(e) => setNewPollQuestion(e.target.value)}
                placeholder="Enter poll question..."
                className="w-full p-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
              {newPollOptions.map((option, index) => (
                <div key={option.id} className="relative flex items-center">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...newPollOptions];
                      newOptions[index].text = e.target.value;
                      setNewPollOptions(newOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="w-full p-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                  {newPollOptions.length > 2 && (
                    <button
                      onClick={() => {
                        const newOptions = newPollOptions.filter((_, i) => i !== index);
                        setNewPollOptions(newOptions);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setNewPollOptions(prev => [...prev, { id: (prev.length + 1).toString(), text: '' }])}
                  className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handleSendPoll}
                  className="p-3 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors"
                >
                  Send Poll
                </button>
                <button onClick={() => setIsCreatingPoll(false)} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {editingMessageId && (
                <div className="flex items-center space-x-2 mr-4 text-sm text-gray-600">
                  <span>Editing message...</span>
                  <button onClick={handleCancelEdit} className="text-red-500 hover:underline">Cancel</button>
                </div>
              )}

              <div className="relative">
                <button onClick={() => setChatInput(prev => prev + '😀')} className="text-gray-500 hover:text-gray-700 p-2 transition-colors rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                value={chatInput}
                onChange={handleChatInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message"
                className="flex-1 p-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all mx-2"
              />

              <button onClick={handleSendMessage} className={`p-3 rounded-full transition-colors ${chatInput.trim() || editingMessageId ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90 -translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>

              <button onClick={handleShareLocation} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2 transition-colors hidden md:block" title="Share Location">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button onClick={handleCreatePoll} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2 transition-colors hidden md:block" title="Create Poll">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l-2 2M9 19H7a2 2 0 01-2-2v-5a2 2 0 012-2h2m0-4v4" />
                </svg>
              </button>

              <input type="file" ref={imageInputRef} onChange={handleImageFileChange} accept="image/*" className="hidden" />
              <button onClick={() => imageInputRef.current.click()} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2 transition-colors" title="Upload Image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-2-2h.01M6 16v-2a2 2 0 012-2h8a2 2 0 012 2v2" />
                </svg>
              </button>

              <input type="file" ref={documentInputRef} onChange={handleDocumentFileChange} className="hidden" />
              <button onClick={() => documentInputRef.current.click()} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2 transition-colors" title="Upload Document">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinecap="round" d="M7 16a4 4 0 01-4-4v-1c0-.98.39-1.92 1.09-2.61L8 3m6 13a4 4 0 01-4 4v1c0 .98.39 1.92 1.09 2.61L16 21m-6-5v-1a4 4 0 01-4-4h1a4 4 0 014 4z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}