import { prisma } from "@/db.server";
import { Comment } from "@prisma/client";

export const completeHabitForToday = async (id: string, comment: Comment) => {
  const habit = await prisma.habit.findUnique({
    where: { id },
    select: { comments: true, streak: true },
  });

  if (!habit) {
    throw new Error(`Habit with id ${id} wasn't found`);
  }

  const completedTask = await prisma.habit.update({
    where: { id },
    data: {
      streak: habit.streak + 1,
      comments: [...habit.comments, comment],
    },
  });

  return completedTask;
};
