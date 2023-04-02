import Icon from "@/shared/ui/Icon";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import { Fragment, useState } from "react";

interface Props {
  screens: string[];
}

export default function ScreenList({ screens = [] }: Props) {
  const [activeCategory, setActiveCategory] = useState(screens[0]);
  const [isCategoriesListShowed, setCategoriesListShowed] = useState(false);

  if (screens.length === 0) {
    return null;
  }

  return (
    <>
      <div className="text-white">
        <button
          type="button"
          className="text-deactive text-sm font-medium flex gap-2 items-center"
          onClick={() => setCategoriesListShowed(!isCategoriesListShowed)}
        >
          <span>{activeCategory}</span>{" "}
          <Icon name="arrow-down" width={16} height={16} />
        </button>

        <Popup
          isHidden={!isCategoriesListShowed}
          popupStyle={{
            hidden: { top: "-1000px" },
            showed: { top: "80px", zIndex: 20 },
          }}
        >
          <ul>
            {screens.map((category, index, array) => (
              <Fragment key={category}>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory(category);
                      setCategoriesListShowed(!isCategoriesListShowed);
                    }}
                    className={`text-left font-semibold p-5 pl-10 w-full  ${
                      activeCategory === category
                        ? "text-white"
                        : "text-deactive"
                    }`}
                  >
                    {category}
                  </button>
                </li>
                {array.length - 1 !== index ? (
                  <div className="w-full bg-white/5 h-[1px]" />
                ) : null}
              </Fragment>
            ))}
          </ul>
        </Popup>
      </div>
      {isCategoriesListShowed ? (
        <div onClick={() => setCategoriesListShowed(false)}>
          <Overlay />
        </div>
      ) : null}
    </>
  );
}