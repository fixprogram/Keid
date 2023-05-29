// import { useTasksStore } from "@/entities/task/models/tasksStore";
// import { links } from "@/shared/config/links";
// import { useNavigationStore } from "@/widgets/Navigation/model/navigationStore";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback } from "react";

// export const useDeleteTask = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const queryClient = useQueryClient();

//   const taskId = pathname?.split("/").at(-1);
//   const data = useTasksStore((state) => state.data);
//   // if we come to this task by a link, the userId will be undefined
//   // const userId = useNavigationStore((state) => state.userId);
//   // const taskId = taskData.taskId;

//   const mutation = useMutation({
//     mutationKey: ["task"],
//     mutationFn: () => axios.post(links.task.delete, { taskId }),
//     onSuccess: () => {
//       const newTasks = data.tasks.filter((task) => taskId !== task.id);

//       queryClient.setQueryData(["tasks"], {
//         ...data,
//         tasks: newTasks,
//       });

//       router.back();
//     },
//   });

//   const handleDeleteTask = useCallback(() => {
//     mutation.mutate();
//   }, [mutation]);

//   return handleDeleteTask;
// };
