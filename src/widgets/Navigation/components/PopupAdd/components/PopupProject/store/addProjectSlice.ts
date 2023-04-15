import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddProjectState {
  projectName: string;
  projectStyle: string;
  error?: string;
  isStyleListOpened: boolean;
}

const initialState: AddProjectState = {
  projectName: "",
  projectStyle: "01",
  error: "",
  isStyleListOpened: false,
};

const AddProjectSlice = createSlice({
  name: "addProject",
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    setProjectStyle: (state, action: PayloadAction<string>) => {
      state.projectStyle = action.payload;
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
  setProjectName,
  setProjectStyle,
  openStyleList,
  closeStyleList,
} = AddProjectSlice.actions;

export default AddProjectSlice.reducer;
