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

      {/* <div className="mt-4">
        <b className="text-lg text-white font-bold">No deadline</b>
        <div>
          <input
            type="checkbox"
            id="no_deadline"
            className="hidden peer"
            onChange={(e) => {
              if (e.target.checked) {
                setDate(0);
              }
            }}
          />
          <label
            htmlFor="no_deadline"
            className="block w-[48px] h-[24px] bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
          />
        </div>
      </div> */}
    </div>
  );
}
