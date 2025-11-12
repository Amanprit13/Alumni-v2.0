// // components/WorldQuiz.js
// 'use client';

// import React, { useState, useCallback, useMemo } from 'react';

// // --- Extensive Question Pool ---
// // In a real application, this data would be loaded from a JSON file or API.
// // We group questions by broad difficulty tiers (Tiers 1-10) for simplicity.
// const QUESTION_POOL_BY_TIER = {
//   1: [ // Levels 1-50 (Very Easy)
//     { q: "What is the capital of France?", a: "Paris" },
//     { q: "What is the largest planet in our solar system?", a: "Jupiter" },
//     { q: "Who wrote 'Romeo and Juliet'?", a: "Shakespeare" },
//     { q: "What currency is used in Japan?", a: "Yen" },
//     { q: "How many sides does a triangle have?", a: "3" },
//   ],
//   2: [ // Levels 51-100 (Easy)
//     { q: "What is the longest river in the world?", a: "Nile" },
//     { q: "Which mountain is the tallest in the world?", a: "Everest" },
//     { q: "What element is denoted by the symbol 'Au'?", a: "Gold" },
//     { q: "What is the capital of Brazil?", a: "Brasília" },
//     { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
//   ],
//   3: [ // Levels 101-150 (Medium)
//     { q: "What is the largest country by land area in South America?", a: "Brazil" },
//     { q: "The D-Day landings took place in which region of France?", a: "Normandy" },
//     { q: "Which US state is nicknamed the 'Sunshine State'?", a: "Florida" },
//     { q: "What year did the Titanic sink?", a: "1912" },
//     { q: "What is the freezing point of water in Celsius?", a: "0" },
//   ],
//   10: [ // Levels 451-513 (Hardest Tier - acts as the cap for this sample)
//     { q: "The Suez Canal connects the Mediterranean Sea to which other sea?", a: "Red Sea" },
//     { q: "What is the chemical formula for table salt?", a: "NaCl" },
//     { q: "Which ancient civilization built Machu Picchu?", a: "Inca" },
//     { q: "What is the study of fungi called?", a: "Mycology" },
//     { q: "Which composer wrote the opera 'The Magic Flute'?", a: "Mozart" },
//   ],
// };

// // Global constants
// const MAX_LEVEL = 513;
// const QUESTIONS_PER_TIER = 50; 

// export default function WorldQuiz({ currentUser, onScoreUpdate, isLoggedIn }) {
//   const [level, setLevel] = useState(1);
//   const [answerInput, setAnswerInput] = useState('');
//   const [message, setMessage] = useState('');

//   // Memoize the current question and tier for efficiency
//   const { currentTier, currentTierQuestions, currentQuestion, baseScore } = useMemo(() => {
//     // Determine the current tier (1 to 11)
//     let tier = Math.ceil(level / QUESTIONS_PER_TIER);
    
//     // Safety check/wrap-around for sample tiers
//     if (tier > 3 && tier < 10) tier = 3; 
//     if (tier >= 10) tier = 10; 

//     const questions = QUESTION_POOL_BY_TIER[tier] || QUESTION_POOL_BY_TIER[1];
    
//     // The question index cycles through the sample questions available in that tier
//     const qIndex = (level - 1) % questions.length;
    
//     // Scoring is based on difficulty: Level 1 = 1 point, Level 513 = 513 points.
//     const scoreValue = level; 
    
//     return {
//       currentTier: tier,
//       currentTierQuestions: questions,
//       currentQuestion: questions[qIndex],
//       baseScore: scoreValue,
//     };
//   }, [level]);
  
//   // --- Solution Check and Score Submission Logic ---
//   const handleSubmit = (e) => { // <-- FIX: Defined BEFORE being used in JSX
//     e.preventDefault();
    
//     if (!isLoggedIn) {
//         setMessage("Please log in to submit your answer.");
//         return;
//     }
    
//     if (!currentQuestion) {
//         setMessage("Error: Question not found for this level.");
//         return;
//     }
    
//     const isCorrect = answerInput.trim().toLowerCase() === currentQuestion.a.toLowerCase();

//     if (isCorrect) {
//       const scoreGained = baseScore;
//       onScoreUpdate('World Quiz', scoreGained); // Submit score to backend
      
