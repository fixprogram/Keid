import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddProjectState {
  projectName: string;
  projectStyle: string;
  error?: string;
}

const initialState: AddProjectState = {
  projectName: "",
  projectStyle: "01",
  error: "",
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
  },
});

export const { setProjectName, setProjectStyle } = AddProjectSlice.actions;

export default AddProjectSlice.reducer;
