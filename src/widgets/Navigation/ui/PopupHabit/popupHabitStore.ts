import { create } from "zustand";
import { INITIAL_POPUP_HABIT_STATE } from "../../config/consts";
import { PopupHabitState } from "../../model/types";

export const usePopupHabitStore = create<PopupHabitState>((set) => ({
  ...INITIAL_POPUP_HABIT_STATE,
  setHabitName: (newHabitName: string) =>
    set(() => ({ habitName: newHabitName })),
  setHabitStyle: (newHabitStyle: string) =>
    set(() => ({ habitStyle: newHabitStyle })),
  openStyleList: () => set(() => ({ isStyleListOpened: true })),
  closeStyleList: () => set(() => ({ isStyleListOpened: false })),
  resetHabit: () => set(() => ({ ...INITIAL_POPUP_HABIT_STATE })),
}));
