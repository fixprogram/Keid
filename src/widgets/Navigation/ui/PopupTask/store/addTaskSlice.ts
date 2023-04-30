import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RepeatsOptionType } from "../ui/PopupBody/ui/TaskRepeats";
import { Project } from "@/widgets/Navigation/model/types";

export interface AddTaskState {
  taskName: string;
  taskStyle: string;
  taskProject: Project;
  isCalendarOpen: boolean;
  isStyleListOpened: boolean;
  isWithDeadline: boolean;
  deadline: number;
  error?: string;
  activeRepeatsOption: RepeatsOptionType;
}

const initialState: AddTaskState = {
  taskName: "",
  taskStyle: "",
  taskProject: { title: "", style: "" },
  isCalendarOpen: false,
  isStyleListOpened: false,
  isWithDeadline: true,
  deadline: new Date().setHours(23, 59, 59, 999),
  error: "",
  activeRepeatsOption: "Once",
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
    setTaskDeadline: (state, action: PayloadAction<number>) => {
      state.deadline = action.payload;
    },
    setTaskRepeats: (state, action: PayloadAction<RepeatsOptionType>) => {
      state.activeRepeatsOption = action.payload;
    },
    toggleTaskWithDeadline: (state) => {
      state.isWithDeadline = !state.isWithDeadline;

      if (state.isWithDeadline === false) {
        state.deadline = 0;
      }

      if (state.isWithDeadline === true) {
        state.deadline = new Date().setHours(23, 59, 59, 999);
      }
    },
    resetTask: (state) => {
      state.taskName = initialState.taskName;
      state.deadline = initialState.deadline;
      state.taskStyle = initialState.taskStyle;
      state.taskProject = initialState.taskProject;
      state.activeRepeatsOption = initialState.activeRepeatsOption;
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
  setTaskRepeats,
  resetTask,
  setCalendarOpen,
  setCalendarClose,
  toggleTaskWithDeadline,
} = AddTaskSlice.actions;

export default AddTaskSlice.reducer;
