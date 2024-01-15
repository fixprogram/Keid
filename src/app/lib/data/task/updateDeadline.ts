import { prisma } from "@/app/lib/prisma/db.server";

export const updateDeadline = async (taskId: string, newDeadline: number) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const data = {
    deadline: newDeadline,
  };

  await prisma.task.update({ where: { id: task.id }, data });

  return task;
};
