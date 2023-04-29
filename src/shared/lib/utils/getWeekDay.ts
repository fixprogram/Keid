export function getWeekDayTimestamp(d: Date, weekDayNumber: number) {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? 0 : weekDayNumber); // weekDayNumber = 0 means Sunday, 1 means Monday etc
  return new Date(d.setDate(diff)).setHours(23, 59, 59, 999);
}
