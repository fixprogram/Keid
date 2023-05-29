import { create } from "zustand";
import { TaskFilterType, TASK_FILTERS } from "../config/consts";

export interface TaskState {
  data: {};
  activeFilter: TaskFilterType;
  setActiveFilter: (newFilter: TaskFilterType) => void;
  setTasksData: (tasksData: {}) => void;
}

export const useTasksStore = create<TaskState>((set) => ({
  data: {},
  activeFilter: TASK_FILTERS[0],
  setTasksData: (tasksData) => set(() => ({ data: tasksData })),
  setActiveFilter: (newFilter: TaskFilterType) =>
    set(() => ({ activeFilter: newFilter })),
}));
