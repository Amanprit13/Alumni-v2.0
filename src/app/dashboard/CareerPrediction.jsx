"use client";

export default function CareerPrediction({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full border-l-4 border-indigo-500">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Career Growth Prediction
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        AI-based career forecasting (Version-3)
      </p>

      {/* Predicted Role */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm">Next Best Role</p>
        <p className="text-xl font-semibold text-indigo-600">
          {prediction.nextRole}
        </p>
      </div>

      {/* Growth Score */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm">Growth Score</p>
        <div className="flex items-center space-x-2">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${prediction.growthScore}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {prediction.growthScore}%
          </span>
        </div>
      </div>

      {/* Skill Gap */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">Skill Gap Identified</p>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          {prediction.skillGaps.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Time Estimate */}
      <div className="mt-4 bg-indigo-50 p-3 rounded-lg">
        <p className="text-sm text-indigo-700 font-medium">
          Estimated Time to Reach Role:
        </p>
        <p className="text-lg font-bold text-indigo-900">
          {prediction.estimatedYears} years
        </p>
      </div>

      {/* Footer */}
      <p className="mt-4 text-xs text-gray-500 italic">
        Prediction based on skills, experience & alumni trends
      </p>

    </div>
  );
}
