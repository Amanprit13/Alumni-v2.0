"use client";

export default function AIExplanationPanel({ title, confidence, reasons }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl shadow mt-6">
      <h3 className="text-lg font-bold text-indigo-800 mb-2">
        🧠 {title}
      </h3>

      <p className="text-sm text-gray-700 mb-3">
        Confidence Score:{" "}
        <span className="font-semibold">
          {(confidence * 100).toFixed(0)}%
        </span>
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        {reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
