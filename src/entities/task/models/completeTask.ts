import { prisma } from "@/db.server";

export const completeTask = async (taskId: string) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { completed: Date.now(), progress: 100 },
  });

  return task;
};
