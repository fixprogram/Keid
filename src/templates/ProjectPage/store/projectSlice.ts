import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@prisma/client";
import { HYDRATE } from "next-redux-wrapper";

type SetupDataType = {
  title: string;
  style: string;
  tasks: Task[];
};

export interface ProjectState {
  title: string;
  style: string;
  tasks: Task[];
  settingsOpened: boolean;
}

const initialState: ProjectState = {
  title: "",
  style: "",
  tasks: [],
  settingsOpened: false,
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setupProjectData: (state, action: PayloadAction<SetupDataType>) => {
      const { title, style, tasks } = action.payload;

      state.title = title;
      state.style = style;
      state.tasks = tasks;
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
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

export const { setupProjectData, openSettings, closeSettings } =
  ProjectSlice.actions;

export default ProjectSlice.reducer;
