import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Task } from "@prisma/client";
import { sortTasks, TaskType } from "@/shared/lib/utils/sortTasks";

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
    setupWeekTasks: (state, action: PayloadAction<TaskType[]>) => {
      const tasks = action.payload;

      state.tasks = sortTasks(tasks);

      const taskAmount = state.tasks.length;
      state.taskAmount = taskAmount;
      const completedTaskAmount = state.tasks.filter(
        (task) => task.completed
      ).length;
      state.completedTaskAmount = completedTaskAmount;
      state.progress = taskAmount
        ? Math.floor((completedTaskAmount / taskAmount) * 100)
        : 0;
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
