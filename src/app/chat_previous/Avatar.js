import React from 'react';

const Avatar = ({ name, bgColor, isAI, size = 'w-12 h-12' }) => {
    const initials = name
        ? name.split(' ').map(n => n[0]).join('')
        : 'AI';

    return (
        <div 
            className={`relative flex items-center justify-center rounded-full text-white font-bold text-lg flex-shrink-0 overflow-hidden ${size}`}
            style={{ backgroundColor: bgColor }}
        >
            {isAI ? (
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    🤖
                </div>
            ) : (
                <span className="select-none">{initials}</span>
            )}
        </div>
    );
};

export default Avatar;