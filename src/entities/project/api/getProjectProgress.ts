import { prisma } from "@/db.server";

export async function getProjectProgress(taskIds: string[]) {
  // const {taskWithoutSubtaskIds, subtaskIds} = await getProjectTasks(taskIds)
  const taskProgresses = await prisma.task.findMany({
    where: { id: { in: taskIds } },
    select: { progress: true },
  });

  let totalProgress = 0;

  taskProgresses.forEach(
    (taskProgress) => (totalProgress += taskProgress.progress)
  );

  return totalProgress / taskProgresses.length;
}
