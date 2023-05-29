// import { links } from "@/shared/config/links";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback } from "react";

// export const useDeleteSubtask = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const queryClient = useQueryClient();

//   const subtaskId = pathname?.split("/").at(-1);
//   //   const data = useTasksStore((state) => state.data);
//   // if we come to this task by a link, the userId will be undefined
//   // const userId = useNavigationStore((state) => state.userId);
//   // const taskId = taskData.taskId;

//   const mutation = useMutation({
//     mutationKey: ["subtask"],
//     mutationFn: () => axios.post(links.subtask.delete, { subtaskId }),
//     onSuccess: () => {
//       //   const newTasks = data.tasks.filter((task) => taskId !== task.id);

//       //   queryClient.setQueryData(["tasks"], {
//       //     ...data,
//       //     tasks: newTasks,
//       //   });

//       queryClient.invalidateQueries(["subtasks"]);

//       router.back();
//     },
//   });

//   const handleDeleteSubtask = useCallback(() => {
//     mutation.mutate();
//   }, [mutation]);

//   return handleDeleteSubtask;
// };
