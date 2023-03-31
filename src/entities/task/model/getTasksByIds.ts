import { prisma } from "@/db.server";

export const getTasksByIds = async (ids: string[]) => {
  return await prisma.task.findMany({ where: { id: { in: ids } } });
};
