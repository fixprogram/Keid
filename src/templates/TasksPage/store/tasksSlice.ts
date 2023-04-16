import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FILTERS } from "../config/filters";
import { getDateString } from "@/shared/lib/utils/getDateString";

export type TaskType = {
  id: string;
  title: string;
  style: string;
  deadline: string;
  progress: number;
  completed: string;
};

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
    setupTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload.map((task) => ({
        ...task,
        deadline: getDateString(new Date(JSON.parse(task.deadline)), false),
        completed: task.completed
          ? getDateString(new Date(JSON.parse(task.completed)), false)
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
