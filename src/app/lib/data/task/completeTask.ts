import { prisma } from "@/app/lib/prisma/db.server";
import { Comment } from "@prisma/client";

export const completeTaskAndSubtasks = async (
  taskId: string,
  comment: Comment
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { comments: true, progress: true, subtaskIds: true },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const completedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      completed: new Date(),
      progress: 100,
      comments: [...task.comments, comment],
    },
  });

  // If there are subtasks, recursively update each one
  if (task.subtaskIds.length) {
    for (const subtaskId of task.subtaskIds) {
      await completeTaskAndSubtasks(subtaskId, comment);
    }
  }

  return completedTask;
};
