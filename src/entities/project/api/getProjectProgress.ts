import { prisma } from "@/db.server";

export async function getProjectProgress(taskIds: string[]) {
  const taskProgresses = await prisma.task.findMany({
    where: { id: { in: taskIds } },
    select: { progress: true, subtaskIds: true },
  });

  const subtaskProgresses = await Promise.all(
    taskProgresses.map(async (task) => {
      if (task.subtaskIds.length > 0) {
        const progresses = await prisma.subtask.findMany({
          where: { id: { in: task.subtaskIds }, completed: { gt: 0 } },
          select: { progress: true },
        });
        return progresses;
      } else {
        return [];
      }
    })
  );

  const maxProgress = taskProgresses.length + subtaskProgresses.flat().length;

  let totalProgress = 0;

  taskProgresses.forEach(
    (taskProgress) => (totalProgress += taskProgress.progress)
  );
  subtaskProgresses
    .flat()
    .forEach((subtaskProgress) => (totalProgress += subtaskProgress.progress));

  return totalProgress / maxProgress;
}
