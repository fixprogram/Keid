import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Subtask } from "@prisma/client";
import { CommentType } from "@/features/Comments/models/types";
// import { CommentType } from "@/application/types/comment";

type SetupDataType = {
  taskId: string;
  title: string;
  style: string;
  deadline: number;
  // progress: number,
  projectTitle: string;
  projectStyle: string;
  subtasks: Subtask[];
  comments: CommentType[];
};

export interface TaskState {
  taskId: string;
  title: string;
  style: string;
  deadline: number;
  // progress: number,
  commentContent: string;
  settingsOpened: boolean;
  addCommentOpened: boolean;
  projectTitle: string;
  projectStyle: string;
  subtasks: Subtask[];
  comments: CommentType[];
  // comments: CommentType[];
}

const initialState: TaskState = {
  taskId: "",
  title: "",
  style: "",
  deadline: 0,
  // progress: 0,
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
        // progress,
      } = action.payload;

      state.title = title;
      state.style = style;
      state.deadline = deadline;
      state.projectTitle = projectTitle;
      state.projectStyle = projectStyle;
      state.taskId = taskId;
      state.subtasks = subtasks;
      state.comments = comments;
      // state.progress = progress
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
