import { prisma } from "@/app/lib/prisma/db.server";

export const getCompletedTaskAmount = async (projectId: string) => {
  const completedTasks = await prisma.task.findMany({
    where: { projectId, completed: { not: { equals: null } } },
    select: { id: true },
  });

  return completedTasks.length;
};
