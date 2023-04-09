import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddTaskState {
  taskName: string;
  taskStyle: string;
  taskProject: string;
  isCalendarOpen: boolean;
  deadline: string;
  error?: string;
}

const initialState: AddTaskState = {
  taskName: "",
  taskStyle: "01",
  taskProject: "",
  isCalendarOpen: false,
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
    setTaskProject: (state, action: PayloadAction<string>) => {
      state.taskProject = action.payload;
    },
    setTaskDeadline: (state, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    setCalendarOpen: (state) => {
      state.isCalendarOpen = true;
    },
    setCalendarClose: (state) => {
      state.isCalendarOpen = false;
    },
  },
});

export const {
  setTaskName,
  setTaskStyle,
  setTaskProject,
  setTaskDeadline,
  setCalendarOpen,
  setCalendarClose,
} = AddTaskSlice.actions;

export default AddTaskSlice.reducer;
