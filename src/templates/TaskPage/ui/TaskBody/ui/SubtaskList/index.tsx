// import { useTaskStore } from "@/entities/task/models/taskStore";
// import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
// import { getDateString } from "@/shared/lib/utils/getDateString";
// import PrimaryButton from "@/shared/ui/PrimaryButton";
// import { Subtask } from "@prisma/client";
// import { FC } from "react";
// import { openPopup } from "../../../AddSubtaskPopup/store/addSubtaskSlice";
// import CompletedSubtask from "../CompletedSubtask";
// import NewSubtask from "../NewSubtask";
// import SubtaskInProgress from "../SubtaskInProgress";

// interface SubtaskListPropsType {
//   subtasks: Subtask[];
//   taskStyle: string;
// }

// export const SubtaskList: FC<SubtaskListPropsType> = ({
//   subtasks,
//   taskStyle,
// }) => {
//   const style = projectStyles[taskStyle as ProjectStyleKey];

//   return (
//     <div className="mt-6">
//       <ul className="flex flex-col gap-2">
//         {subtasks.map((subtask) => (
//           <li key={subtask.id}>
//             {subtask.completed ? (
//               <CompletedSubtask
//                 link={`/subtasks/${subtask.id}`}
//                 title={subtask.title}
//                 completed={getDateString(new Date(subtask.completed), false)}
//               />
//             ) : (
//               <SubtaskInProgress
//                 link={`/subtasks/${subtask.id}`}
//                 deadline={getDateString(new Date(subtask.deadline), false)}
//                 title={subtask.title}
//                 style={style}
//               />
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6">
//         <PrimaryButton
//           type="button"
//           text="Add subtask"
//           //   onClick={}
//         />

//         {/* <NewSubtask /> */}
//       </div>
//     </div>
//   );
// };
