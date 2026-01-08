"use client";

export default function LearningRecommendations({ paths }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        AI-Recommended Learning Path
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        {paths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
