import { prisma } from "@/db.server";
import { getSubtaskById } from "./getSubtaskById";

export async function deleteComment(subtaskId: string, commentTime: string) {
  const subtask = await getSubtaskById(subtaskId);

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  const updatedComments = subtask.comments.filter(
    (comment) => comment.time !== commentTime
  );

  if (!subtask) {
    throw new Error(`Task with id ${subtaskId} wasn't found`);
  }

  return await prisma.subtask.update({
    where: { id: subtask.id },
    data: {
      comments: [...updatedComments],
    },
  });
}
