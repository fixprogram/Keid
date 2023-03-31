import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavigationState {
  popupAddState: "idle" | "task" | "project";
  popupAddOpened: boolean;
}

const initialState: NavigationState = {
  popupAddState: "idle",
  popupAddOpened: false,
};

const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openPopupAdd: (state) => {
      state.popupAddOpened = true;
    },
    closePopupAdd: (state) => {
      state.popupAddOpened = false;
      state.popupAddState = "idle";
    },
    setPopupAddState: (state, action: PayloadAction<"task" | "project">) => {
      state.popupAddState = action.payload;
    },
  },
});

export const { openPopupAdd, closePopupAdd, setPopupAddState } =
  NavigationSlice.actions;

export default NavigationSlice.reducer;
