// import DueDate from "@/features/DueDate";
// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import { getDateString } from "@/shared/lib/utils/getDateString";
// import {
//   openPopupCalendar,
//   toggleSubtaskWithDeadline,
// } from "../../store/addSubtaskSlice";

// export default function SubtaskDeadline() {
//   // const dispatch = useAppDispatch();
//   // const deadline = useAppSelector((state) => state.addSubtask.deadline);
//   // const isWithDeadline = useAppSelector(
//   //   (state) => state.addSubtask.isWithDeadline
//   // );

//   // const date = getDateString(new Date(deadline), false);

//   // function openCalendar() {
//   //   dispatch(openPopupCalendar());
//   // }

//   return (
//     <div className="flex justify-between mt-6">
//       <div>
//         <b className="text-lg text-white font-bold">With deadline</b>
//         <div>
//           {/* <input
//             type="checkbox"
//             id="no_deadline"
//             className="hidden peer"
//             onChange={() => {
//               dispatch(toggleSubtaskWithDeadline());
//             }}
//             checked={isWithDeadline}
//           /> */}
//           <label
//             htmlFor="no_deadline"
//             className="block w-[48px] h-[24px] bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
//           />
//         </div>
//       </div>
//       {/* {isWithDeadline ? <DueDate date={date} onClick={openCalendar} /> : null} */}
//       {/* {isWithDeadline ? <TaskDeadline /> : null} */}
//     </div>
//   );

//   // return (
//   //   <div className="mt-4">
//   //     <DueDate date={date} onClick={openCalendar} />
//   //   </div>
//   // );
// }
