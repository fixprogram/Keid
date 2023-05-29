import { create } from "zustand";

interface SubtaskListState {
  isPopupOpened: boolean;
  newSubtaskTitle: string;
  deadline: number;
  openPopup: () => void;
  closePopup: () => void;
  setNewSubtaskTitle: (newTitle: string) => void;
  reset: () => void;
}

export const useSubtaskListStore = create<SubtaskListState>((set) => ({
  isPopupOpened: false,
  newSubtaskTitle: "",
  deadline: Date.now(),
  openPopup: () => set(() => ({ isPopupOpened: true })),
  closePopup: () => set(() => ({ isPopupOpened: false })),
  setNewSubtaskTitle: (newTitle: string) =>
    set(() => ({ newSubtaskTitle: newTitle })),
  reset: () => set(() => ({ isPopupOpened: false, newSubtaskTitle: "" })),
}));
