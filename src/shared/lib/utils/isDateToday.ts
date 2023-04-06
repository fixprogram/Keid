export function isDateToday(date: Date) {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  return (
    todayDay === dateDay && todayMonth === dateMonth && todayYear === dateYear
  );
}
