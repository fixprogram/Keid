import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopupWithOverlay } from "./PopupWithOverlay.hook";
import { MAX_WIDTH } from "@/shared/config/consts";

type Position = "Top" | "Bottom" | "BottomFullWidth";

const isDesktop =
  typeof window !== "undefined" && window.innerWidth > MAX_WIDTH;

const STYLES: Record<Position, {}> = {
  Top: { top: 80, zIndex: 30 },
  Bottom: { bottom: 12, zIndex: 30 },
  // Bottom: { bottom: 12, left: 12, right: 12, zIndex: 30 },
  BottomFullWidth: {
    bottom: 12,
    left: isDesktop ? "initial" : 0,
    right: isDesktop ? "initial" : 0,
    zIndex: 30,
  },
};

interface PopupWithOverlayPropsType {
  children: ReactNode;
  btn: ReactNode;
  positioned: Position;
  isBlack?: boolean;
  isClosed?: boolean;
}

export const PopupWithOverlay: FC<PopupWithOverlayPropsType> = ({
  children,
  btn,
  positioned,
  isBlack = false,
  isClosed = false,
}) => {
  const { isOpened, handleClosePopup, handleOpenPopup } = usePopupWithOverlay();

  return (
    <>
      <button type="button" onClick={handleOpenPopup}>
        {btn}
      </button>

      {isOpened && !isClosed
        ? createPortal(
            <>
              <Popup
                isHidden={!isOpened}
                popupStyle={{
                  hidden: { top: -1000 },
                  showed: STYLES[positioned],
                }}
                isBlack={isBlack}
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
