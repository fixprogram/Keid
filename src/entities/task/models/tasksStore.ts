import { createWithEqualityFn } from "zustand/traditional";
import { TaskFilterType, TASK_FILTERS } from "../config/consts";

export interface TaskState {
  data: {};
  activeFilter: TaskFilterType;
  setActiveFilter: (newFilter: TaskFilterType) => void;
  setTasksData: (tasksData: {}) => void;
}

export const useTasksStore = createWithEqualityFn<TaskState>((set) => ({
  data: {},
  activeFilter: TASK_FILTERS[0],
  setTasksData: (tasksData) => set(() => ({ data: tasksData })),
  setActiveFilter: (newFilter: TaskFilterType) =>
    set(() => ({ activeFilter: newFilter })),
}));
