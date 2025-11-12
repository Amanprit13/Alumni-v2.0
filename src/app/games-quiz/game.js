// components/SudokuGame.js
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

const BASE_SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const MAX_LEVEL = 513;
const MAX_CLUES = 45;
const MIN_CLUES = 20;

const generatePuzzle = (level) => {
  const clueRange = MAX_CLUES - MIN_CLUES;
  const levelFactor = (level - 1) / (MAX_LEVEL - 1);
  const numClues = Math.round(MAX_CLUES - levelFactor * clueRange);

  let allCoords = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) allCoords.push({ r, c });
  for (let i = allCoords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]];
  }

  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  const selectedClues = allCoords.slice(0, numClues);
  selectedClues.forEach(({ r, c }) => (initialBoard[r][c] = BASE_SOLUTION[r][c]));
  return initialBoard;
};

export default function SudokuGame({ currentUser, onScoreUpdate = () => { }, isLoggedIn = false }) {
  const [level, setLevel] = useState(1);
  const [initialBoard, setInitialBoard] = useState(() => generatePuzzle(1));
  const [board, setBoard] = useState(() => generatePuzzle(1));
  const [selectedCell, setSelectedCell] = useState(null);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const p = generatePuzzle(level);
    setInitialBoard(p);
    setBoard(p.map(r => [...r]));
    setSelectedCell(null);
    setMessage(`Level ${level} started!`);
    setStartTime(Date.now());
  }, [level]);

  const numClues = useMemo(() => initialBoard.flat().filter(n => n !== 0).length, [initialBoard]);

  const handleKeypadInput = (value) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    setBoard(prev => {
      const copy = prev.map(r => [...r]);
      copy[row][col] = value;
      return copy;
    });
  };

  const handleCellClick = (r, c) => {
    if (initialBoard[r][c] !== 0) return;
    setSelectedCell({ row: r, col: c });
  };

  const checkSolution = useCallback(() => {
    if (!isLoggedIn) {
      setMessage('⚠️ Please log in to check solution.');
      return;
    }
    const solved = board.every((row, rIdx) => row.every((cell, cIdx) => cell === BASE_SOLUTION[rIdx][cIdx]));
    if (solved) {
      const elapsedSec = Math.round((Date.now() - startTime) / 1000);
      const timePenalty = Math.floor(elapsedSec / 10);
      const levelBonus = level * 10;
      const finalScore = Math.max(10, 5000 - timePenalty + levelBonus);
      onScoreUpdate('Sudoku', finalScore);
      setMessage(`✅ Level ${level} solved! Score: ${finalScore}`);
      if (level < MAX_LEVEL) setLevel(prev => prev + 1);
    } else {
      setMessage('❌ Incorrect. Check again.');
    }
  }, [board, level, startTime, isLoggedIn, onScoreUpdate]);

  const getCellClass = (r, c) => {
    let cls =
      "w-12 h-12 flex items-center justify-center text-xl select-none border transition-all duration-150";
    if (initialBoard[r][c] !== 0) {
      cls += " bg-blue-50 font-bold text-blue-900";
    } else {
      cls += " bg-white text-blue-700 hover:bg-blue-100 cursor-pointer";
    }
    // Highlight selected cell with border only
    if (selectedCell && selectedCell.row === r && selectedCell.col === c) {
      cls += " border-2 border-blue-500";
    } else {
      cls += " border border-blue-300";
    }
    return cls;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-blue-200">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🧩 Sudoku Challenge</h2>

      {/* Info Bar */}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="p-2 bg-blue-50 rounded shadow-inner">
          <p className="text-xs text-blue-500">Level</p>
          <p className="text-lg font-semibold text-blue-600">{level}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded shadow-inner">
          <p className="text-xs text-blue-500">Clues</p>
          <p className="text-lg font-semibold">{numClues}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded shadow-inner">
          <p className="text-xs text-blue-500">Player</p>
          <p className="text-lg font-semibold">{currentUser || "Guest"}</p>
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-rows-9">
          {board.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-9">
              {row.map((val, cIdx) => (
                <div
                  key={cIdx}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  className={getCellClass(rIdx, cIdx)}
                  style={{
                    borderTopWidth: rIdx % 3 === 0 ? "3px" : "1px",
                    borderLeftWidth: cIdx % 3 === 0 ? "3px" : "1px",
                    borderRightWidth: cIdx === 8 ? "3px" : "1px",
                    borderBottomWidth: rIdx === 8 ? "3px" : "1px",
                  }}
                >
                  {val !== 0 ? val : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-3 max-w-md mx-auto mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => handleKeypadInput(n)}
            className="py-3 rounded-lg shadow bg-blue-200 hover:bg-blue-100 font-bold text-blue-700 transition"
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleKeypadInput(0)}
          className="py-3 rounded-lg shadow bg-red-300 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
          title="Clear Cell"
        >
          ⌫
        </button>
      </div>



      {/* Check Button */}
      <button
        onClick={checkSolution}
        className={`w-full py-3 rounded-lg text-lg font-bold shadow-md transition 
          ${isLoggedIn ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        disabled={!isLoggedIn}
      >
        ✅ Check Solution
      </button>

      {/* Message */}
      {message && <p className="mt-4 text-center font-medium text-gray-700">{message}</p>}
    </div>
  );
}
