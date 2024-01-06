import { prisma } from "@/db.server";

export async function getProjectProgress(projectId: string) {
  const taskProgresses = await prisma.task.findMany({
    where: { projectId },
    select: { progress: true },
  });

  // const subtaskProgresses = await Promise.all(
  //   taskProgresses.map(async (task) => {
  //     if (task.subtaskIds.length > 0) {
  //       const progresses = await prisma.subtask.findMany({
  //         where: { id: { in: task.subtaskIds }, completed: { gt: 0 } },
  //         select: { progress: true },
  //       });
  //       return progresses;
  //     } else {
  //       return [];
  //     }
  //   })
  // );

  const maxProgress = taskProgresses.length;

  let totalProgress = 0;

  taskProgresses.forEach(
    (taskProgress) => (totalProgress += taskProgress.progress)
  );

  return totalProgress / maxProgress;
}
