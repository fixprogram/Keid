import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC, Fragment } from "react";
import { DATES, DateType, useDashboardStore } from "../model/dashboardStore";

export const DashboardHeader: FC = () => {
  const [dateType, setDateType] = useDashboardStore((state) => [
    state.dateType,
    state.setDateType,
  ]);
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-white text-xl font-poppins font-semibold">
        Dashboard |{" "}
        <PopupWithOverlay
          btn={
            <h2 className="text-white text-xl font-poppins font-semibold">
              {dateType}
            </h2>
          }
          positioned="Top"
        >
          <ul>
            {DATES.map((date, index, array) => (
              <Fragment key={date}>
                <li>
                  <button
                    className={`block text-left font-semibold p-5 pl-10 w-full  ${
                      dateType === date ? "text-white" : "text-deactive"
                    }`}
                    onClick={() => setDateType(date)}
                  >
                    {date}
                  </button>
                </li>
                {array.length - 1 !== index ? (
                  <div className="w-full bg-white/5 h-[1px]" />
                ) : null}
              </Fragment>
            ))}
          </ul>
        </PopupWithOverlay>
      </h2>

      <Link href="/profile" className="w-[40px] h-[40px] rounded-full">
        <Icon name="avatar" width={40} height={40} />
      </Link>
    </div>
  );
};
