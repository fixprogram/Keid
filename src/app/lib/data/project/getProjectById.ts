import { prisma } from "@/app/lib/prisma/db.server";

export const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({ where: { id } });
};
