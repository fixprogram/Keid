import { FC, useState } from "react";
import Icon from "./Icon";
import { formatDate } from "../lib/utils/formatDate";

interface StreakCalendarPropsType {
  habitData: Set<string>; // Array of dates in 'YYYY-MM-DD' format
  onDayClick: (date: string) => void;
}

export const StreakCalendar: FC<StreakCalendarPropsType> = ({
  habitData,
  onDayClick,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);
    const days: JSX.Element[] = [];
    const today = new Date();
    const todayDateStr = formatDate(today);

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty-day"></div>);
    }

    for (let day = 2; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const isToday = dateStr === todayDateStr;
      const isHabitStreak = habitData.has(dateStr);
      const isPast = date < today;
      const isFailed = isPast && !isHabitStreak && !isToday;

      days.push(
        <div
          key={day - 1}
          className={`day ${isToday ? "today" : ""} ${
            isHabitStreak ? "habit-streak" : ""
          } ${isFailed ? "failed" : ""}`}
          onClick={() => onDayClick(dateStr)}
        >
          {day - 1}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
  };

  return (
    <div className="streak-calendar px-2 pb-6 text-white text-base font-bold mt-4 bg-background2 rounded-2xl">
      <div className="streak-calendar-navigation">
        <button onClick={() => changeMonth(-1)}>
          <Icon name="back" width={32} height={32} />
        </button>
        <span className="label-text">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)}>
          <div className="rotate-180">
            <Icon name="back" width={32} height={32} />
          </div>
        </button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};
