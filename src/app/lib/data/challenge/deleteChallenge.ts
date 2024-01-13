import { prisma } from "@/db.server";

export const deleteChallenge = async (id: string) => {
  const challenge = await prisma.challenge.delete({
    where: { id },
  });

  return challenge;
};
