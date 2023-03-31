import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopupAdd } from "../../store/navigationSlice";
import PopupIdle from "../PopupIdle";
import PopupProject from "../PopupProject";
import PopupTask from "../PopupTask";

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
  const dispatch = useDispatch();
  const popupAddOpened = useAppSelector(
    (state) => state.navigation.popupAddOpened
  );
  const popupAddState = useAppSelector(
    (state) => state.navigation.popupAddState
  );

  const Component = POPUP_CONTENT[popupAddState].component;

  return (
    <Fragment>
      <Popup
        isHidden={!popupAddOpened}
        popupStyle={{
          hidden: { bottom: -1000 },
          showed: { bottom: 32, zIndex: 30 },
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
