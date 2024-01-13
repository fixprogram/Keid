import { prisma } from "@/db.server";

export const updateTitle = async (id: string, newTitle: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
  });

  if (!challenge) {
    throw new Error(`Task with id ${id} wasn't found`);
  }

  const data = {
    title: newTitle,
  };

  await prisma.challenge.update({ where: { id }, data });

  return challenge;
};
