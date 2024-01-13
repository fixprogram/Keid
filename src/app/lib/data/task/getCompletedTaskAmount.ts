import { prisma } from "@/db.server";

export const getCompletedTaskAmount = async (projectId: string) => {
  const completedTasks = await prisma.task.findMany({
    where: { projectId, completed: { gt: 0 } },
    select: { id: true },
  });

  // const completedSubtasks = await Promise.all(
  //   completedTasks.map(async (task) => {
  //     if (task.subtaskIds.length > 0) {
  //       const completedSubtasksOfTask = await prisma.subtask.findMany({
  //         where: { id: { in: task.subtaskIds }, completed: { gt: 0 } },
  //         select: { id: true },
  //       });
  //       return completedSubtasksOfTask;
  //     } else {
  //       return [];
  //     }
  //   })
  // );

  // const totalCompletedSubtasks = completedSubtasks.flat().length;

  return completedTasks.length;
  // return completedTasks.length + totalCompletedSubtasks;
};
