import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FILTERS } from "../config/consts";
import { Task } from "@prisma/client";
import { TaskType } from "@/entities/task/types";
import { convertTaskDatesIntoString } from "@/entities/task/lib/convertTaskDatesIntoString";
import { FilterType } from "../config/types";
import { sortTask } from "@/entities/task/lib/sortTask";

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
    setupTasks: (state, action: PayloadAction<Task[]>) => {
      const allTasks = convertTaskDatesIntoString(action.payload);
      state.tasks["All"] = allTasks;
      state.tasks["Completed"] = allTasks.filter((task) =>
        Boolean(task.completed)
      );
      state.tasks["To do"] = allTasks
        .filter((task) => task.completed === "")
        .sort(sortTask);
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
