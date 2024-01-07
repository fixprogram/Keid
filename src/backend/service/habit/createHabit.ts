import { prisma } from "@/db.server";

export const createHabit = async (
  userId: string,
  habitName: string,
  habitStyle: string,
  points: number
) => {
  const habit = await prisma.habit.create({
    data: {
      userId,
      title: habitName,
      style: habitStyle,
      streak: 0,
      completed: 0,
      isArchived: false,
      points,
    },
  });

  return habit;
};
