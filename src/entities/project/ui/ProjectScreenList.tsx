import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import { FC, Fragment, useState } from "react";
import { shallow } from "zustand/shallow";
import { PROJECT_SCREENS } from "../config/consts";
import { useProjectStore } from "../models/projectStore";

export const ProjectScreenList: FC = () => {
  const [activeScreen, setActiveScreen] = useProjectStore(
    (state) => [state.activeScreen, state.setActiveScreen],
    shallow
  );

  return (
    <div className="text-white">
      <PopupWithOverlay
        positioned="Top"
        btn={
          <div className="text-deactive text-sm font-medium flex gap-2 items-center">
            <span>{activeScreen}</span>{" "}
            <Icon name="arrow-down" width={16} height={16} />
          </div>
        }
      >
        <ul>
          {PROJECT_SCREENS.map((screen, index, array) => (
            <Fragment key={screen}>
              <li>
                <button
                  onClick={() => {
                    setActiveScreen(screen);
                  }}
                  className={`text-left font-semibold p-5 pl-10 w-full  ${
                    activeScreen === screen ? "text-white" : "text-deactive"
                  }`}
                >
                  {screen}
                </button>
              </li>
              {array.length - 1 !== index ? (
                <div className="w-full bg-white/5 h-[1px]" />
              ) : null}
            </Fragment>
          ))}
        </ul>
      </PopupWithOverlay>
    </div>
  );
};
