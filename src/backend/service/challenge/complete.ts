import { prisma } from "@/db.server";
import { Comment } from "@prisma/client";

export const complete = async (id: string, comment: Comment) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: { comments: true },
  });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  const data = {
    completed: Date.now(),
    comments: [...challenge.comments, comment],
  };

  const updatedChallenge = await prisma.challenge.update({
    where: { id },
    data,
  });

  return updatedChallenge;
};
