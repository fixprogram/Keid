import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Comment } from "@prisma/client";

export const updateSubtaskProgress = async (
  subtaskId: string,
  newProgress: number,
  comment: Comment
) => {
  const subtask = await prisma.subtask.findUnique({
    where: { id: subtaskId },
    select: { comments: true, progress: true },
  });

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  const progressDifference = newProgress - subtask.progress;

  const newComment = {
    ...comment,
    serviceContent:
      serviceComments.subtask.updatedProgress +
      `${progressDifference > 0 ? " +" : " "}${progressDifference}%`,
  };

  const data = {
    progress: newProgress,
    comments: [...subtask.comments, newComment],
  };

  const updatedSubtask = await prisma.subtask.update({
    where: { id: subtaskId },
    data,
  });

  return updatedSubtask;
};
