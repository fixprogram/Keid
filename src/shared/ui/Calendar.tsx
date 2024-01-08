import ReactCalendar from "react-calendar";
import Icon from "./Icon";
import { FC } from "react";

interface CalendarPropsType {
  date: Date;
  setDate: (date: number) => void;
}

export const Calendar: FC<CalendarPropsType> = ({ date, setDate }) => {
  return (
    <ReactCalendar
      value={date}
      onChange={(value) => {
        if (value === null) {
          return setDate(0);
        }
        const newDate = value as Date;

        setDate(newDate.setHours(23, 59, 59, 999));
      }}
      className="px-2 pb-6 text-white text-base font-bold mt-4 bg-background2 rounded-2xl"
      formatShortWeekday={(locale, date) =>
        ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
      }
      prevLabel={<Icon name="back" width={32} height={32} />}
      nextLabel={
        <div className="rotate-180">
          <Icon name="back" width={32} height={32} />
        </div>
      }
      prev2Label={null}
      next2Label={null}
    />
  );
};
