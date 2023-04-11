import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Subtask } from "@prisma/client";
import { CommentType } from "@/application/types/comment";

type SetupDataType = {
  taskId: string;
  title: string;
  style: string;
  deadline: string;
  projectTitle: string;
  projectStyle: string;
  subtasks: Subtask[];
  comments: CommentType[];
};

export interface TaskState {
  taskId: string;
  title: string;
  style: string;
  deadline: string;
  commentContent: string;
  settingsOpened: boolean;
  addCommentOpened: boolean;
  projectTitle: string;
  projectStyle: string;
  subtasks: Subtask[];
  comments: CommentType[];
}

const initialState: TaskState = {
  taskId: "",
  title: "",
  style: "",
  deadline: "",
  commentContent: "",
  settingsOpened: false,
  addCommentOpened: false,
  projectTitle: "",
  projectStyle: "",
  subtasks: [],
  comments: [],
};

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setupTaskData: (state, action: PayloadAction<SetupDataType>) => {
      const {
        title,
        style,
        deadline,
        projectTitle,
        projectStyle,
        taskId,
        subtasks,
        comments,
      } = action.payload;

      state.title = title;
      state.style = style;
      state.deadline = getDateString(new Date(JSON.parse(deadline)), false);
      state.projectTitle = projectTitle;
      state.projectStyle = projectStyle;
      state.taskId = taskId;
      state.subtasks = subtasks;
      state.comments = comments;
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
    },
    openAddComment: (state) => {
      state.addCommentOpened = true;
    },
    closeAddComment: (state) => {
      state.addCommentOpened = false;
    },
    setCommentContent: (state, action: PayloadAction<string>) => {
      state.commentContent = action.payload;
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

export const {
  setupTaskData,
  openSettings,
  closeSettings,
  openAddComment,
  closeAddComment,
  setCommentContent,
} = TaskSlice.actions;

export default TaskSlice.reducer;
