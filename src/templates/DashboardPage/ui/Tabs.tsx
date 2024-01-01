import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import { CARDS_CONFIG } from "../../../widgets/Overview/config/config";
import { CardType } from "../../../widgets/Overview/config/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    title: "Overview",
    link: "/dashboard/overview",
  },
  {
    title: "Productivity",
    link: "/dashboard/productivity",
  },
];

const CARDS = Object.values(CardType);

export default function Filter() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between mt-8">
      <ul className="flex">
        {tabs.map((tab) => {
          const isActive = pathname === tab.link;

          return (
            <li key={tab.link}>
              <Link
                className={`font-semibold text-base py-1 px-4 rounded-2xl	block  ${
                  isActive ? "text-white bg-primary" : "text-deactive"
                }`}
                href={tab.link}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <PopupWithOverlay
        positioned="Bottom"
        btn={<Icon name="filter" width={25} height={25} />}
      >
        <PopupLine />

        <ul className="mt-2">
          {CARDS.map((card) => (
            <li
              key={card}
              className="border-b-[1px] border-white/5 p-5 flex items-start justify-between"
            >
              <b className="text-lg text-white font-bold ml-9">
                {CARDS_CONFIG[card].title}
              </b>
              <div>
                <input type="checkbox" id={card} className="hidden peer" />
                <label
                  htmlFor={card}
                  className="block w-[48px] h-[24px] bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-[45px] pr-[41px] pb-5 pl-8">
          <input
            type="reset"
            value={"Clear all"}
            className="font-bold text-deactive text-base"
          />

          <button
            type="submit"
            className="shadow-button bg-primary py-2 px-5 text-base text-white font-bold rounded-3xl"
          >
            Save changes
          </button>
        </div>
      </PopupWithOverlay>
    </div>
  );
}
