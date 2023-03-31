import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@prisma/client";
import { HYDRATE } from "next-redux-wrapper";

// export type Task = {

// }

export interface ProjectState {
  title: string;
  style: string;
  tasks: Task[];
}

const initialState: ProjectState = {
  title: "",
  style: "",
  tasks: [],
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setupProjectData: (state, action: PayloadAction<ProjectState>) => {
      const { title, style, tasks } = action.payload;

      state.title = title;
      state.style = style;
      state.tasks = tasks;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...action.payload.project,
      };
    },
  },
});

export const { setupProjectData } = ProjectSlice.actions;

export default ProjectSlice.reducer;
