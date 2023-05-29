import { prisma } from "@/db.server";

export const getCompletedTaskAmount = async (ids: string[]) => {
  const tasks = await prisma.task.findMany({
    where: { id: { in: ids } },
    select: { completed: true },
  });

  return tasks.filter((task) => task.completed).length;
};
