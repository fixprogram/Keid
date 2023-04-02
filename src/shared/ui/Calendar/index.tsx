import { getDateString } from "@/shared/lib/utils/getDateString";
import ReactCalendar from "react-calendar";
import Icon from "../Icon";

type Props = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function Calendar({ date, setDate }: Props) {
  return (
    <ReactCalendar
      value={date}
      onChange={(value) => setDate(value as Date)}
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
  );
}
