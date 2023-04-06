import { prisma } from "@/db.server";
import { Task } from "@prisma/client";

type Props = {
  taskId: string;
  title: string;
  deadline: string;
};

export const createSubtask = async ({ taskId, title, deadline }: Props) => {
  const task = (await prisma.task.findFirst({
    where: { id: taskId },
    select: { id: true, subtaskIds: true },
  })) as Task;

  const subtask = await prisma.subtask.create({
    data: {
      taskId,
      title,
      deadline,
      completed: "",
    },
  });

  await prisma.task.update({
    where: { id: taskId },
    data: { subtaskIds: [...task.subtaskIds, subtask.id] },
  });

  return subtask;
};
