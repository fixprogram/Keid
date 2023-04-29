import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { RepeatsOptionType } from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/ui/PopupBody/ui/TaskRepeats";
import { Project } from "@prisma/client";

type Props = {
  userId: string;
  projectName?: string;
  taskName: string;
  taskStyle: string;
  deadline: number;
  repeats: RepeatsOptionType;
};

export const createTask = async ({
  userId,
  projectName,
  taskName,
  taskStyle,
  deadline,
  repeats,
}: Props) => {
  const project = (await prisma.project.findFirst({
    where: { userId, title: projectName },
    select: { id: true, taskIds: true },
  })) as Project;
  const projectId = project ? project.id : userId;

  const taskData = {
    projectId,
    title: taskName,
    style: taskStyle,
    deadline,
    progress: 0,
    completed: 0,
    repeats,
    comments: [
      {
        userId,
        content: "",
        time: Date.now().toString(),
        serviceContent: serviceComments.task.created,
      },
    ],
  };

  const task = await prisma.task.create({
    data: taskData,
  });

  if (project) {
    await prisma.project.update({
      where: { id: projectId },
      data: { taskIds: [...project.taskIds, task.id] },
    });
  }

  return task;
};
