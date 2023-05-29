import { create } from "zustand";
import { INITIAL_POPUP_PROJECT_STATE } from "../../config/consts";
import { PopupProjectState } from "../../model/types";

export const usePopupProjectStore = create<PopupProjectState>((set) => ({
  ...INITIAL_POPUP_PROJECT_STATE,
  setProjectName: (newProjectName: string) =>
    set(() => ({ projectName: newProjectName })),
  setProjectStyle: (newProjectStyle: string) =>
    set(() => ({ projectStyle: newProjectStyle })),
  openStyleList: () => set(() => ({ isStyleListOpened: true })),
  closeStyleList: () => set(() => ({ isStyleListOpened: false })),
  resetProject: () => set(() => ({ ...INITIAL_POPUP_PROJECT_STATE })),
}));
