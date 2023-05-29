// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import Calendar from "@/shared/ui/Calendar";
// import PrimaryButton from "@/shared/ui/PrimaryButton";
// import useInitialDeadline from "@/widgets/Navigation/hooks/useInitialDeadline";
// import {
//   closePopupCalendar,
//   setSubtaskDeadline,
// } from "../../store/addSubtaskSlice";

// export default function AddSubtaskPopupCalendar() {
//   // const dispatch = useAppDispatch();
//   // const deadline = useAppSelector((state) => state.addSubtask.deadline);
//   // const isCalendarOpen = useAppSelector(
//   //   (state) => state.addSubtask.isCalendarOpen
//   // );
//   // const initialDeadline = useInitialDeadline(deadline, isCalendarOpen);

//   // const date = new Date(deadline);

//   // function setDeadline(deadline: number) {
//   //   dispatch(setSubtaskDeadline(deadline));
//   // }

//   // function cancelCalendar() {
//   //   setDeadline(initialDeadline);
//   //   dispatch(closePopupCalendar());
//   // }

//   // function saveDeadline() {
//   //   dispatch(closePopupCalendar());
//   // }

//   return (
//     <section className="px-5 pb-6">
//       {/* <Calendar date={date} setDate={setDeadline} />;
//       <div className="flex justify-between items-end mt-[20px]">
//         <button
//           type="button"
//           onClick={cancelCalendar}
//           className="text-red font-bold py-3 px-8"
//         >
//           Cancel
//         </button>
//         <div className="w-[100px]">
//           <PrimaryButton text="Done" onClick={saveDeadline} />
//         </div> */}
//       {/* </div> */}
//     </section>
//   );
// }
