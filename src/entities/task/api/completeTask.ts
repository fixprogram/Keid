import { prisma } from "@/db.server";
import { Comment } from "@prisma/client";

export const completeTask = async (taskId: string, comment: Comment) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { comments: true, progress: true },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const progressDifference = 100 - task.progress;

  // const newComment = {
  //   serviceContent:
  //     serviceComments.task.updatedProgress +
  //     `${progressDifference > 0 ? " +" : " "}${progressDifference}%`,
  // };

  const data = {
    completed: Date.now(),
    progress: 100,
    comments: [...task.comments, comment],
  };

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
  });

  return updatedTask;
};
