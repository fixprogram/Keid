import { create } from "zustand";

export interface CommentsState {
  isPopupOpened: boolean;
  comment: string;
  setPopupOpened: () => void;
  setComment: (newComment: string) => void;
  reset: () => void;
}

export const useCommentsStore = create<CommentsState>((set) => ({
  isPopupOpened: false,
  comment: "",
  setPopupOpened: () => set(() => ({ isPopupOpened: true })),
  setComment: (newComment: string) => set(() => ({ comment: newComment })),
  reset: () => set(() => ({ isPopupOpened: false, comment: "" })),
}));
