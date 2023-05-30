import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { Fragment } from "react";
import PopupIdle from "../PopupIdle";
import PopupProject from "../PopupProject";
import PopupTask from "../PopupTask";
import { useNavigationStore } from "../../model/navigationStore";
import AddButton from "@/shared/ui/AddButton";
import { createPortal } from "react-dom";
import { shallow } from "zustand/shallow";
import { PopupHabit } from "../PopupHabit";

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
};

export default function Add() {
  const [popupAddOpened, popupAddState, openPopupAdd, closePopupAdd] =
    useNavigationStore(
      (state) => [
        state.popupAddOpened,
        state.popupAddState,
        state.openPopupAdd,
        state.closePopupAdd,
      ],
      shallow
    );

  const Component = POPUP_CONTENT[popupAddState].component;
  const popupShowedStyles =
    popupAddState === "idle"
      ? { bottom: 32, zIndex: 30 }
      : {
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: "24px 24px 0 0",
          zIndex: 30,
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
              >
                <PopupLine />

                <Component />
              </Popup>

              <div className="absolute top-0 left-0" onClick={closePopupAdd}>
                <Overlay />
              </div>
            </>,
            document.body
          )
        : null}
    </Fragment>
  );
}