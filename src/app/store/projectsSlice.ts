import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Project } from "@prisma/client";

const FILTERS = ["Active", "Dreams", "All"];

export type ProjectType = {
  id: string;
  title: string;
  style: string;
  taskAmount: number;
  completedTaskAmount: number;
};

export interface ProjectsState {
  filters: string[];
  activeFilter: string;
  listStyle: "column" | "grid";
  projects: ProjectType[];
}

const initialState: ProjectsState = {
  filters: FILTERS,
  activeFilter: FILTERS[0],
  listStyle: "column",
  projects: [],
};

const ProjectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    toggleListStyle: (state) => {
      state.listStyle = state.listStyle === "column" ? "grid" : "column";
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setupProjects: (state, action: PayloadAction<Project[]>) => {
      const projects = action.payload.map((project) => ({
        id: project.id,
        title: project.title,
        style: project.style,
        taskAmount: project.taskIds.length,
        completedTaskAmount: 0,
      }));

      state.projects = projects;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...action.payload.projects,
      };
    },
  },
});

export const { toggleListStyle, setActiveFilter, setupProjects } =
  ProjectsSlice.actions;

export default ProjectsSlice.reducer;
