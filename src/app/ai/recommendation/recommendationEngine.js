export const recommendationEngine = (
  user,
  alumniList,
  jobs,
  events
) => {

  const recommendedMentors = alumniList.filter(a =>
    a.department === user.department &&
    a.experienceYears > user.experienceYears
  );

  const recommendedJobs = jobs.filter(job =>
    job.skills.some(skill => user.skills.includes(skill))
  );

  const recommendedEvents = events.filter(event =>
    user.interests.includes(event.category)
  );

  return {
    mentors: recommendedMentors.slice(0, 3),
    jobs: recommendedJobs.slice(0, 5),
    events: recommendedEvents.slice(0, 3)
  };
};
