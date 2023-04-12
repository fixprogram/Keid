import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface NavigationState {
  popupAddState: "idle" | "task" | "project";
  popupAddOpened: boolean;
  projects: string[];
}

const initialState: NavigationState = {
  popupAddState: "idle",
  popupAddOpened: false,
  projects: [],
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
    setUserProjectNames: (state, action: PayloadAction<string[]>) => {
      state.projects = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.navigation,
      };
    },
  },
});

export const {
  openPopupAdd,
  closePopupAdd,
  setPopupAddState,
  setUserProjectNames,
} = NavigationSlice.actions;

export default NavigationSlice.reducer;