import { prisma } from "@/app/lib/prisma/db.server";

export const deleteChallenge = async (id: string) => {
  const challenge = await prisma.challenge.delete({
    where: { id },
  });

  return challenge;
};
