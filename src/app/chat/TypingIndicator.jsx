import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start items-center space-x-2 text-gray-400">
      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <p className="text-sm font-light">Typing...</p>
    </div>
  );
}