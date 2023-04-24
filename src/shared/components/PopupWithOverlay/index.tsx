import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import { FC, ReactNode } from "react";

type Position = "Top" | "Bottom";

const STYLES: Record<Position, {}> = {
  Top: { top: "80px", zIndex: 20 },
  Bottom: { bottom: 12, left: 12, right: 12, zIndex: 30 },
};

interface PopupWithOverlayPropsType {
  children: ReactNode;
  isShowed: boolean;
  onClose: () => void;
  positioned: Position;
}

export const PopupWithOverlay: FC<PopupWithOverlayPropsType> = ({
  children,
  isShowed,
  onClose,
  positioned,
}) => {
  return (
    <>
      <Popup
        isHidden={!isShowed}
        popupStyle={{
          hidden: { top: "-1000px" },
          showed: STYLES[positioned],
        }}
      >
        {children}
      </Popup>
      {isShowed ? (
        <div onClick={onClose}>
          <Overlay />
        </div>
      ) : null}
    </>
  );
};
