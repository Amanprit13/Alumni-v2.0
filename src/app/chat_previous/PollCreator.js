import React from 'react';

const PollCreator = ({ pollQuestion, pollOptions, onVote }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-inner mt-2 border border-gray-300">
            <div className="font-bold mb-2 text-gray-900">{pollQuestion}</div>
            {pollOptions.map(option => (
                <div key={option.id} className="flex items-center justify-between mb-2">
                    <button
                        onClick={() => onVote(option.id)}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-indigo-100 transition-colors truncate text-gray-800"
                    >
                        {option.text}
                    </button>
                    <span className="text-gray-500 font-semibold ml-2">{option.votes}</span>
                </div>
            ))}
        </div>
    );
};

export default PollCreator;