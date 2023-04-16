export function getLastDayOfTheWeek() {
  const today = new Date();
  const date = today.getDate();

  if (today.getDay() === 0) {
    return today.setHours(23, 59, 59, 999);
  }

  const diff = date + 7 - today.getDay();

  return new Date(today.setDate(diff)).setHours(23, 59, 59, 999);
}

export function getFirstDayOfTheWeek() {
  const today = new Date();
  const date = today.getDate();

  if (today.getDay() === 1) {
    return today.setHours(0, 0, 0, 0);
  }

  const diff = date - 6 + today.getDay();

  return new Date(today.setDate(diff)).setHours(0, 0, 0, 0);
}

export function sortTask(a, b) {
  //   if (a.completed || b.completed) {
  //     return 1;
  //   }
  if (a.progress > b.progress) {
    return -1;
  }
  if (a.progress < b.progress) {
    return 1;
  }
  return 0;
}
