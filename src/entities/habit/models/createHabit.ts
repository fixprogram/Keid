import { prisma } from "@/db.server";

export const createHabit = async (
  userId: string,
  habitName: string,
  habitStyle: string
) => {
  const habit = await prisma.habit.create({
    data: {
      userId,
      title: habitName,
      style: habitStyle,
      streak: 0,
      completed: 0,
    },
  });

  return habit;
};
