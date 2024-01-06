import { prisma } from "@/db.server";
import { CommentType } from "@prisma/client";

export async function addComment(id: string, userId: string, content: string) {
  return await prisma.challenge.update({
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