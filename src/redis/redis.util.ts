export const getTokenRedisKey = (userId: number, deviceInfo: string): string => {
  return `token:${userId}:${deviceInfo}`;
};
