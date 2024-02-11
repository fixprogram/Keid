import { Project } from "../config/types";
import { createWithEqualityFn } from "zustand/traditional";

export enum PopupAddState {
  "task" = "task",
  "project" = "project",
  "habit" = "habit",
  "challenge" = "challenge",
}

type NavigationDataType = {
  userProjects: Project[];
  projectAmount: number;
  userId: string;
};

export interface NavigationState {
  userId: string;
  popupStyle: "gray" | "black";
  popupAddState: "idle" | PopupAddState;
  popupAddOpened: boolean;
  userProjects: Project[];
  projectAmount: number;
  openPopupAdd: () => void;
  closePopupAdd: () => void;
  setPopupAddState: (popupState: PopupAddState) => void;
  setData: (data: NavigationDataType) => void;
  setPopupStyle: (newStyle: "gray" | "black") => void;
}

export const useNavigationStore = createWithEqualityFn<NavigationState>(
  (set) => ({
    userId: "",
    popupStyle: "gray",
    popupAddState: "idle",
    popupAddOpened: false,
    userProjects: [
      {
        title: "No project",
        style: "01",
        metrics: [],
      },
    ],
    projectAmount: 0,
    openPopupAdd: () => set(() => ({ popupAddOpened: true })),
    closePopupAdd: () =>
      set(() => ({ popupAddOpened: false, popupAddState: "idle" })),
    setPopupAddState: (popupState: PopupAddState) =>
      set(() => ({ popupAddState: popupState })),
    setData: (data) => set(() => ({ ...data })),
    setPopupStyle: (newStyle) => set(() => ({ popupStyle: newStyle })),
  })
);
