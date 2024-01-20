import { prisma } from "@/app/lib/prisma/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Comment, CommentType } from "@prisma/client";

export const updateHabitProgress = async (
  habitId: string,
  newProgress: number,
  comment: Comment
) => {
  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
    select: { comments: true, streak: true },
  });

  if (!habit) {
    throw new Error(`Habit with id ${habitId} wasn't found`);
  }

  const progressDifference = newProgress - habit.streak;

  const newComment = {
    ...comment,
    serviceContent:
      serviceComments.habit.updatedProgress +
      `${progressDifference > 0 ? " +" : " "}${progressDifference}%`,
    type: CommentType.PROGRESS_UPDATE,
  };

  const data = {
    streak: newProgress,
    comments: [...habit.comments, newComment],
  };

  const updatedHabit = await prisma.habit.update({
    where: { id: habitId },
    data,
  });

  return updatedHabit;
};
