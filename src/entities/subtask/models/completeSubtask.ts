import { prisma } from "@/db.server";

export const completeSubtask = async (subtaskId: string) => {
  const subtask = await prisma.subtask.update({
    where: { id: subtaskId },
    data: { completed: JSON.stringify(new Date()), progress: 100 },
  });

  return subtask;
};
