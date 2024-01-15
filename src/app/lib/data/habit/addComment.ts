import { prisma } from "@/app/lib/prisma/db.server";
import { CommentType } from "@prisma/client";

export async function addComment(id: string, userId: string, content: string) {
  return await prisma.habit.update({
    where: { id },
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
