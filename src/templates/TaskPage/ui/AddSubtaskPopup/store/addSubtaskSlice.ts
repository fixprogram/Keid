// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface addSubtaskState {
//   title: string;
//   deadline: number;
//   isAddSubtaskPopupOpened: boolean;
//   isCalendarOpen: boolean;
//   isWithDeadline: boolean;
// }

// const initialState: addSubtaskState = {
//   title: "",
//   deadline: Date.now(),
//   isAddSubtaskPopupOpened: false,
//   isCalendarOpen: false,
//   isWithDeadline: true,
// };

// const AddSubtaskClice = createSlice({
//   name: "addSubtask",
//   initialState,
//   reducers: {
//     setTitle: (state, action: PayloadAction<string>) => {
//       state.title = action.payload;
//     },
//     openPopup: (state) => {
//       state.isAddSubtaskPopupOpened = true;
//     },
//     closePopup: (state) => {
//       state.isAddSubtaskPopupOpened = false;
//     },
//     openPopupCalendar: (state) => {
//       state.isCalendarOpen = true;
//     },
//     closePopupCalendar: (state) => {
//       state.isCalendarOpen = false;
//     },
//     setSubtaskDeadline: (state, action: PayloadAction<number>) => {
//       state.deadline = action.payload;
//     },
//     toggleSubtaskWithDeadline: (state) => {
//       state.isWithDeadline = !state.isWithDeadline;

//       if (state.isWithDeadline === false) {
//         state.deadline = 0;
//       }

//       if (state.isWithDeadline === true) {
//         state.deadline = Date.now();
//       }
//     },
//   },
// });

// export const {
//   setTitle,
//   openPopup,
//   closePopup,
//   openPopupCalendar,
//   closePopupCalendar,
//   setSubtaskDeadline,
//   toggleSubtaskWithDeadline,
// } = AddSubtaskClice.actions;

// export default AddSubtaskClice.reducer;
