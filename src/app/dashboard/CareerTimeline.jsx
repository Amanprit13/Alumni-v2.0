"use client";

export default function CareerTimeline({ timeline }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        🚀 AI Career Growth Timeline (5 Years)
      </h2>

      <div className="space-y-5">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-lg p-4"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-indigo-800">
                {item.year} — {item.role}
              </h3>
              <span className="text-sm text-gray-600">
                Confidence {(item.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              💰 Expected Salary: <strong>{item.salary}</strong>
            </p>

            <p className="text-sm mt-2 text-gray-600">
              Skills to Focus:
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {item.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
