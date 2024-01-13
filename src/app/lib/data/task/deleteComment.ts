import { prisma } from "@/db.server";
import { getTaskById } from "./getTaskById";

export async function deleteComment(taskId: string, commentTime: string) {
  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const updatedComments = task.comments.filter(
    (comment) => comment.time !== commentTime
  );

  return await prisma.task.update({
    where: { id: task.id },
    data: {
      comments: [...updatedComments],
    },
  });
}
