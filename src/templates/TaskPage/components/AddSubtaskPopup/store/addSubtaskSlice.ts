import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addSubtaskState {
  title: string;
  deadline: string;
  isAddSubtaskPopupOpened: boolean;
  isCalendarOpen: boolean;
}

const initialState: addSubtaskState = {
  title: "",
  deadline: JSON.stringify(new Date()),
  isAddSubtaskPopupOpened: false,
  isCalendarOpen: false,
};

const AddSubtaskClice = createSlice({
  name: "addSubtask",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    openPopup: (state) => {
      state.isAddSubtaskPopupOpened = true;
    },
    closePopup: (state) => {
      state.isAddSubtaskPopupOpened = false;
    },
    openPopupCalendar: (state) => {
      state.isCalendarOpen = true;
    },
    closePopupCalendar: (state) => {
      state.isCalendarOpen = false;
    },
    setSubtaskDeadline: (state, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
  },
});

export const {
  setTitle,
  openPopup,
  closePopup,
  openPopupCalendar,
  closePopupCalendar,
  setSubtaskDeadline,
} = AddSubtaskClice.actions;

export default AddSubtaskClice.reducer;
