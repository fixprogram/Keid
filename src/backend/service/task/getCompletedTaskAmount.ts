import { prisma } from "@/db.server";

export const getCompletedTaskAmount = async (ids: string[]) => {
  const completedTasks = await prisma.task.findMany({
    where: { id: { in: ids }, completed: { gt: 0 } },
    select: { id: true, subtaskIds: true },
  });

  const completedSubtasks = await Promise.all(
    completedTasks.map(async (task) => {
      if (task.subtaskIds.length > 0) {
        const completedSubtasksOfTask = await prisma.subtask.findMany({
          where: { id: { in: task.subtaskIds }, completed: { gt: 0 } },
          select: { id: true },
        });
        return completedSubtasksOfTask;
      } else {
        return [];
      }
    })
  );

  const totalCompletedSubtasks = completedSubtasks.flat().length;

  return completedTasks.length + totalCompletedSubtasks;
};
