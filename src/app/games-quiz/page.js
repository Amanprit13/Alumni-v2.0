'use client';

import React, { useState, useEffect, useCallback } from 'react';
// ⭐ ASSUMING these imports match your file names:
import SudokuGame from './game'; // Should be your Sudoku component
import WorldQuiz from './quiz'; // Should be your World Quiz component
import Leaderboard from './leaderboard';

const API_BASE_URL = 'http://localhost:5000/api'; 
const initialLeaderboard = []; 

export default function GamesChallengePage() {
    const [activeUserId, setActiveUserId] = useState(null);
    const [activeUserName, setActiveUserName] = useState(null);
    const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
    const [loading, setLoading] = useState(false);
    const [activeGame, setActiveGame] = useState(null); // 'sudoku' | 'quiz' | null
    
    const fetchLeaderboard = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/getLeaderboard`);
            if (response.ok) {
                const result = await response.json();
                const sortedData = result.data.sort((a, b) => b.score - a.score);
                setLeaderboard(sortedData);
            }
        } catch (error) {
            console.error('Network error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 30000); 
        return () => clearInterval(interval); 
    }, [fetchLeaderboard]);

    const updateLeaderboard = useCallback(async (gameName, scoreChange) => {
        if (!activeUserId) {
            alert("Please login/register a name before submitting scores!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/submitScore`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: activeUserId, game: gameName, scoreChange }),
            });

            if (response.ok) {
                document.getElementById('score-feedback').textContent = `+${scoreChange} points in ${gameName}!`;
                document.getElementById('score-feedback').classList.add('animate-pulse', 'opacity-100');
                setTimeout(() => {
                    document.getElementById('score-feedback').classList.remove('animate-pulse', 'opacity-100');
                    document.getElementById('score-feedback').textContent = '';
                }, 2000); 

                fetchLeaderboard(); 
            } else {
                const errorData = await response.json();
                alert(`Score submission failed! Message: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating score:', error);
            alert('Network error while submitting score. Check your backend server.');
        }
    }, [activeUserId, fetchLeaderboard]);

    const handleLogin = async (name) => {
        if (!name) return;
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                const result = await response.json();
                setActiveUserId(result.userId);
                setActiveUserName(result.name);
                fetchLeaderboard();
                return true;
            } else {
                alert("Login failed. Try another name.");
                return false;
            }
        } catch (error) {
            console.error('Login network error:', error);
            alert('Cannot connect to login server.');
            return false;
        }
    };

    const handleLogout = () => {
        setActiveUserId(null);
        setActiveUserName(null);
        setActiveGame(null);
    };

    const PlayerAuth = () => {
        const [inputName, setInputName] = useState('');

        if (activeUserId && activeUserName) {
            return (
                <div className="flex justify-between items-center mb-4 p-4 bg-indigo-100 rounded-xl shadow-lg border border-indigo-200">
                    <p className="text-xl font-bold text-indigo-800">
                        Welcome, <span className="text-indigo-600">{activeUserName}</span>! 🎉
                    </p>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                    >
                        Log Out
                    </button>
                </div>
            );
        }

        return (
            <div className="mb-8 p-4 bg-white shadow-xl rounded-xl flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4 border border-gray-200">
                <input
                    type="text"
                    placeholder="Enter your Player Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full md:flex-grow p-3 border-2 placeholder-gray-500 text-gray-900 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-inner"
                />
                <button
                    onClick={() => handleLogin(inputName.trim())}
                    className="w-full md:w-auto bg-indigo-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-xl"
                >
                    Start Game / Register
                </button>
            </div>
        );
    };

    const gameCards = [
        {
            id: 'sudoku',
            title: 'Sudoku Challenge',
            desc: 'Test your logic and number skills!',
            img: '/images/paper-filled-square-lines-numbers-260nw-2346369291.webp', 
        },
        {
            id: 'quiz',
            title: 'World Quiz',
            desc: 'Challenge your general knowledge!',
            img: '/images/quiz_1724238484793_1724238490157.avif',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                
                <header className="top-0 bg-gray-100 pt-2 pb-4">
                    <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800">Cognitive Challenge Arena</h1>
                    <PlayerAuth />
                    <div id="score-feedback" className="text-center font-bold text-lg text-green-700 h-6 opacity-0 transition-opacity duration-500"></div>
                    {loading && <p className="text-center text-indigo-600 text-sm">Fetching latest scores...</p>}
                </header>
                
                {/* 3-column layout: 2 for cards/game, 1 for leaderboard */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Game Section */}
                    <main className={activeGame ? "lg:col-span-3 space-y-8" : "lg:col-span-2 space-y-8"}>
                        {!activeGame ? (
                            <div className="flex flex-col md:flex-row gap-6">
                                {gameCards.map(card => (
                                    <div 
                                        key={card.id} 
                                        // ⭐ This onClick is what triggers the game to display
                                        className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden flex-1 transform transition-transform hover:scale-[1.03] border border-gray-200"
                                        onClick={() => setActiveGame(card.id)} 
                                    >
                                        <img src={card.img} alt={card.title} className="w-full h-48 object-cover"/>
                                        <div className="p-4 text-center">
                                            <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                                            <p className="text-gray-600 mt-1">{card.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Game Display Section
                            <div className="space-y-8">
                                <button
                                    onClick={() => setActiveGame(null)}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow-md"
                                >
                                    ← Back to Games
                                </button>
                                {/* ⭐ These are the components that must exist in './game.js' and './quiz.js' */}
                                {activeGame === 'sudoku' && (
                                    <SudokuGame 
                                        currentUser={activeUserName} 
                                        onScoreUpdate={updateLeaderboard} 
                                        isLoggedIn={!!activeUserId}
                                    />
                                )}
                                {activeGame === 'quiz' && (
                                    <WorldQuiz 
                                        currentUser={activeUserName} 
                                        onScoreUpdate={updateLeaderboard} 
                                        isLoggedIn={!!activeUserId}
                                    />
                                )}
                            </div>
                        )}
                    </main>

                    {/* Leaderboard Section */}
                    {activeGame ? null : ( 
                        <aside className="lg:col-span-1 lg:sticky lg:top-16 h-fit"> 
                            <Leaderboard 
                                leaderboard={leaderboard} 
                                currentUser={activeUserName}
                            />
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}