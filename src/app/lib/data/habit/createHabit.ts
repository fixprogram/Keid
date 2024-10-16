import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";

export const createHabit = async (
  userId: string,
  habitName: string,
  habitStyle: string,
  points: number,
  repeats: number
) => {
  const comment: Comment = {
    userId,
    time: `${Date.now()}`,
    type: CommentType.STARTED,
    content: "",
    serviceContent: null,
  };

  const habit = await prisma.habit.create({
    data: {
      userId,
      title: habitName,
      style: habitStyle,
      streak: 0,
      isArchived: false,
      points,
      repeats,
      comments: [comment],
    },
  });

  return habit;
};
