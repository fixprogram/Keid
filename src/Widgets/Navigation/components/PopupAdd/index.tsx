import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Fragment } from "react";
import { closePopupAdd } from "../../store/navigationSlice";
import PopupIdle from "./components/PopupIdle";
import PopupProject from "./components/PopupProject";
import PopupTask from "./components/PopupTask";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

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
};

export default function PopupAdd() {
  const dispatch = useAppDispatch();
  const popupAddOpened = useAppSelector(
    (state) => state.navigation.popupAddOpened
  );
  const popupAddState = useAppSelector(
    (state) => state.navigation.popupAddState
  );

  const Component = POPUP_CONTENT[popupAddState].component;
  const popupShowedStyles =
    popupAddState === "idle"
      ? { bottom: 32 }
      : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0" };

  return (
    <Fragment>
      <Popup
        isHidden={!popupAddOpened}
        popupStyle={{
          hidden: { bottom: -1000 },
          showed: { zIndex: 30, ...popupShowedStyles },
        }}
      >
        <PopupLine />

        <Component />
      </Popup>

      {popupAddOpened ? (
        <div
          className="absolute top-0 left-0"
          onClick={() => dispatch(closePopupAdd())}
        >
          <Overlay />
        </div>
      ) : null}
    </Fragment>
  );
}
