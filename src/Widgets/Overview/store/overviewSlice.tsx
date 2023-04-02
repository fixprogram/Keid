import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface OverviewState {
  filters: string[];
  activeFilter: string;
  settings: string[];
  settingsOpened: boolean;
  userId: string;
  projectAmount: number;
}

const initialState: OverviewState = {
  filters: ["Overview", "Productivity"],
  activeFilter: "Overview",
  settings: [],
  settingsOpened: false,
  userId: "",
  projectAmount: 0,
};

const OverviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    openSettings: (state) => {
      state.settingsOpened = true;
    },
    closeSettings: (state) => {
      state.settingsOpened = false;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserProjectAmount: (state, action: PayloadAction<number>) => {
      state.projectAmount = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("payload: ", action.payload);
      return {
        ...state,
        ...action.payload.overview,
      };
    },
  },
});

export const {
  setActiveFilter,
  setUserProjectAmount,
  setUserId,
  openSettings,
  closeSettings,
} = OverviewSlice.actions;

export default OverviewSlice.reducer;
