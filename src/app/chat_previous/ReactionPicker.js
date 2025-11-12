import React from 'react';

const emojis = ['👍', '❤️', '😂', '🤯', '😭', '🎉'];

const ReactionPicker = ({ onSelect, onClose, position }) => {
    const pickerClass = position === 'left' ? 'right-full mr-2' : 'left-full ml-2';

    return (
        <div className={`absolute bottom-full mb-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200 z-20 flex space-x-1 ${pickerClass}`}>
            {emojis.map(emoji => (
                <button
                    key={emoji}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(emoji);
                    }}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-110 focus:outline-none"
                >
                    <span className="text-2xl">{emoji}</span>
                </button>
            ))}
        </div>
    );
};

export default ReactionPicker;