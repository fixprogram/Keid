import { prisma } from "@/db.server";

export const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({ where: { id } });
};
