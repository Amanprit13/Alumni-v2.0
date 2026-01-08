export function calculateMentorScore(student, mentor) {
  let score = 0;

  // Skill match (40)
  const skillMatch = mentor.expertise.filter(skill =>
    student.skills.includes(skill)
  ).length;
  score += Math.min(skillMatch * 10, 40);

  // Career alignment (30)
  if (mentor.role.toLowerCase().includes(student.careerGoal.toLowerCase())) {
    score += 30;
  }

  // Experience (20)
  score += Math.min(mentor.experience * 2, 20);

  // Location (10)
  if (mentor.location === student.location) {
    score += 10;
  }

  return score;
}
