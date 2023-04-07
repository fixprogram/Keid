import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getDateString } from "@/shared/lib/utils/getDateString";

type SetupDataType = {
  parentTaskName: string;
  parentTaskStyle: string;
  subtaskId: string;
  title: string;
  deadline: string;
};

export interface SubtaskState {
  parentTaskName: string;
  parentTaskStyle: string;
  subtaskId: string;
  title: string;
  deadline: string;
  settingsOpened: boolean;
}

const initialState: SubtaskState = {
  parentTaskName: "",
  parentTaskStyle: "",
  subtaskId: "",
  title: "",
  deadline: "",
  settingsOpened: false,
};

const SubtaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {
    setupSubtaskData: (state, action: PayloadAction<SetupDataType>) => {
      const { parentTaskName, parentTaskStyle, subtaskId, title, deadline } =
        action.payload;

      state.subtaskId = subtaskId;
      state.parentTaskName = parentTaskName;
      state.parentTaskStyle = parentTaskStyle;
      state.title = title;
      state.deadline = getDateString(new Date(JSON.parse(deadline)), false);
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
        ...action.payload.subtask,
      };
    },
  },
});

export const { setupSubtaskData, openSettings, closeSettings } =
  SubtaskSlice.actions;

export default SubtaskSlice.reducer;
