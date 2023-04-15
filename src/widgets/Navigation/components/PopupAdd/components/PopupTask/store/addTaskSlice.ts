import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/widgets/Navigation/models";

export interface AddTaskState {
  taskName: string;
  taskStyle: string;
  taskProject: Project;
  isCalendarOpen: boolean;
  isStyleListOpened: boolean;
  deadline: string;
  error?: string;
}

const initialState: AddTaskState = {
  taskName: "",
  taskStyle: "",
  taskProject: { title: "", style: "" },
  isCalendarOpen: false,
  isStyleListOpened: false,
  deadline: JSON.stringify(new Date()),
  error: "",
};

const AddTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    setTaskName: (state, action: PayloadAction<string>) => {
      state.taskName = action.payload;
    },
    setTaskStyle: (state, action: PayloadAction<string>) => {
      state.taskStyle = action.payload;
    },
    setTaskProject: (state, action: PayloadAction<Project>) => {
      state.taskProject = action.payload;
      state.taskStyle = action.payload.style;
    },
    setTaskDeadline: (state, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    resetTask: (state) => {
      state.taskName = initialState.taskName;
      state.deadline = initialState.deadline;
      state.taskStyle = initialState.taskStyle;
      state.taskProject = initialState.taskProject;
    },
    setCalendarOpen: (state) => {
      state.isCalendarOpen = true;
    },
    setCalendarClose: (state) => {
      state.isCalendarOpen = false;
    },
    openStyleList: (state) => {
      state.isStyleListOpened = true;
    },
    closeStyleList: (state) => {
      state.isStyleListOpened = false;
    },
  },
});

export const {
  setTaskName,
  setTaskStyle,
  openStyleList,
  closeStyleList,
  setTaskProject,
  setTaskDeadline,
  resetTask,
  setCalendarOpen,
  setCalendarClose,
} = AddTaskSlice.actions;

export default AddTaskSlice.reducer;
