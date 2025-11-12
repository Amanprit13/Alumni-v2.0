// src/utils/avatarColors.js

const colors = [
    '#34D399', // Green
    '#60A5FA', // Blue
    '#FBBF24', // Yellow
    '#F87171', // Red
    '#A78BFA', // Purple
    '#FB923C', // Orange
    '#6EE7B7', // Teal
];

export const getAvatarColor = (username) => {
    // A simple hash function to get a consistent color for each username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};