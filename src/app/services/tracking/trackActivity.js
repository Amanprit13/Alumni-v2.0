export const trackActivity = (userId, actionType, entityId) => {
  console.log({
    userId,
    actionType,
    entityId,
    timestamp: new Date()
  });
};
