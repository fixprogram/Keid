import { prisma } from "@/app/lib/prisma/db.server";

export const getTaskById = async (id: string) => {
  return await prisma.task.findUnique({ where: { id } });
};
