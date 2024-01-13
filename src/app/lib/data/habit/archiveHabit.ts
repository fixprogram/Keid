import { prisma } from "@/db.server";

export const archiveHabit = async (habitId: string) => {
  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
    select: { comments: true, streak: true },
  });

  if (!habit) {
    throw new Error(`Habit with id ${habitId} wasn't found`);
  }

  const updatedHabit = await prisma.habit.update({
    where: { id: habitId },
    data: { isArchived: true },
  });

  return updatedHabit;
};
