import { prisma } from "@/db.server";
import { getSubtaskById } from "./getSubtaskById";

export async function addComment(
  subtaskId: string,
  userId: string,
  content: string
) {
  const subtask = await getSubtaskById(subtaskId);

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  return await prisma.subtask.update({
    where: { id: subtask.id },
    data: {
      comments: [
        ...subtask.comments,
        { userId, content, time: Date.now().toString() },
      ],
    },
  });
}
