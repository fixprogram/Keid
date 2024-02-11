import Overlay from "@/shared/ui/Overlay";
import { Popup } from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { FC, Fragment, useCallback } from "react";
import PopupIdle from "./PopupIdle";
import PopupProject from "./PopupProject";
import PopupTask from "./PopupTask";
import { useNavigationStore } from "../model/useNavigationStore";
import AddButton from "@/shared/ui/AddButton";
import { createPortal } from "react-dom";
import { shallow } from "zustand/shallow";
import { PopupHabit } from "./PopupHabit";
import { usePopupStore } from "../model/usePopupStore";
import PopupChallenge from "./PopupChallenge";
import { MAX_WIDTH } from "@/shared/config/consts";

const POPUP_CONTENT = {
  idle: {
    component: PopupIdle,
  },
  task: {
    component: PopupTask,
  },
  project: {
    component: PopupProject,
  },
  habit: {
    component: PopupHabit,
  },
  challenge: {
    component: PopupChallenge,
  },
};

export const AddPopup: FC = () => {
  const [
    popupAddOpened,
    popupStyle,
    popupAddState,
    openPopupAdd,
    closePopupAdd,
    setPopupStyle,
  ] = useNavigationStore(
    (state) => [
      state.popupAddOpened,
      state.popupStyle,
      state.popupAddState,
      state.openPopupAdd,
      state.closePopupAdd,
      state.setPopupStyle,
    ],
    shallow
  );

  const resetPopupData = usePopupStore((state) => state.reset);

  const handleClosePopup = useCallback(() => {
    resetPopupData();
    closePopupAdd();
    setPopupStyle("gray");
  }, [resetPopupData, closePopupAdd, setPopupStyle]);

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth > MAX_WIDTH;
  const Component = POPUP_CONTENT[popupAddState].component;
  const popupShowedStyles =
    popupAddState === "idle"
      ? { bottom: 32, zIndex: 30 }
      : {
          bottom: 0,
          left: isDesktop ? "initial" : 0,
          right: isDesktop ? "initial" : 0,
          borderRadius: "24px 24px 0 0",
          zIndex: 30,
          // TODO: Delete these styles when there's a desktop version
          width: isDesktop ? MAX_WIDTH : "auto",
          margin: isDesktop ? 0 : "auto",
        };

  return (
    <Fragment>
      <AddButton handleClick={openPopupAdd} />

      {popupAddOpened
        ? createPortal(
            <>
              <Popup
                isHidden={!popupAddOpened}
                popupStyle={{
                  hidden: { bottom: -1000 },
                  showed: popupShowedStyles,
                }}
                isBlack={popupStyle === "black"}
              >
                {popupStyle === "gray" ? <PopupLine /> : null}

                <Component />
              </Popup>

              <div className="absolute top-0 left-0" onClick={handleClosePopup}>
                <Overlay />
              </div>
            </>,
            document.body
          )
        : null}
    </Fragment>
  );
};
