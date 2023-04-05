import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getDateString } from "@/shared/lib/utils/getDateString";

type SetupDataType = {
  title: string;
  style: string;
  deadline: string;
  projectTitle: string;
  projectStyle: string;
};

export interface TaskState {
  title: string;
  style: string;
  deadline: string;
  settingsOpened: boolean;
  projectTitle: string;
  projectStyle: string;
}

const initialState: TaskState = {
  title: "",
  style: "",
  deadline: "",
  settingsOpened: false,
  projectTitle: "",
  projectStyle: "",
};

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setupTaskData: (state, action: PayloadAction<SetupDataType>) => {
      const { title, style, deadline, projectTitle, projectStyle } =
        action.payload;

      state.title = title;
      state.style = style;
      state.deadline = getDateString(new Date(JSON.parse(deadline)), false);
      state.projectTitle = projectTitle;
      state.projectStyle = projectStyle;
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
        ...action.payload.task,
      };
    },
  },
});

export const { setupTaskData, openSettings, closeSettings } = TaskSlice.actions;

export default TaskSlice.reducer;
