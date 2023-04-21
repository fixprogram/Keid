import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Task } from "@prisma/client";
import { FILTERS } from "../config/consts";
import { FilterType } from "../config/types";
import { TaskType } from "@/entities/task/types";
import { convertTaskDatesIntoString } from "@/entities/task/lib/convertTaskDatesIntoString";

type SetupDataType = {
  title: string;
  style: string;
  tasks: Task[];
};

export interface ProjectState {
  title: string;
  style: string;
  tasks: Record<FilterType, TaskType[]>;
  settingsOpened: boolean;
  activeFilter: FilterType;
}

const initialState: ProjectState = {
  title: "",
  style: "",
  tasks: { "To do": [], Completed: [], All: [] },
  settingsOpened: false,
  activeFilter: FILTERS[0],
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setupProjectData: (state, action: PayloadAction<SetupDataType>) => {
      const { title, style, tasks } = action.payload;

      state.title = title;
      state.style = style;

      const allTasks = convertTaskDatesIntoString(tasks);
      state.tasks.All = allTasks;
      state.tasks.Completed = allTasks.filter((task) =>
        Boolean(task.completed)
      );
      state.tasks["To do"] = allTasks.filter((task) => task.completed === "");
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
    },
    setActiveFilter: (state, action: PayloadAction<FilterType>) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.project,
      };
    },
  },
});

export const {
  setupProjectData,
  openSettings,
  closeSettings,
  setActiveFilter,
} = ProjectSlice.actions;

export default ProjectSlice.reducer;
