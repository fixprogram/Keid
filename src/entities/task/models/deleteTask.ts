import { prisma } from "@/db.server";

export const deleteTask = async (taskId: string) => {
  const task = await prisma.task.delete({
    where: { id: taskId },
  });

  await prisma.subtask.deleteMany({ where: { id: { in: task.subtaskIds } } });

  const project = await prisma.project.findUnique({
    where: { id: task.projectId },
  });

  if (!project) {
    throw new Error(`Project with id: ${task.projectId} wasn't found `);
  }

  const newTaskIds = project.taskIds.filter((id) => {
    if (id !== taskId) return id;
  });

  await prisma.project.update({
    where: { id: project.id },
    data: { taskIds: [...newTaskIds] },
  });

  return task;
};
