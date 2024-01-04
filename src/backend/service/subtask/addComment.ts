import { prisma } from "@/db.server";
import { CommentType } from "@prisma/client";

export async function addComment(
  subtaskId: string,
  userId: string,
  content: string
) {
  return await prisma.subtask.update({
    where: { id: subtaskId },
    data: {
      comments: {
        push: {
          userId,
          content,
          time: Date.now().toString(),
          type: CommentType.USER_COMMENT,
        },
      },
    },
  });
}
