import { prisma } from "@/db.server";

export const getTaskById = async (id: string) => {
  return await prisma.task.findUnique({ where: { id } });
};
