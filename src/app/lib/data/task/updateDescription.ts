import { prisma } from "@/app/lib/prisma/db.server";

export const updateDescription = async (
  taskId: string,
  newDescription: string
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const data = {
    description: newDescription,
  };

  await prisma.task.update({ where: { id: task.id }, data });

  return task;
};
