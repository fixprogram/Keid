import { prisma } from "@/db.server";

export const archiveChallenge = async (id: string) => {
  const challenge = await prisma.challenge.update({
    where: { id },
    data: { isArchived: true },
  });

  return challenge;
};
