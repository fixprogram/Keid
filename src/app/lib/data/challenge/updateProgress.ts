import { prisma } from "@/app/lib/prisma/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Comment, CommentType } from "@prisma/client";

export const updateProgress = async (
  id: string,
  newProgress: number,
  comment: Comment
) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: { comments: true, streak: true },
  });

  if (!challenge) {
    throw new Error(`Habit with id ${id} wasn't found`);
  }

  const progressDifference = newProgress - challenge.streak;

  const newComment = {
    ...comment,
    serviceContent:
      serviceComments.habit.updatedProgress +
      `${progressDifference > 0 ? " +" : " "}${progressDifference}%`,
    type: CommentType.PROGRESS_UPDATE,
  };

  const data = {
    streak: newProgress,
    comments: [...challenge.comments, newComment],
  };

  const updatedChallenge = await prisma.challenge.update({
    where: { id },
    data,
  });

  return updatedChallenge;
};
