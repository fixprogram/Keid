import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Task } from "@prisma/client";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { sortTask } from "../lib";

export interface WeekTasksState {
  isOpened: boolean;
  tasks: Task[];
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
      const tasks = action.payload
        .filter((payload) => {
          if (payload.completed === 0) {
            return {
              ...payload,
              deadline: getDateString(new Date(payload.deadline), false),
              completed:
                payload.completed === 0
                  ? ""
                  : getDateString(new Date(payload.completed), false),
            };
          }
        })
        .sort(sortTask);

      const completedTasks = action.payload.filter(
        (payload) => payload.completed
      );

      state.tasks = [...tasks, ...completedTasks];

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
