import { createWithEqualityFn } from "zustand/traditional";

export interface CommentsState {
  isPopupOpened: boolean;
  comment: string;
  setPopupOpened: () => void;
  setComment: (newComment: string) => void;
  reset: () => void;
}

export const useCommentsStore = createWithEqualityFn<CommentsState>((set) => ({
  isPopupOpened: false,
  comment: "",
  setPopupOpened: () => set(() => ({ isPopupOpened: true })),
  setComment: (newComment: string) => set(() => ({ comment: newComment })),
  reset: () => set(() => ({ isPopupOpened: false, comment: "" })),
}));
