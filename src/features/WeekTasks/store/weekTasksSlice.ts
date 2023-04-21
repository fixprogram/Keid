import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Task } from "@prisma/client";
import { sortTask } from "../lib";
import { convertTaskDatesIntoString } from "@/entities/task/lib/convertTaskDatesIntoString";
import { TaskType } from "@/entities/task/types";

export interface WeekTasksState {
  isOpened: boolean;
  tasks: TaskType[];
  taskAmount: number;
  completedTaskAmount: number;
  progress: number;
}

const initialState: WeekTasksState = {
  isOpened: false,
  tasks: [],
  taskAmount: 0,
  completedTaskAmount: 0,
  progress: 0,
};

const WeekTasksSlice = createSlice({
  name: "weekTasks",
  initialState,
  reducers: {
    setupWeekTasks: (state, action: PayloadAction<Task[]>) => {
      const uncompletedTasks = convertTaskDatesIntoString(
        action.payload.filter((task) => task.completed === 0)
      ).sort(sortTask);

      const completedTasks = convertTaskDatesIntoString(
        action.payload.filter((payload) => payload.completed)
      );

      state.tasks = [...uncompletedTasks, ...completedTasks];

      const taskAmount = state.tasks.length;
      state.taskAmount = taskAmount;
      const completedTaskAmount = state.tasks.filter(
        (task) => task.completed
      ).length;
      state.completedTaskAmount = completedTaskAmount;
      state.progress = Math.floor((completedTaskAmount / taskAmount) * 100);
    },
    toggleWeekTasks: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.weekTasks,
      };
    },
  },
});

export const { setupWeekTasks, toggleWeekTasks } = WeekTasksSlice.actions;

export default WeekTasksSlice.reducer;
