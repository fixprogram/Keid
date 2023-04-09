import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FILTERS } from "../config/filters";
import { TaskType } from "../types/Task";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Task } from "@prisma/client";

type SetupDataType = {
  title: string;
  style: string;
  tasks: Task[];
};

export interface ProjectState {
  title: string;
  style: string;
  tasks: TaskType[];
  settingsOpened: boolean;
  activeFilter: string;
  filteredTasks: TaskType[];
}

const initialState: ProjectState = {
  title: "",
  style: "",
  tasks: [],
  settingsOpened: false,
  activeFilter: FILTERS[0],
  filteredTasks: [],
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setupProjectData: (state, action: PayloadAction<SetupDataType>) => {
      const { title, style, tasks } = action.payload;

      state.title = title;
      state.style = style;
      state.tasks = tasks.map((task) => {
        if (task.completed) {
          return {
            ...task,
            state: "Completed",
            completed: getDateString(
              new Date(JSON.parse(task.completed)),
              false
            ),
          };
        }
        if (task.deadline) {
          return {
            ...task,
            state: "Task",
            deadline: getDateString(new Date(JSON.parse(task.deadline)), false),
          };
        }
        return { ...task, state: "Idea" };
      });
      state.filteredTasks = state.tasks;
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;

      if (action.payload === "Ideas") {
        state.filteredTasks = state.tasks.filter(
          (task) => task.state === "Idea"
        );
      }

      if (action.payload === "Completed") {
        state.filteredTasks = state.tasks.filter(
          (task) => task.state === "Completed"
        );
      }

      if (action.payload === "All tasks") {
        state.filteredTasks = state.tasks;
      }
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
