export function isDateToday(date: Date) {
  const today = new Date();
  const todayDay = today.getDay();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const dateDay = date.getDay();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  return (
    todayDay === dateDay && todayMonth === dateMonth && todayYear === dateYear
  );
}
