// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

// export interface ProgressState {
//   initialProgress: number;
//   progress: number;
//   popupOpened: boolean;
//   comment: string;
// }

// const initialState: ProgressState = {
//   initialProgress: 0,
//   progress: 0,
//   popupOpened: false,
//   comment: "",
// };

// const ProgressSlice = createSlice({
//   name: "progress",
//   initialState,
//   reducers: {
//     setupProgress: (state, action: PayloadAction<number>) => {
//       state.initialProgress = action.payload;
//       state.progress = action.payload;
//     },
//     openPopup: (state) => {
//       state.popupOpened = true;
//     },
//     closePopup: (state) => {
//       state.popupOpened = false;
//     },
//     changeProgress: (state, action: PayloadAction<number>) => {
//       state.progress = action.payload;
//     },
//     changeComment: (state, action: PayloadAction<string>) => {
//       state.comment = action.payload;
//     },
//   },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...action.payload.progress,
//       };
//     },
//   },
// });

// export const {
//   setupProgress,
//   openPopup,
//   closePopup,
//   changeProgress,
//   changeComment,
// } = ProgressSlice.actions;

// export default ProgressSlice.reducer;
