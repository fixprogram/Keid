import { prisma } from "@/db.server";

export const updateDescription = async (
  subtaskId: string,
  newDescription: string
) => {
  const subtask = await prisma.subtask.findUnique({
    where: { id: subtaskId },
  });

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  const data = {
    description: newDescription,
  };

  await prisma.subtask.update({ where: { id: subtask.id }, data });

  return subtask;
};
