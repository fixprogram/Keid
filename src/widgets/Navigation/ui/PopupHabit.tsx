import { FC, useEffect } from "react";
import { useNavigationStore } from "../model/useNavigationStore";
import { usePopupStore } from "../model/usePopupStore";
import AddButton from "@/shared/ui/AddButton";
import { useHabitFormSubmit } from "../model/useHabitFormSubmit";
import { PopupStyleList } from "./PopupStyleList";
import { PopupInputTitle } from "./PopupInputTitle";
import { PopupPoints } from "./PopupPoints";

export const PopupHabit: FC = () => {
  const handleFormSubmit = useHabitFormSubmit();

  const [isStyleListOpened, setHabitStyle] = usePopupStore((state) => [
    state.isStyleListOpened,
    state.setStyle,
  ]);
  const projectAmount = useNavigationStore((state) => state.projectAmount);

  useEffect(() => {
    setHabitStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01");
  }, [setHabitStyle, projectAmount]);

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <PopupInputTitle placeholder="Habit title..." />

        <div className="mt-6 flex justify-between">
          <PopupPoints />
        </div>

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Privacy
          </span>
          <p className="text-white">Public</p>
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
};
