// import { TaskType } from "@/shared/config/types";
// import { useDashboardStore } from "@/templates/DashboardPage/model/useDashboardStore";
// import { FC } from "react";
// import { shallow } from "zustand/shallow";
// import { EmptyWeekTasks } from "./ui/EmptyWeekTasks";
// import { TaskList } from "./ui/TaskList";

// interface WeekTasksPropsType {
//   tasks: TaskType[];
// }

// export const WeekTasks: FC<WeekTasksPropsType> = ({ tasks }) => {
//   const [isWeekTasksShowed, toggleWeekTasksShowed] = useDashboardStore(
//     (state) => [state.isWeekTasksShowed, state.toggleWeekTasksShowed],
//     shallow
//   );
//   const taskAmount = tasks.length;

//   if (taskAmount === 0) {
//     return <EmptyWeekTasks />;
//   }

//   const completedTaskAmount = tasks.filter((task) => task.completed).length;
//   const progress = Math.floor((completedTaskAmount / taskAmount) * 100);

//   const handleToggle = () => toggleWeekTasksShowed();

//   return (
//     <section
//       className="mt-8 p-1 rounded-[20px] relative"
//       style={{
//         background:
//           "radial-gradient(102.94% 100% at 72.83% 100%, #FFB8E0 0%, #BE9EFF 38.89%, #88C0FC 67.4%, #86FF99 100%)",
//       }}
//     >
//       <section
//         className={`${
//           isWeekTasksShowed ? "bg-background1" : ""
//         } p-5 rounded-[18px]`}
//       >
//         <div className={`${isWeekTasksShowed ? "text-white" : "text-active"}`}>
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="font-poppins font-semibold text-xl">Week Tasks</h3>
//               <p className="font-medium text-base">
//                 {completedTaskAmount}/{taskAmount} is completed
//               </p>
//             </div>

//             <button onClick={handleToggle}>
//               {isWeekTasksShowed ? "Close" : "Open"}
//             </button>
//           </div>

//           {isWeekTasksShowed ? <TaskList tasks={tasks} /> : null}

//           {isWeekTasksShowed ? null : (
//             <div className="flex gap-[25px] items-center mt-[17px]">
//               <div className="h-[12px] w-[200px] bg-white rounded-[5px]">
//                 <div
//                   className="h-full"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, #353843 0%, #181A20 100%)",
//                     borderRadius: "5px 2px 2px 5px",
//                     width: `${progress}%`,
//                   }}
//                 ></div>
//               </div>
//               <span className="text-active text-base font-bold">
//                 {progress}%
//               </span>
//             </div>
//           )}
//         </div>
//       </section>
//     </section>
//   );
// };
