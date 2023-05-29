import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopupWithOverlay } from "./PopupWithOverlay.hook";

type Position = "Top" | "Bottom";

const STYLES: Record<Position, {}> = {
  Top: { top: 80, zIndex: 30 },
  Bottom: { bottom: 12, left: 12, right: 12, zIndex: 30 },
};

interface PopupWithOverlayPropsType {
  children: ReactNode;
  btn: ReactNode;
  positioned: Position;
}

export const PopupWithOverlay: FC<PopupWithOverlayPropsType> = ({
  children,
  btn,
  positioned,
}) => {
  const { isOpened, handleClosePopup, handleOpenPopup } = usePopupWithOverlay();

  return (
    <>
      <button type="button" onClick={handleOpenPopup}>
        {btn}
      </button>

      {isOpened
        ? createPortal(
            <>
              <Popup
                isHidden={!isOpened}
                popupStyle={{
                  hidden: { top: -1000 },
                  showed: STYLES[positioned],
                }}
              >
                {children}
              </Popup>
              <div onClick={handleClosePopup}>
                <Overlay />
              </div>
            </>,
            document.body
          )
        : null}
    </>
  );
};
