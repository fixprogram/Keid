import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Task } from "@prisma/client";

type Props = {
  userId: string;
  taskId: string;
  title: string;
  deadline: string;
};

export const createSubtask = async ({
  userId,
  taskId,
  title,
  deadline,
}: Props) => {
  const task = (await prisma.task.findFirst({
    where: { id: taskId },
    select: { id: true, subtaskIds: true, comments: true },
  })) as Task;

  const subtask = await prisma.subtask.create({
    data: {
      taskId,
      title,
      deadline,
      progress: 0,
      completed: "",
      comments: [],
    },
  });

  await prisma.task.update({
    where: { id: taskId },
    data: {
      subtaskIds: [...task.subtaskIds, subtask.id],
      comments: [
        ...task.comments,
        {
          userId,
          time: Date.now().toString(),
          content: "",
          serviceContent: serviceComments.task.addedSubtask,
        },
      ],
    },
  });

  return subtask;
};
