import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import Task from "./task";
import { getServerUser } from "@/app/lib/getServerUser";
import { getProjectById } from "@/app/lib/data/project/getProjectById";
import { getTaskById } from "@/app/lib/data/task/getTaskById";
import { CommentType } from "@prisma/client";

export async function getData(taskId: string) {
  const user = await getServerUser();

  const userName = user.name as string;

  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id: ${taskId} wasn't found`);
  }

  const subtasks = await prisma.task.findMany({
    where: { id: { in: task.subtaskIds } },
  });

  const comments: any[] = [];
  task.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  const taskData = {
    ...task,
    taskId,
    subtasks,
    comments: comments.filter(
      (comment) => comment.type === CommentType.USER_COMMENT
    ),
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
