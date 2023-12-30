export const getTodayTimestamps = () => {
  const now = new Date();

  // Start of the day
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startTimestamp = startOfDay.getTime();

  // End of the day
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  const endTimestamp = endOfDay.getTime();

  return { startTimestamp, endTimestamp };
};
