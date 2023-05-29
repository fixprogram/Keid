import { useState } from "react";

export const usePopupWithOverlay = () => {
  const [isOpened, setOpened] = useState(false);

  const handleOpenPopup = () => {
    setOpened(true);
  };
  const handleClosePopup = () => setOpened(false);

  return { isOpened, handleClosePopup, handleOpenPopup };
};
