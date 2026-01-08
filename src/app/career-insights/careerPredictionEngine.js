import { careerPaths } from "@/data/career/careerPaths.mock";

export const careerPredictionEngine = (user) => {
  const currentRole = user.role;
  const careerData = careerPaths[currentRole];

  if (!careerData) {
    return null;
  }

  const missingSkills = careerData.requiredSkills.filter(
    skill => !user.skills.includes(skill)
  );

  return {
    currentRole,
    nextRoles: careerData.nextRoles,
    skillGap: missingSkills,
    readinessScore:
      Math.max(
        0,
        100 - (missingSkills.length * 20)
      )
  };
};
