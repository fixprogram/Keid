import { useState } from "react";

export const usePopupWithOverlay = (onClose?: () => {}) => {
  const [isOpened, setOpened] = useState(false);

  const handleOpenPopup = () => {
    setOpened(true);
  };
  const handleClosePopup = () => {
    onClose?.();
    setOpened(false);
  };

  return { isOpened, handleClosePopup, handleOpenPopup };
};
