export function predictCareerGrowth(userProfile) {
  const { experience, careerGoal, skills } = userProfile;

  let nextRole = "Junior Analyst";
  let timeline = "1–2 years";
  let confidence = 0.6;

  if (careerGoal === "Data Scientist") {
    if (skills.includes("Python") && skills.includes("Statistics")) {
      nextRole = "Junior Data Scientist";
      timeline = "12–18 months";
      confidence = 0.82;
    }
  }

  return {
    nextRole,
    timeline,
    confidence,
  };
}
