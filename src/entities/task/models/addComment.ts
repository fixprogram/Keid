import { prisma } from "@/db.server";
import { getTaskById } from "./getTaskById";

export async function addComment(
  taskId: string,
  userId: string,
  content: string
) {
  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  return await prisma.task.update({
    where: { id: task.id },
    data: {
      comments: [
        ...task.comments,
        { userId, content, time: Date.now().toString() },
      ],
    },
  });
}