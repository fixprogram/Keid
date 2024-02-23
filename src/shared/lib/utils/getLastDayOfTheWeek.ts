export function getLastDayOfTheWeek() {
  const today = new Date();
  const date = today.getDate();

  if (today.getDay() === 0) {
    return today.setUTCHours(23, 59, 59, 999);
  }

  const diff = date + 7 - today.getDay();

  return new Date(today.setDate(diff)).setUTCHours(23, 59, 59, 999);
}
