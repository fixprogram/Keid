import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { usePopupHabitStore } from "../../popupHabitStore";

export const PopupStyleButton: FC = () => {
  const [habitStyle, openStyleList] = usePopupHabitStore(
    (state) => [state.habitStyle, state.openStyleList],
    shallow
  );

  const style = projectStyles[habitStyle as ProjectStyleKey];

  return (
    <button
      type="button"
      className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
      style={{ background: style.gradient }}
      onClick={() => openStyleList()}
    />
  );
};
