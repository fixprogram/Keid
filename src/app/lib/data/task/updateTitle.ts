import { prisma } from "@/app/lib/prisma/db.server";

export const updateTitle = async (taskId: string, newTitle: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const data = {
    title: newTitle,
  };

  await prisma.task.update({ where: { id: task.id }, data });

  return task;
};
