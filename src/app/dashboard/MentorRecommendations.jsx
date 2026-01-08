"use client";

export default function MentorRecommendations({ mentors }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Recommended Mentors</h2>

      <div className="space-y-4">
        {mentors.map((mentor, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.domain}</p>
            <p className="text-sm text-gray-500">
              Skills: {mentor.skills.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
