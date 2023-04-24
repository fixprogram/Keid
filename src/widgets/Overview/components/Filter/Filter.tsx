import FilterBar from "@/features/FilterBar";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import {
  closeSettings,
  openSettings,
  setActiveFilter,
} from "@/widgets/Overview/store/overviewSlice";
import { CARDS_CONFIG } from "../../lib/config";
import { CardType } from "../../lib/types";
import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";

const TYPES: CardType[] = ["Task", "Project", "Habit"];

export default function Filter() {
  const dispatch = useAppDispatch();
  const overview = useAppSelector((state) => state.overview);

  const filterClickHandler = (filter: string) =>
    dispatch(setActiveFilter(filter));
  const { settingsOpened, filters, activeFilter } = overview;

  const handlePopupClose = () => dispatch(closeSettings());

  return (
    <FilterBar
      filterClickHandler={filterClickHandler}
      filters={filters}
      activeFilter={activeFilter}
    >
      <button type="button" onClick={() => dispatch(openSettings())}>
        <Icon name="filter" width={25} height={25} />
      </button>

      <PopupWithOverlay
        isShowed={settingsOpened}
        onClose={handlePopupClose}
        positioned="Bottom"
      >
        <PopupLine />

        <ul className="mt-2">
          {TYPES.map((type) => (
            <li
              key={type}
              className="border-b-[1px] border-white/5 p-5 flex items-start justify-between"
            >
              <b className="text-lg text-white font-bold ml-9">
                {CARDS_CONFIG[type].title}
              </b>
              <div>
                <input type="checkbox" id={type} className="hidden peer" />
                <label
                  htmlFor={type}
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
    </FilterBar>
  );
}