//       // Advance Level
//       if (level < MAX_LEVEL) {
//         setLevel(prev => prev + 1);
//         setMessage(`Correct! Advancing to Level ${level + 1}. +${scoreGained} points.`);
//       } else {
//         setMessage(`Quiz Complete! You mastered all ${MAX_LEVEL} levels!`);
//       }
      
//     } else {
//       setMessage(`Incorrect. The answer was: ${currentQuestion.a}. You will restart this level.`);
//       // Level remains the same for retry
//     }
//     setAnswerInput('');
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4 mb-8">
//       <h3 className="text-2xl font-bold mb-4 text-blue-700">World Knowledge Quiz (Levels 1-{MAX_LEVEL})</h3>
      
//       <div className="mb-4 p-3 bg-blue-50 rounded-lg shadow-inner border-b">
//         <span className="font-bold text-blue-800 text-xl">Level: {level} / {MAX_LEVEL}</span> | 
//         <span className="ml-4 text-md text-gray-600">Tier {currentTier} (Hardness)</span>
//       </div>

//       <p className="text-gray-600 mb-4">
//         Current Player: <span className="font-semibold">{currentUser || 'GUEST'}</span>.
//       </p>

//       <div className="text-xl font-medium mb-4 text-gray-800">
//         Question: {currentQuestion.q} 
//         <span className='ml-2 text-sm text-green-600'>(Value: {baseScore} pts)</span>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={answerInput}
//           onChange={(e) => setAnswerInput(e.target.value)}
//           placeholder={isLoggedIn ? "Enter your answer" : "Log in to answer"}
//           className="text-gray-800 w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-inner"
//           required
//         />
//         <button 
//           type="submit" 
//           className="mt-4 w-full py-3 rounded-lg text-lg font-semibold shadow-md transition-colors bg-blue-500 hover:bg-blue-600"
//           // disabled={!isLoggedIn} // Disable button if not logged in
//         >
//           Submit Answer
//         </button>
//       </form>

//       <p className={`mt-4 text-center font-medium ${message.includes('Correct') ? 'text-green-600' : message.includes('Incorrect') ? 'text-red-600' : 'text-gray-600'}`}>
//         {message}
//       </p>
//     </div>
//   );
// }

// components/WorldQuiz.js
'use client';

import React, { useState, useCallback, useMemo } from 'react';

