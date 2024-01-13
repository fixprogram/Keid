import { prisma } from "@/db.server";

export async function deleteComment(id: string, commentTime: string) {
  const challenge = await prisma.challenge.findUnique({ where: { id } });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  const updatedComments = challenge.comments.filter(
    (comment) => comment.time !== commentTime
  );

  return await prisma.challenge.update({
    where: { id },
    data: {
      comments: [...updatedComments],
    },
  });
}
