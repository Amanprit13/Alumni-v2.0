"use client";

import { predictCareerGrowth, recommendSkills } from "@/ai/career/careerPredictor";

const profile = {
  currentRole: "Software Engineer",
  experience: 1,
  skills: ["react", "node", "sql"],
  industry: "IT",
  location: "India"
};

export default function CareerAnalytics() {
  const growth = predictCareerGrowth(profile);
  const skills = recommendSkills(profile);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Career Growth Prediction
      </h1>

      {/* Salary Prediction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          5-Year Career Projection
        </h2>

        <ul className="space-y-2">
          {growth.map((g, i) => (
            <li key={i} className="flex justify-between">
              <span>Year {g.year} — {g.role}</span>
              <span className="font-semibold text-green-600">
                ₹{g.salary.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skill Recommendation */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          AI-Recommended Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