// --- Extensive Question Pool (unchanged) ---
const QUESTION_POOL_BY_TIER = {
    1: [ // Levels 1-50 (Very Easy)
        { q: "What is the capital of France?", a: "Paris" },
        { q: "What is the largest planet in our solar system?", a: "Jupiter" },
        { q: "Who wrote 'Romeo and Juliet'?", a: "Shakespeare" },
        { q: "What currency is used in Japan?", a: "Yen" },
        { q: "How many sides does a triangle have?", a: "3" },
    ],
    2: [ // Levels 51-100 (Easy)
        { q: "What is the longest river in the world?", a: "Nile" },
        { q: "Which mountain is the tallest in the world?", a: "Everest" },
        { q: "What element is denoted by the symbol 'Au'?", a: "Gold" },
        { q: "What is the capital of Brazil?", a: "Brasília" },
        { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
    ],
    3: [ // Levels 101-150 (Medium)
        { q: "What is the largest country by land area in South America?", a: "Brazil" },
        { q: "The D-Day landings took place in which region of France?", a: "Normandy" },
        { q: "Which US state is nicknamed the 'Sunshine State'?", a: "Florida" },
        { q: "What year did the Titanic sink?", a: "1912" },
        { q: "What is the freezing point of water in Celsius?", a: "0" },
    ],
    10: [ // Levels 451-513 (Hardest Tier - acts as the cap for this sample)
        { q: "The Suez Canal connects the Mediterranean Sea to which other sea?", a: "Red Sea" },
        { q: "What is the chemical formula for table salt?", a: "NaCl" },
        { q: "Which ancient civilization built Machu Picchu?", a: "Inca" },
        { q: "What is the study of fungi called?", a: "Mycology" },
        { q: "Which composer wrote the opera 'The Magic Flute'?", a: "Mozart" },
    ],
};

// Global constants
const MAX_LEVEL = 513;
const QUESTIONS_PER_TIER = 50; 

// The component is modified to ignore the isLoggedIn prop and simulate local scoring for guests.
// We remove the isLoggedIn prop since it's no longer relevant for access control.
export default function WorldQuiz({ currentUser, onScoreUpdate }) {
    const [level, setLevel] = useState(1);
    const [answerInput, setAnswerInput] = useState('');
    const [message, setMessage] = useState('');
    // NEW: Local state to track score for guests/unlogged users
    const [localScore, setLocalScore] = useState(0); 

    // Memoize the current question and tier for efficiency (unchanged logic)
    const { currentTier, currentQuestion, baseScore } = useMemo(() => {
        let tier = Math.ceil(level / QUESTIONS_PER_TIER);
        
        // Safety check/wrap-around for sample tiers
        if (tier > 3 && tier < 10) tier = 3; 
        if (tier >= 10) tier = 10; 

        const questions = QUESTION_POOL_BY_TIER[tier] || QUESTION_POOL_BY_TIER[1];
        const qIndex = (level - 1) % questions.length;
        const scoreValue = level; 
        
        return {
            currentTier: tier,
            currentQuestion: questions[qIndex],
            baseScore: scoreValue,
        };
    }, [level]);
    
    // --- Solution Check and Score Submission Logic ---
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 🚨 Removed the 'if (!isLoggedIn) { ... return; }' block 🚨

        if (!currentQuestion) {
            setMessage("Error: Question not found for this level.");
            return;
        }
        
        const isCorrect = answerInput.trim().toLowerCase() === currentQuestion.a.toLowerCase();

        if (isCorrect) {
            const scoreGained = baseScore;
            
            // If an authenticated user is present, update the score via prop (backend)
            if (currentUser && onScoreUpdate) {
                onScoreUpdate('World Quiz', scoreGained); 
            } else {
                // If no user (Guest), update local score state
                setLocalScore(prev => prev + scoreGained);
            }
            
            // Advance Level
            if (level < MAX_LEVEL) {
                setLevel(prev => prev + 1);
                setMessage(`Correct! Advancing to Level ${level + 1}. +${scoreGained} points.`);
            } else {
                setMessage(`Quiz Complete! You mastered all ${MAX_LEVEL} levels!`);
            }
            
        } else {
            setMessage(`Incorrect. The answer was: ${currentQuestion.a}. You will restart this level.`);
        }
        setAnswerInput('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">World Knowledge Quiz (Levels 1-{MAX_LEVEL})</h3>
            
            <div className="mb-4 p-3 bg-blue-50 rounded-lg shadow-inner border-b flex justify-between items-center">
                <span className="font-bold text-blue-800 text-xl">Level: {level} / {MAX_LEVEL}</span> 
                <span className="ml-4 text-md text-gray-600">Tier {currentTier} (Hardness)</span>
            </div>

            <p className="text-gray-600 mb-4">
                Current Player: <span className="font-semibold">{currentUser || 'GUEST'}</span>.
                {/* Display local score for guests */}
                {!currentUser && <span className="ml-4 font-semibold text-purple-600">Local Score: {localScore}</span>}
            </p>

            <div className="text-xl font-medium mb-4 text-gray-800">
                Question: {currentQuestion.q} 
                <span className='ml-2 text-sm text-green-600'>(Value: {baseScore} pts)</span>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    // Updated placeholder to be welcoming for all
                    placeholder="Enter your answer" 
                    className="text-gray-800 w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-inner"
                    required
                />
                <button 
                    type="submit" 
                    // 🚨 Login-dependent styling removed, button is always active 🚨
                    className="mt-4 w-full py-3 rounded-lg text-lg font-semibold shadow-md transition-colors bg-blue-500 hover:bg-blue-600"
                    // 🚨 The 'disabled' prop is permanently removed 🚨
                >
                    Submit Answer
                </button>
            </form>

            <p className={`mt-4 text-center font-medium ${message.includes('Correct') ? 'text-green-600' : message.includes('Incorrect') ? 'text-red-600' : 'text-gray-600'}`}>
                {message}
            </p>
        </div>
    );
}