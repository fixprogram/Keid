import { FC, useEffect } from "react";
import { useNavigationStore } from "../../model/navigationStore";
import PopupBody from "./ui/PopupBody";
import { PopupStyleList } from "./ui/PopupStyleList";
import { usePopupHabitStore } from "./popupHabitStore";

export const PopupHabit: FC = () => {
  const [isStyleListOpened, setHabitStyle] = usePopupHabitStore((state) => [
    state.isStyleListOpened,
    state.setHabitStyle,
  ]);
  const projectAmount = useNavigationStore((state) => state.projectAmount);

  useEffect(() => {
    setHabitStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01");
  }, [setHabitStyle, projectAmount]);

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return <PopupBody />;
};
