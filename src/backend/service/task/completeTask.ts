import { prisma } from "@/db.server";
import { Comment } from "@prisma/client";

export const completeTask = async (taskId: string, comment: Comment) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { comments: true, progress: true, subtaskIds: true },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  if (task.subtaskIds.length) {
    await prisma.subtask.updateMany({
      where: { id: { in: task.subtaskIds } },
      data: { completed: Date.now(), progress: 100 },
    });
  }

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
