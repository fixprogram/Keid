import { prisma } from "@/db.server";

export const completeProject = async (projectId: string) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { completed: Date.now() },
  });

  const subtaskIds: string[] = [];

  const tasks = await prisma.task.findMany({
    where: { projectId },
    select: { subtaskIds: true },
  });

  tasks.forEach((task) => {
    if (task.subtaskIds.length) {
      subtaskIds.push(...task.subtaskIds);
    }
  });

  await prisma.task.updateMany({
    where: { projectId, completed: { lt: 1 } },
    data: { completed: Date.now() },
  });

  //   await prisma.subtask.deleteMany({ where: { id: { in: subtaskIds } } });

  return project;
};
