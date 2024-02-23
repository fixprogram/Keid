import { prisma } from "@/app/lib/prisma/db.server";

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
    where: { projectId, completed: null },
    data: { completed: new Date() },
  });

  return project;
};
