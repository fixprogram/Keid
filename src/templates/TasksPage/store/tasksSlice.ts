import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FILTERS } from "../config/consts";
import { FilterType } from "../config/types";
import { sortTasks, TaskType } from "@/shared/lib/utils/sortTasks";

export interface TasksState {
  filters: string[];
  activeFilter: string;
  tasks: Record<FilterType, TaskType[]>;
}

const initialState: TasksState = {
  filters: FILTERS,
  activeFilter: FILTERS[0],
  tasks: { "To do": [], Completed: [], All: [] },
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setupTasks: (state, action: PayloadAction<TaskType[]>) => {
      const tasks = action.payload;
      const allTasks = sortTasks(tasks);
      state.tasks["All"] = allTasks;
      state.tasks["Completed"] = allTasks.filter((task) =>
        Boolean(task.completed)
      );
      state.tasks["To do"] = allTasks.filter((task) => task.completed === 0);
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.tasks,
      };
    },
  },
});

export const { setActiveFilter, setupTasks } = TasksSlice.actions;

export default TasksSlice.reducer;
