// import { Comments } from "@/features/Comments";
// import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
// import { FC } from "react";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import { useAddComment } from "../../hooks/useAddComment";
// import { useDeleteComment } from "../../hooks/useDeleteComment";
// import { SubtaskDeadline } from "./ui/SubtaskDeadline";
// import { SubtaskTitle } from "./ui/SubtaskTitle";

// interface SubtaskBodyPropType {
//   title: string;
//   parentStyle: string;
//   parentTitle: string;
// }

// export const SubtaskBody: FC<SubtaskBodyPropType> = ({
//   title,
//   parentStyle,
//   parentTitle,
// }) => {
//   // const title = useAppSelector((state) => state.subtask.title);
//   // const parentTaskName = useAppSelector(
//   //   (state) => state.subtask.parentTaskName
//   // );
//   // const style = useAppSelector((state) => state.subtask.parentTaskStyle);
//   // const comments = useAppSelector((state) => state.subtask.comments);

//   // const handleAddComment = useAddComment();
//   // const handleDeleteComment = useDeleteComment();

//   const parentTaskStyle = projectStyles[parentStyle as ProjectStyleKey];

//   // if (!parentTaskStyle) {
//   //   return null;
//   // }

//   return (
//     <section className="flex flex-col grow">
//       <b
//         className="mt-8 font-semibold font-lg block"
//         style={{ color: parentTaskStyle.background }}
//       >
//         {parentTitle}
//       </b>

//       <h2 className="text-xxl text-poppins text-white mt-2 font-semibold">
//         {title}
//       </h2>

//       {/* <SubtaskTitle initialTitle={title} /> */}

//       <SubtaskDeadline />

//       <div className="mt-6">
//         <p className="text-white text-sm font-medium">Description</p>
//         <p className="text-deactive text-sm">
//           4,648 curated design resources to energize your creative workflow
//         </p>
//       </div>

//       {/* <div className="mt-auto">
//         <Comments
//           comments={comments}
//           onSubmit={(comment) => handleAddComment(comment)}
//           onDelete={handleDeleteComment}
//         />
//       </div> */}
//     </section>
//   );
// };
