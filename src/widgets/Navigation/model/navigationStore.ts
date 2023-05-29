import { Project } from "./types";
import { create } from "zustand";

type NavigationDataType = {
  userProjectNames: Project[];
  projectAmount: number;
  userId: string;
};

export interface NavigationState {
  userId: string;
  popupAddState: "idle" | "task" | "project";
  popupAddOpened: boolean;
  userProjectNames: Project[];
  projectAmount: number;
  openPopupAdd: () => void;
  closePopupAdd: () => void;
  setPopupAddState: (popupState: "task" | "project") => void;
  setData: (data: NavigationDataType) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  userId: "",
  popupAddState: "idle",
  popupAddOpened: false,
  userProjectNames: [
    {
      title: "No project",
      style: "01",
    },
  ],
  projectAmount: 0,
  openPopupAdd: () => set(() => ({ popupAddOpened: true })),
  closePopupAdd: () =>
    set(() => ({ popupAddOpened: false, popupAddState: "idle" })),
  setPopupAddState: (popupState: "task" | "project") =>
    set(() => ({ popupAddState: popupState })),
  setData: (data) => set(() => ({ ...data })),
}));
