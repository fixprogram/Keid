import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Comment } from "@prisma/client";

export const updateTaskProgress = async (
  taskId: string,
  newProgress: number,
  comment: Comment
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { comments: true, progress: true },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const progressDifference = newProgress - task.progress;

  const newComment = {
    ...comment,
    serviceContent:
      serviceComments.task.updatedProgress +
      `${progressDifference > 0 ? " +" : " "}${progressDifference}%`,
  };

  const data = {
    progress: newProgress,
    comments: [...task.comments, newComment],
  };

  const updatedTask = await prisma.task.update({ where: { id: taskId }, data });

  return updatedTask;
};
