import { prisma } from "@/db.server";

export const deleteProject = async (projectId: string) => {
  const project = await prisma.project.delete({
    where: { id: projectId },
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

  await prisma.task.deleteMany({ where: { projectId } });

  await prisma.subtask.deleteMany({ where: { id: { in: subtaskIds } } });

  return project;
};
