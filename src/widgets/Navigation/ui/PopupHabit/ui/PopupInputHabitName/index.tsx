import { FC, SyntheticEvent, useCallback } from "react";
import { PopupStyleButton } from "../PopupStyleButton";
import { shallow } from "zustand/shallow";
import { usePopupHabitStore } from "../../popupHabitStore";

export const PopupInputHabitName: FC = () => {
  const [habitName, error, setHabitName] = usePopupHabitStore(
    (state) => [state.habitName, state.error, state.setHabitName],
    shallow
  );
  const handleHabitNameChange = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      return setHabitName(target.value);
    },
    [setHabitName]
  );
  return (
    <div className="flex items-end">
      <PopupStyleButton />

      <input
        type="text"
        name="name"
        placeholder="Habit Name..."
        className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        style={{ background: "inherit" }}
        value={habitName}
        onChange={handleHabitNameChange}
        autoComplete="off"
      />

      <p>{error}</p>
    </div>
  );
};
