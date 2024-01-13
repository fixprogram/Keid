import { prisma } from "@/db.server";

export async function getProjectTasks(taskIds: string[]) {
  const tasks = await prisma.task.findMany({
    where: { id: { in: taskIds } },
    select: { subtaskIds: true, id: true },
  });

  const subtaskIds: string[] = [];
  const taskWithoutSubtaskIds: string[] = [];
  tasks.forEach((task) => {
    if (task.subtaskIds.length) {
      subtaskIds.push(...task.subtaskIds, task.id);
    } else {
      taskWithoutSubtaskIds.push(task.id);
    }
  });

  return { taskWithoutSubtaskIds, subtaskIds };
}
