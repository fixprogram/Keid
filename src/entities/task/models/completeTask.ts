import { prisma } from "@/db.server";

export const completeTask = async (taskId: string) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { completed: JSON.stringify(new Date()), progress: 100 },
  });

  return task;
};
