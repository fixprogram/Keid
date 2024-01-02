import { prisma } from "@/db.server";

export const getSubtasksByIds = async (ids: string[]) => {
  return await prisma.subtask.findMany({ where: { id: { in: ids } } });
};
