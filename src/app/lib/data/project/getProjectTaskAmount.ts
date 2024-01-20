import { prisma } from "@/app/lib/prisma/db.server";
import { getProjectTasks } from "./getProjectTasks";

export async function getProjectTaskAmount(projectId: string) {
  // const { taskWithoutSubtaskIds, subtaskIds } = await getProjectTasks(taskIds);

  const tasks = await prisma.task.findMany({
    where: { projectId },
    select: { id: true },
  });

  return tasks.length;
  // return taskWithoutSubtaskIds.length + subtaskIds.length;
}
