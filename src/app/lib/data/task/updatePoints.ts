import { prisma } from "@/app/lib/prisma/db.server";

export const updatePoints = async (taskId: string, newPoints: number) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { points: newPoints },
  });

  return task;
};
