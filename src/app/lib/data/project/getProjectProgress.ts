import { prisma } from "@/db.server";

export async function getProjectProgress(projectId: string) {
  const taskProgresses = await prisma.task.findMany({
    where: { projectId },
    select: { progress: true },
  });

  const maxProgress = taskProgresses.length;

  let totalProgress = 0;

  taskProgresses.forEach(
    (taskProgress) => (totalProgress += taskProgress.progress)
  );

  return totalProgress / maxProgress;
}
