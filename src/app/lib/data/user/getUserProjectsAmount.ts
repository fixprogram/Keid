import { prisma } from "@/app/lib/prisma/db.server";

export const getUserProjectsAmount = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { projectIds: true },
  });

  if (!user) {
    throw new Error(`User with email ${email} wasn't found`);
  }

  return user.projectIds.length;
};
