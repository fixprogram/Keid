export function getFirstDayOfTheWeek() {
  const today = new Date();
  const date = today.getDate();

  if (today.getDay() === 0) {
    return new Date(today.setDate(date - 6)).setUTCHours(0, 0, 0, 0);
  }

  if (today.getDay() === 1) {
    return today.setUTCHours(0, 0, 0, 0);
  }

  const diff = date - today.getDay() + 1;

  return new Date(today.setDate(diff)).setUTCHours(0, 0, 0, 0);
}
