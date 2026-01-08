export function predictCareerGrowth(profile) {
  let salaryBase = 400000; // fresher avg (India)
  let growthRate = 0.25;

  const future = [];

  for (let year = 1; year <= 5; year++) {
    salaryBase += salaryBase * growthRate;

    future.push({
      year: profile.experience + year,
      salary: Math.round(salaryBase),
      role:
        year < 2
          ? "Software Engineer"
          : year < 4
          ? "Senior Software Engineer"
          : "Tech Lead"
    });
  }

  return future;
}

export function recommendSkills(profile) {
  const skillMap = {
    react: ["next.js", "system design"],
    node: ["microservices", "docker"],
    sql: ["data modeling", "performance tuning"]
  };

  let recommended = new Set();

  profile.skills.forEach(skill => {
    skillMap[skill]?.forEach(s => recommended.add(s));
  });

  return [...recommended];
}
