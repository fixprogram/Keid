import { prisma } from "@/db.server";

export const updatePoints = async (id: string, newPoints: number) => {
  const habit = await prisma.habit.update({
    where: { id },
    data: { points: newPoints },
  });

  return habit;
};
