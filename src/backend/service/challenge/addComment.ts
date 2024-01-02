import { prisma } from "@/db.server";

export async function addComment(id: string, userId: string, content: string) {
  const challenge = await prisma.challenge.findUnique({ where: { id } });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  return await prisma.challenge.update({
    where: { id },
    data: {
      comments: [
        ...challenge.comments,
        { userId, content, time: Date.now().toString() },
      ],
    },
  });
}
