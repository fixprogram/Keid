import { prisma } from "@/db.server";

export const updateDescription = async (id: string, newDescription: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
  });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  const data = {
    description: newDescription,
  };

  await prisma.challenge.update({ where: { id }, data });

  return challenge;
};
