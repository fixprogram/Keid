// import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import Calendar from "@/shared/ui/Calendar";
// import PrimaryButton from "@/shared/ui/PrimaryButton";
// // import { closeCalendar } from "@/templates/TaskPage/store/taskSlice";
// import { FC, useState } from "react";

// export const TaskCalendar: FC = () => {
//   // const dispatch = useAppDispatch();

//   // const deadline = useAppSelector((state) => state.task.deadline);
//   // const isCalendarOpened = useAppSelector(
//   //   (state) => state.task.isCalendarOpened
//   // );
// //   const [newDeadline, setNewDeadline] = useState(deadline);

//   // const handleUpdateTaskDeadline = useUpdateTaskDeadline();
//   // const handlePopupClose = () => dispatch(closeCalendar());

// //   const handleSaveNewDeadline = () => {
// //     if (deadline !== newDeadline) {
// //       return handleUpdateTaskDeadline(newDeadline);
// //     }
// //     return handlePopupClose();
// //   };

//   return (
//     <PopupWithOverlay
//     //   isShowed={isCalendarOpened}
//     //   onClose={handlePopupClose}
//     btn={}
//       positioned="Bottom"
//     >
//       <Calendar
//         date={new Date(newDeadline)}
//         setDate={(date) => setNewDeadline(date)}
//       />

//       <div className="mt-5">
//         <b className="text-lg text-white font-bold">With deadline</b>
//         <div>
//           <input
//             type="checkbox"
//             id="no_task_deadline"
//             className="hidden peer"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 setNewDeadline(Date.now());
//               }
//               if (!e.target.checked) {
//                 setNewDeadline(0);
//               }
//             }}
//             checked={Boolean(newDeadline)}
//           />
//           <label
//             htmlFor="no_task_deadline"
//             className="block w-12 h-6 bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
//           />
//         </div>
//       </div>

//       <div className="flex justify-between items-end mt-5">
//         <button
//           type="button"
//           onClick={handlePopupClose}
//           className="text-red font-bold py-3 px-8"
//         >
//           Cancel
//         </button>
//         <div className="w-[100px]">
//           <PrimaryButton text="Save" onClick={handleSaveNewDeadline} />
//         </div>
//       </div>
//     </PopupWithOverlay>

//   );
// };
