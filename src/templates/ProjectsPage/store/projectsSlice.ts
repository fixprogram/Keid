import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const FILTERS = ["Active", "Dreams", "Completed"];

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
  projects: Omit<ProjectType, "taskIds">[];
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
    setupProjects: (state, action: PayloadAction<ProjectType[]>) => {
      const projects = action.payload;

      state.projects = projects;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.projects,
      };
    },
  },
});

export const { toggleListStyle, setActiveFilter, setupProjects } =
  ProjectsSlice.actions;

export default ProjectsSlice.reducer;
