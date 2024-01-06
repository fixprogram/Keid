import { prisma } from "@/db.server";

export const getTodayHabits = async (userId: string) => {
  return await prisma.habit.findMany({
    where: { userId, isArchived: false },
  });
};
