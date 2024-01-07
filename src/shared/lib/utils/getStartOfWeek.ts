export const getStartOfWeek = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (today.getUTCDay() || 7) + 1);

  return startOfWeek;
};
