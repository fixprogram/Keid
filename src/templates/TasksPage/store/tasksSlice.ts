import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FILTERS } from "../config/filters";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Task } from "@prisma/client";
import { TaskType } from "@/entities/task/types";

export interface TasksState {
  filters: string[];
  activeFilter: string;
  tasks: TaskType[];
}

const initialState: TasksState = {
  filters: FILTERS,
  activeFilter: FILTERS[0],
  tasks: [],
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setupTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload.map((task) => ({
        ...task,
        deadline: getDateString(new Date(task.deadline), false),
        completed: task.completed
          ? getDateString(new Date(task.completed), false)
          : "",
      }));
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
