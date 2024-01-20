import { createWithEqualityFn } from "zustand/traditional";

interface SubtaskListState {
  isPopupOpened: boolean;
  newSubtaskTitle: string;
  deadline: number;
  openPopup: () => void;
  closePopup: () => void;
  setNewSubtaskTitle: (newTitle: string) => void;
  reset: () => void;
}

export const useSubtaskListStore = createWithEqualityFn<SubtaskListState>(
  (set) => ({
    isPopupOpened: false,
    newSubtaskTitle: "",
    deadline: new Date().setHours(23, 59, 59, 999),
    openPopup: () => set(() => ({ isPopupOpened: true })),
    closePopup: () => set(() => ({ isPopupOpened: false })),
    setNewSubtaskTitle: (newTitle: string) =>
      set(() => ({ newSubtaskTitle: newTitle })),
    reset: () => set(() => ({ isPopupOpened: false, newSubtaskTitle: "" })),
  })
);
