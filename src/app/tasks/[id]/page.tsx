import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getSubtasksByIds } from "@/backend/service/subtask/getSubtasksByIds";
import { CommentType } from "@/features/Comments/config/types";
import Task from "./task";
import { getUser } from "@/app/lib/session";
import { getProjectById } from "@/backend/service/project/getProjectById";
import { getTaskById } from "@/backend/service/task/getTaskById";

async function getData(taskId: string) {
  const user = await getUser();

  // console.log("user: ", user);

  const userName = user.name as string;

  // const taskId = context.query.id as string;
  const data = await getTaskById(taskId);

  if (!data) {
    throw new Error(`Task with id: ${taskId} wasn't found`);
  }

  const subtasks = await getSubtasksByIds(data.subtaskIds);

  const comments: CommentType[] = [];
  data.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  const taskData = {
    ...data,
    taskId,
    subtasks,
    comments,
  };

  const parentProject = await getProjectById(taskData.projectId);

  return {
    ...taskData,
    projectTitle: parentProject ? parentProject.title : "No project",
    projectStyle: parentProject ? parentProject.style : "01",
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
