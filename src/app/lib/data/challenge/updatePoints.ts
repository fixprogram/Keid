import { prisma } from "@/app/lib/prisma/db.server";

export const updatePoints = async (id: string, newPoints: number) => {
  const challenge = await prisma.challenge.update({
    where: { id },
    data: { points: newPoints },
  });

  return challenge;
};
