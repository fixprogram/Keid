import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { CommentType } from "@/features/Comments/config/types";
import Task from "./task";
import { getUser } from "@/app/lib/session";
import { getProjectById } from "@/backend/service/project/getProjectById";
import { getTaskById } from "@/backend/service/task/getTaskById";

async function getData(taskId: string) {
  const user = await getUser();

  const userName = user.name as string;

  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id: ${taskId} wasn't found`);
  }

  const subtasks = await prisma.task.findMany({
    where: { id: { in: task.subtaskIds } },
  });
  // const subtasks = await getSubtasksByIds(data.subtaskIds);

  const comments: CommentType[] = [];
  task.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  const taskData = {
    ...task,
    taskId,
    subtasks,
    comments,
  };

  const parentProject = await getProjectById(taskData.projectId);

  let parentTitle = parentProject?.title;

  if (task.parentId !== task.projectId) {
    const parent = await prisma.task.findUnique({
      where: { id: task.parentId },
      select: { title: true },
    });

    parentTitle = parent?.title;
  }

  return {
    ...taskData,
    projectTitle: parentProject ? parentProject.title : "No project",
    projectStyle: parentProject ? parentProject.style : "01",
    parentTitle,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["task", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Task id={params.id} />
    </Hydrate>
  );
}
