import { prisma } from "@/db.server";

export const deleteSubtask = async (subtaskId: string) => {
  const subtask = await prisma.subtask.delete({
    where: { id: subtaskId },
  });

  const task = await prisma.task.findUnique({
    where: { id: subtask.taskId },
  });

  if (!task) {
    throw new Error(`Task with id: ${subtask.taskId} wasn't found `);
  }

  const newSubtaskIds = task.subtaskIds.filter((id) => {
    if (id !== subtaskId) return id;
  });

  await prisma.task.update({
    where: { id: task.id },
    data: { subtaskIds: [...newSubtaskIds] },
  });

  return subtask;
};
