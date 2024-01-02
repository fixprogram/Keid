import { prisma } from "@/db.server";

export const updateDeadline = async (
  subtaskId: string,
  newDeadline: number
) => {
  const subtask = await prisma.subtask.findUnique({
    where: { id: subtaskId },
  });

  if (!subtask) {
    throw new Error(`Subtask with id ${subtaskId} wasn't found`);
  }

  const data = {
    deadline: newDeadline,
  };

  await prisma.subtask.update({ where: { id: subtask.id }, data });

  return subtask;
};
