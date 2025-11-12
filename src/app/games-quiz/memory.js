"use client";

import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../layout';
import Head from 'next/head';
import { motion } from 'framer-motion';

const cardData = [
  { id: 1, value: 'Jane Smith', matched: false },
  { id: 2, value: 'Jane Smith', matched: false },
  { id: 3, value: 'Clock Tower', matched: false },
  { id: 4, value: 'Clock Tower', matched: false },
  { id: 5, value: 'Eagle Mascot', matched: false },
  { id: 6, value: 'Eagle Mascot', matched: false },
  { id: 7, value: 'Alumni Gala', matched: false },
  { id: 8, value: 'Alumni Gala', matched: false },
];

export default function MemoryMatch() {
  const { userId, leaderboardData, setLeaderboardData, achievements, setAchievements } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => initializeGame(), []);

  const initializeGame = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5).map((card, i) => ({ ...card, index: i }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
    setGameScore(0);
    setMessage('');
  };

  const showTemporaryMessage = (msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  };

  const handleCardClick = (index) => {
    if (gameCompleted || flippedCards.includes(index) || cards[index].matched) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].value === cards[second].value) {
        setCards(cards.map((c, i) => (i === first || i === second ? { ...c, matched: true } : c)));
        setMatchedPairs(matchedPairs + 1);
        if (matchedPairs + 1 === cardData.length / 2) {
          setGameCompleted(true);
          const score = Math.max(0, 100 - moves * 5);
          setGameScore(score);

          if (moves <= 8) {
            const achievement = { id: userId + '-memory-expert', name: 'Memory Expert', description: 'Completed Memory Match in 8 or fewer moves' };
            if (!achievements.some(a => a.id === achievement.id)) setAchievements([...achievements, achievement]);
          }
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const submitGameScore = () => {
    const newEntry = { id: userId + '-memory-' + Date.now(), userId, score: gameScore, type: 'Memory Match', timestamp: new Date().toISOString() };
    const updated = [...leaderboardData, newEntry].sort((a,b) => b.score - a.score || new Date(a.timestamp) - new Date(b.timestamp));
    setLeaderboardData(updated.slice(0, 10));
    showTemporaryMessage("Memory score submitted!");
  };

  const shareScore = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Memory Match', text: `I scored ${gameScore} in ${moves} moves!`, url: window.location.href });
      } catch {}
    } else showTemporaryMessage("Sharing not supported on this device.");
  };

  return (
    <>
      <Head>
        <title>Memory Match | AlumniConnect</title>
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl mt-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">🧠 Memory Match</h1>
        
        {message && <div className="text-center mb-4 text-blue-600 font-semibold">{message}</div>}

        {!gameCompleted ? (
          <>
            <p className="text-center mb-4 font-semibold text-gray-700">Moves: {moves}</p>
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => handleCardClick(i)}
                  className={`relative cursor-pointer perspective`}
                >
                  <div className={`transition-transform duration-500 transform ${flippedCards.includes(i) || card.matched ? 'rotate-y-180' : ''}`}>
                    <div className="absolute backface-hidden bg-gray-200 rounded-lg flex items-center justify-center h-24 text-2xl font-bold">
                      ?
                    </div>
                    <div className="absolute backface-hidden rotate-y-180 bg-blue-500 text-white rounded-lg flex items-center justify-center h-24 text-center p-2">
                      {card.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">🎉 Game Completed!</h2>
            <p className="text-xl font-semibold mb-2">Moves: {moves}</p>
            <p className="text-xl font-semibold mb-6">Score: {gameScore}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button onClick={initializeGame} whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
              >Play Again</motion.button>
              <motion.button onClick={submitGameScore} whileHover={{ scale: 1.05 }}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
              >Submit Score</motion.button>
              <motion.button onClick={shareScore} whileHover={{ scale: 1.05 }}
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700"
              >Share Score</motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
