import { prisma } from "@/db.server";

export async function getUserProjects(userId: string) {
  const userProjects = prisma.project.findMany({
    where: { userId },
  });
  return userProjects;
}
