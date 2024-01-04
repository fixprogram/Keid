import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC, Fragment } from "react";
import { DATES, useDashboardStore } from "../model/useDashboardStore";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { usePathname } from "next/navigation";

export const DashboardHeader: FC = () => {
  const pathname = usePathname();
  const userId = useNavigationStore((state) => state.userId);

  console.log("pathname: ", pathname?.split("/").at(-1));

  const page = pathname?.split("/").at(-1);

  // const [dateType, setDateType] = useDashboardStore((state) => [
  //   state.dateType,
  //   state.setDateType,
  // ]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2" style={{ alignItems: "flex-end" }}>
        <h2 className="text-white text-xl font-poppins font-semibold">
          {page === "overview" ? "Overview" : "Productivity"}
          {/* <PopupWithOverlay
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
        </PopupWithOverlay> */}
        </h2>
        <p className="text-white opacity-30">|</p>
        <Link
          className="text-white text-xl font-poppins font-semibold"
          href={`/dashboard/${
            page === "overview" ? "productivity" : "overview"
          }`}
          style={{
            opacity: 0.3,
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "17px",
          }}
        >
          {page === "overview" ? "Productivity" : "Overview"}
        </Link>
      </div>

      <Link
        href={`/profile/${userId}`}
        className="w-[40px] h-[40px] rounded-full"
      >
        <Icon name="avatar" width={40} height={40} />
      </Link>
    </div>
  );
};
