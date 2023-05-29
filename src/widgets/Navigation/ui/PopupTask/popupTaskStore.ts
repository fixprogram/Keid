import { create } from "zustand";
import { INITIAL_POPUP_TASK_STATE } from "../../config/consts";
import { PopupTaskState, RepeatsOptionType } from "../../model/types";

export const usePopupTaskStore = create<PopupTaskState>((set, get) => ({
  ...INITIAL_POPUP_TASK_STATE,
  setTaskName: (newTaskName: string) => set(() => ({ taskName: newTaskName })),
  setTaskStyle: (newTaskStyle: string) =>
    set(() => ({ taskStyle: newTaskStyle })),
  openStyleList: () => set(() => ({ isStyleListOpened: true })),
  closeStyleList: () => set(() => ({ isStyleListOpened: false })),
  toggleTaskWithDeadline: () =>
    set(() => ({ isWithDeadline: !get().isWithDeadline })),
  setTaskDeadline: (newDeadline: number) =>
    set(() => ({ deadline: newDeadline })),
  openCalendar: () => set(() => ({ isCalendarOpened: true })),
  closeCalendar: () => set(() => ({ isCalendarOpened: false })),
  setTaskProject: (newProject: { title: string; style: string }) =>
    set(() => ({ activeProject: newProject })),
  setTaskRepeats: (newRepeatsOption: RepeatsOptionType) =>
    set(() => ({ activeRepeatsOption: newRepeatsOption })),
  resetTask: () => set(() => ({ ...INITIAL_POPUP_TASK_STATE })),
}));
