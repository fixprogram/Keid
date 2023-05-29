// import { links } from "@/shared/config/links";
// import { useTaskStore } from "@/templates/TaskPage/model/taskStore";
// import { useNavigationStore } from "@/widgets/Navigation/model/navigationStore";
// import { Comment } from "@prisma/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback } from "react";
// import { shallow } from "zustand/shallow";

// type MutationDataType = {
//   taskId: string;
//   progress: number;
//   comment: Comment;
// };

// export const useUpdateProgress = () => {
//   const router = useRouter();
//   const pathname = usePathname() as string;
//   const queryClient = useQueryClient();

//   const taskId = pathname.split("/").at(-1) as string;
//   // if we come to this task by a link, the userId will be undefined
//   const userId = useNavigationStore((state) => state.userId);
//   // const taskId = taskData.taskId;
//   const taskData = useTaskStore((state) => state.data);

//   const mutation = useMutation({
//     mutationKey: ["task"],
//     mutationFn: (data: MutationDataType) =>
//       axios.post(links.task.updateProgress, data),
//     onSuccess: (data) => {
//       //   const newTasks = tasksData.tasks.map((task) => {
//       //     if (task.id === taskId) {
//       //       return data;
//       //     }

//       //     return task;
//       //   });

//       console.log("on success: ", data);

//       queryClient.setQueryData(["task"], {
//         ...taskData,
//         ...data,
//       });

//       //   setActiveFilter("Completed");

//       //   router.back();
//       // reset();
//     },
//   });

//   const handleUpdateProgress = useCallback(
//     (progress: number, commentText: string) => {
//       const comment: Comment = {
//         userId,
//         content: commentText,
//         time: Date.now().toString(),
//         serviceContent: null,
//       };

//       mutation.mutate({ taskId, progress, comment });
//     },
//     [mutation, userId, taskId]
//   );

//   return handleUpdateProgress;

//   //   const commentText = useAppSelector((state) => state.progress.comment);
//   //   const progress = useAppSelector((state) => state.progress.progress);
//   //   const initialProgress = useAppSelector(
//   //     (state) => state.progress.initialProgress
//   //   );
//   //   const dispatch = useAppDispatch();

//   //   const taskId = router.query.id;

//   //   const handleUpdateProgress = useCallback(() => {
//   //     if (progress === initialProgress) {
//   //       return dispatch(closePopup());
//   //     }

//   //     if (user) {
//   //       const userId = user.id;

//   //       const comment = {
//   //         userId,
//   //         content: commentText,
//   //         time: Date.now().toString(),
//   //       };

//   //       fetch(links.task.updateProgress, {
//   //         method: "POST",
//   //         headers: {
//   //           Accept: "application/json",
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           taskId,
//   //           progress,
//   //           comment,
//   //         }),
//   //       }).then(async (res) => {
//   //         console.log("Res: ", res);

//   //         if (res.status === 200) {
//   //           dispatch(closePopup());
//   //         }
//   //       });
//   //     }
// };
