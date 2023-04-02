import { prisma } from "@/db.server";
import { Project } from "@prisma/client";

type Props = {
  userId: string;
  projectName: string;
  taskName: string;
  taskStyle: string;
  deadline: string;
};

export const createTask = async ({
  userId,
  projectName,
  taskName,
  taskStyle,
  deadline,
}: Props) => {
  console.log("userId: ", userId);
  console.log("projectName: ", projectName);

  const project = (await prisma.project.findFirst({
    where: { userId, title: projectName },
    select: { id: true },
  })) as Project;
  const projectId = project.id;

  const task = await prisma.task.create({
    data: {
      projectId,
      title: taskName,
      style: taskStyle,
      deadline,
    },
  });

  return task;
};
