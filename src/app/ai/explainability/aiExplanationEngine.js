export function explainCareerPrediction(prediction, userProfile) {
  return {
    reasoning: [
      `Your current skills align with ${prediction.nextRole}`,
      `Demand for ${userProfile.careerGoal} is growing`,
      "Your learning progress matches industry trends",
      "Alumni career data shows similar transitions",
    ],
  };
}
