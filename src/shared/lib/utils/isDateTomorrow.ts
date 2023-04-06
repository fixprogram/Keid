export function isDateTomorrow(date: Date) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
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
