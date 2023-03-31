import { prisma } from "@/db.server";

export const getUserProjectsAmount = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error(`User with email ${email} wasn't found`);
  }

  return user.projectIds.length;
};
