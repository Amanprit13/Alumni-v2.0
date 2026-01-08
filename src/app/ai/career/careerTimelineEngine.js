export function generateCareerTimeline(userProfile) {
  const baseRole = userProfile.currentRole || "Graduate Trainee";

  return [
    {
      year: 2026,
      role: baseRole,
      skills: ["SQL", "Excel", "Basic Python"],
      salary: "₹4–6 LPA",
      confidence: 0.85,
    },
    {
      year: 2027,
      role: "Data Analyst",
      skills: ["Advanced SQL", "Power BI", "Statistics"],
      salary: "₹7–9 LPA",
      confidence: 0.80,
    },
    {
      year: 2028,
      role: "Senior Data Analyst",
      skills: ["Python", "Business Analytics", "Storytelling"],
      salary: "₹10–13 LPA",
      confidence: 0.75,
    },
    {
      year: 2029,
      role: "Data Scientist",
      skills: ["Machine Learning", "Model Deployment"],
      salary: "₹15–18 LPA",
      confidence: 0.70,
    },
    {
      year: 2030,
      role: "Lead / AI Specialist",
      skills: ["AI Strategy", "Team Leadership"],
      salary: "₹20+ LPA",
      confidence: 0.65,
    },
  ];
}
