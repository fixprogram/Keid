import { getDateString } from "@/shared/lib/utils/getDateString";
import ReactCalendar from "react-calendar";
import Icon from "../Icon";

type Props = {
  date: Date;
  setDate: (date: number) => void;
};

export default function Calendar({ date, setDate }: Props) {
  return (
    <div>
      <ReactCalendar
        value={date}
        onChange={(value) => {
          if (value === null) {
            return setDate(0);
          }
          const newDate = value as Date;
          setDate(newDate.getTime());
        }}
        className="text-white text-base font-bold mt-4"
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        prevLabel={<Icon name="back" width={32} height={32} />}
        prev2Label={""}
        nextLabel={
          <div className="rotate-180">
            <Icon name="back" width={32} height={32} />
          </div>
        }
        next2Label={""}
        navigationLabel={() => getDateString(date)}
      />
    </div>
  );
}
