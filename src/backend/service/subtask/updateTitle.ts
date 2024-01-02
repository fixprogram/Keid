import { prisma } from "@/db.server";

export const updateTitle = async (subtaskId: string, newTitle: string) => {
  const subtask = await prisma.subtask.findUnique({
    where: { id: subtaskId },
  });

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  const data = {
    title: newTitle,
  };

  await prisma.subtask.update({ where: { id: subtask.id }, data });

  return subtask;
};
