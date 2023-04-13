import { Day } from "../../models";

interface DaysListProps {
  days: Day[];
  maxActivity: number;
}

export default function DaysList({ days, maxActivity }: DaysListProps) {
  return (
    <ul className="flex justify-between max-w-[85%] grow mb-[-12px]">
      {days.map((day, idx) => {
        const activityHeight = Math.floor((day.taskAmount / maxActivity) * 63);
        return (
          <li key={idx} className="flex flex-col items-center justify-end">
            <div
              className="w-[6px]"
              style={{
                borderRadius: "8px 8px 2px 2px",
                backgroundColor: "#FBA3FF",
                height: `${activityHeight}%`,
              }}
            />
            <b className="text-deactive text-xxs block mt-1">{day.title}</b>
          </li>
        );
      })}
    </ul>
  );
}
