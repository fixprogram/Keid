import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Project } from "@prisma/client";

type Props = {
  userId: string;
  projectName: string;
  taskName: string;
  taskStyle: string;
  deadline: number;
};

export const createTask = async ({
  userId,
  projectName,
  taskName,
  taskStyle,
  deadline,
}: Props) => {
  const project = (await prisma.project.findFirst({
    where: { userId, title: projectName },
    select: { id: true, taskIds: true },
  })) as Project;
  const projectId = project.id;

  const task = await prisma.task.create({
    data: {
      projectId,
      title: taskName,
      style: taskStyle,
      deadline,
      progress: 0,
      completed: 0,
      comments: [
        {
          userId,
          content: "",
          time: Date.now().toString(),
          serviceContent: serviceComments.task.created,
        },
      ],
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: { taskIds: [...project.taskIds, task.id] },
  });

  return task;
};
