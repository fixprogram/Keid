import { prisma } from "@/db.server";

export async function getUserProjects(userId: string) {
  // const user = await prisma.user.findUnique({ where: { id: userId } });

  // if (!user) {
  //   throw new Error(`User with user id: ${userId} wasn't found`);
  // }

  const userProjects = prisma.project.findMany({
    where: { userId },
  });
  return userProjects;
}