export const enrichResponse = (response, user) => {
  return `Based on your profile (${user.department}, ${user.graduationYear}), ${response}`;
};
