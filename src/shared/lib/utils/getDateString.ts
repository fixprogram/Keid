import { isDateToday } from "./isDateToday";
import { isDateTomorrow } from "./isDateTomorrow";

export function getDateString(date: Date, withYear = true) {
  let da = date;
  const day = date.getDate();
  const year = date.getFullYear();

  da.setMonth(date.getMonth());
  const month = da.toLocaleString("en-US", { month: "short" });

  console.log("is date today: ", isDateToday(date));

  if (!withYear) {
    if (isDateToday(date)) {
      return "Today";
    }

    if (isDateTomorrow(date)) {
      return "Tomorrow";
    }

    return `${month} ${day}`;
  }

  return `${day} ${month} ${year}`;
}
