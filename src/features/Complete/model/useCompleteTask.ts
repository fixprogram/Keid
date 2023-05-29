// import { useTasksStore } from "@/entities/task/models/tasksStore";
// import { links } from "@/shared/config/links";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback } from "react";
// import { shallow } from "zustand/shallow";

// export const useCompleteTask = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const queryClient = useQueryClient();

//   const taskId = pathname?.split("/").at(-1);
//   // if we come to this task by a link, the userId will be undefined
//   // const userId = useNavigationStore((state) => state.userId);
//   // const taskId = taskData.taskId;
//   const [tasksData, setActiveFilter] = useTasksStore(
//     (state) => [state.data, state.setActiveFilter],
//     shallow
//   );

//   const mutation = useMutation({
//     mutationKey: ["task", taskId],
//     mutationFn: () => axios.post(links.task.complete, { taskId }),
//     onSuccess: (data) => {
//       const newTasks = tasksData.tasks.map((task) => {
//         if (task.id === taskId) {
//           return data;
//         }

//         return task;
//       });
//       queryClient.setQueryData(["tasks", taskId], {
//         ...tasksData,
//         tasks: newTasks,
//       });

//       setActiveFilter("Completed");

//       router.back();
//       // reset();
//     },
//   });

//   const handleCompleteTask = useCallback(() => {
//     mutation.mutate();
//   }, [mutation]);

//   return handleCompleteTask;
// };
