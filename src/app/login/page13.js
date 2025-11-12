"use client";
import { useState, createContext, useContext } from 'react';

// Create a simple AuthContext
const AuthContext = createContext(null);

// AuthProvider component to wrap the entire app
const AuthProvider = ({ children }) => {
    // This state would hold the user's authentication status in a real app
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // You can add login/logout functions here
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// The main App component which will serve as the entire page.
const App = () => {
    // State variables to hold the form input values and the login message.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('text-red-500');

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setMessage('Please enter both email and password.');
            setMessageColor('text-red-500');
            return;
        }

        try {
            // Make a POST request to your Flask backend's /login endpoint
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Parse the JSON response from the server
            const data = await response.json();

            // Update the UI based on the server's response
            if (data.success) {
                setMessage(data.message);
                setMessageColor('text-green-500');
                // In a real app, you would handle a successful login here.
            } else {
                setMessage(data.message);
                setMessageColor('text-red-500');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
            setMessage('An unexpected error occurred. Please try again later.');
            setMessageColor('text-red-500');
        }

        // Hide the message after 3 seconds
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <AuthProvider>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <style jsx>{`
                    .login-container {
                        backdrop-filter: blur(10px);
                        background-color: rgba(255, 255, 255, 0.8);
                    }
                    .login-btn {
                        transition: transform 0.2s ease-in-out;
                    }
                    .login-btn:hover {
                        transform: translateY(-2px);
                    }
                `}</style>

                <div className="login-container p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* Display the message if it exists */}
                        {message && (
                            <div className={`text-center text-sm mb-4 ${messageColor}`}>
                                {message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="login-btn w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-6 text-sm">
                        Don't have an account? <a href="#" className="text-indigo-600 font-medium hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </AuthProvider>
    );
};

export default App;
