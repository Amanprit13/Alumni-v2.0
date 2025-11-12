// Assume BACKEND_URL is defined as a global constant
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchChatHistory = async (chatMode, userId, selectedChatUserId) => {
    // This is a placeholder for a real API call.
    // In a real app, you would fetch history from the backend.
    console.log(`Fetching chat history for mode: ${chatMode}`);
    return []; 
};

export const updateMessageOnBackend = async (messageId, newText) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat/group/${messageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText })
        });
        if (!response.ok) {
            console.error("Failed to update message on backend:", response.status);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Network error updating message:", error);
        return false;
    }
};

export const sendMessageToBackend = async (message) => {
    // Placeholder for sending a new message
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
        if (!response.ok) {
            console.error("Failed to send message to backend:", response.status);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Network error sending message:", error);
        return false;
    }
};