// components/Leaderboard.js - Complete Code for Alignment and Score Display
import React from 'react';

// Define mock data for demonstration purposes
const MOCK_LEADERBOARD = [
  { name: 'QuantumQuasar', score: 150000 },
  { name: 'CodeCommander', score: 125000 },
  { name: 'ByteBard', score: 98000 },
];

export default function Leaderboard({ leaderboard, currentUser }) {
  // Use mock data if the prop is not provided or is empty
  const dataToDisplay = (leaderboard && leaderboard.length > 0) ? leaderboard : MOCK_LEADERBOARD;
  
  if (!dataToDisplay || dataToDisplay.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-2xl text-center border border-gray-200 w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">🏆 Hall of Fame 🏆</h2>
        <p className="text-gray-600">Leaderboard data is loading or the list is empty.</p>
      </div>
    );
  }

  return (
    // ⭐ FIX: Removed fixed width constraint (max-w-md mx-auto) to let it fill the parent grid column.
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full transform hover:scale-[1.01] transition-transform duration-300">
      <h2 className="text-3xl font-extrabold text-center mb-5 text-indigo-700 border-b-4 border-indigo-500 pb-3">
        🏆 Hall of Fame 🏆
      </h2>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {/* Ensure column widths are balanced and Score has enough room */}
              <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/5">Rank</th>
              <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-2/5">Player</th>
              <th className="py-2 pl-3 pr-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider w-2/5">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataToDisplay.map((player, index) => (
              <tr 
                key={player.name} 
                className={
                    player.name === currentUser 
                    ? 'bg-yellow-100 font-extrabold text-indigo-800'
                    : (index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100')
                }
              >
                {/* Rank column */}
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-base font-medium text-gray-900">{index + 1}</td>
                {/* Player Name column */}
                <td className="whitespace-nowrap px-3 py-3 text-base text-gray-700">{player.name}</td>
                {/* ⭐ FIX: Score column with whitespace-nowrap and right alignment */}
                <td className="whitespace-nowrap py-3 pl-3 pr-4 text-base font-bold text-gray-900 text-right">
                  {player.score.toLocaleString()} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        *Scores are accumulated from all games. You are highlighted in yellow.*
      </p>
    </div>
  );
}