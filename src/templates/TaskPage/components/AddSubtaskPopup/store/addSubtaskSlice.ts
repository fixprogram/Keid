import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addSubtaskState {
  title: string;
  deadline: string;
  addSubtaskPopupOpened: boolean;
  isCalendarOpen: boolean;
}

const initialState: addSubtaskState = {
  title: "",
  deadline: "",
  addSubtaskPopupOpened: false,
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
      state.addSubtaskPopupOpened = true;
    },
    closePopup: (state) => {
      state.addSubtaskPopupOpened = false;
    },
    openPopupCalendar: (state) => {
      state.isCalendarOpen = true;
    },
    closePopupCalendar: (state) => {
      state.isCalendarOpen = false;
    },
  },
});

export const {
  setTitle,
  openPopup,
  closePopup,
  openPopupCalendar,
  closePopupCalendar,
} = AddSubtaskClice.actions;

export default AddSubtaskClice.reducer;
