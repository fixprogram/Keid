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
  totalTaskAmount: number;
  overdueTaskAmount: number;
}

const initialState: OverviewState = {
  filters: ["Overview", "Productivity"],
  activeFilter: "Overview",
  settings: [],
  settingsOpened: false,
  userId: "",
  projectAmount: 0,
  totalTaskAmount: 0,
  overdueTaskAmount: 0,
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
    setUserTaskAmount: (state, action: PayloadAction<number>) => {
      state.totalTaskAmount = action.payload;
    },
    setUserOverdueTaskAmount: (state, action: PayloadAction<number>) => {
      state.overdueTaskAmount = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
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
  setUserTaskAmount,
  setUserOverdueTaskAmount,
} = OverviewSlice.actions;

export default OverviewSlice.reducer;
