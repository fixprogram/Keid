// import { AutoSizedTextarea } from "@/shared/ui/AutoSizedTextarea";
// import { useUpdateSubtaskTitle } from "@/templates/SubtaskPage/hooks/useUpdateSubtaskTitle";
// import { FC } from "react";

// interface SubtaskTitlePropsType {
//   initialTitle: string;
// }

// export const SubtaskTitle: FC<SubtaskTitlePropsType> = ({ initialTitle }) => {
//   const handleUpdateSubtaskTitle = useUpdateSubtaskTitle();
//   const handleTextareaBlur = (title: string) => {
//     if (title.trim() !== initialTitle) {
//       handleUpdateSubtaskTitle(title.trim());
//     }
//   };

//   return (
//     <div className="mt-2">
//       <AutoSizedTextarea
//         initialTitle={initialTitle}
//         onBlur={handleTextareaBlur}
//       />
//     </div>
//   );
// };
