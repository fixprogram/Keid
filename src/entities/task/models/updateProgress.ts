import { prisma } from "@/db.server";
import { Comment } from "@prisma/client";

export const updateProgress = async (
  taskId: string,
  newProgress: number,
  comment?: Comment
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const data = { progress: newProgress, comments: task.comments };

  if (comment) {
    data.comments.push(comment);
  }

  await prisma.task.update({ where: { id: task.id }, data });

  return task;
};
