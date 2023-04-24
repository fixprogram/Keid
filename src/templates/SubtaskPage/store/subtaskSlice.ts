import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Comment } from "@prisma/client";
import { CommentType } from "@/features/Comments/models/types";

type SetupDataType = {
  parentTaskName: string;
  parentTaskStyle: string;
  subtaskId: string;
  title: string;
  deadline: number;
  comments: CommentType[];
};

export interface SubtaskState {
  parentTaskName: string;
  parentTaskStyle: string;
  subtaskId: string;
  title: string;
  deadline: number;
  settingsOpened: boolean;
  comments: CommentType[];
  isCalendarOpened: boolean;
}

const initialState: SubtaskState = {
  parentTaskName: "",
  parentTaskStyle: "",
  subtaskId: "",
  title: "",
  deadline: 0,
  settingsOpened: false,
  comments: [],
  isCalendarOpened: false,
};

const SubtaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {
    setupSubtaskData: (state, action: PayloadAction<SetupDataType>) => {
      const {
        parentTaskName,
        parentTaskStyle,
        subtaskId,
        title,
        deadline,
        comments,
      } = action.payload;

      state.subtaskId = subtaskId;
      state.parentTaskName = parentTaskName;
      state.parentTaskStyle = parentTaskStyle;
      state.title = title;
      state.deadline = deadline;
      state.comments = comments;
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
    },
    openCalendar: (state) => {
      state.isCalendarOpened = true;
    },
    closeCalendar: (state) => {
      state.isCalendarOpened = false;
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

export const {
  setupSubtaskData,
  openSettings,
  closeSettings,
  openCalendar,
  closeCalendar,
} = SubtaskSlice.actions;

export default SubtaskSlice.reducer;
