import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";

export const archiveHabit = async (habitId: string) => {
  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
    select: { comments: true, streak: true, userId: true },
  });

  if (!habit) {
    throw new Error(`Habit with id ${habitId} wasn't found`);
  }

  const comment: Comment = {
    userId: habit.userId,
    type: CommentType.ARCHIVED,
    content: "",
    time: `${Date.now()}`,
    serviceContent: null,
  };

  const updatedHabit = await prisma.habit.update({
    where: { id: habitId },
    data: { isArchived: true, comments: { push: comment } },
  });

  return updatedHabit;
};
