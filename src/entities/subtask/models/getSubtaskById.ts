import { prisma } from "@/db.server";

export const getSubtaskById = async (id: string) => {
  return await prisma.subtask.findUnique({ where: { id } });
};
