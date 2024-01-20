import { prisma } from "@/app/lib/prisma/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Task } from "@prisma/client";

type Props = {
  userId: string;
  taskId: string;
  title: string;
  deadline: number;
};

export const createSubtask = async ({
  userId,
  taskId,
  title,
  deadline,
}: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      subtaskIds: true,
      comments: true,
      projectId: true,
      style: true,
    },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} wasn't found`);
  }

  const subtask = await prisma.task.create({
    data: {
      projectId: task.projectId,
      parentId: taskId,
      title,
      deadline,
      progress: 0,
      completed: 0,
      comments: [],
      description: "",
      subtaskIds: [],
      style: task.style,
      repeats: "Once",
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
