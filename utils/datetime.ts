export const formatDate = (timestamp: number) => {
  const t = new Date(timestamp);
  return `${t.getHours()}:${t.getMinutes()}`;
};
