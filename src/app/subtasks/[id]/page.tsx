import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { CommentType } from "@/features/Comments/config/types";
import { getUser } from "@/app/lib/session";
import { getTaskById } from "@/backend/service/task/getTaskById";
import { getSubtaskById } from "@/backend/service/subtask/getSubtaskById";
import Subtask from "./subtask";

async function getData(subtaskId: string) {
  const user = await getUser();

  const userName = user.name as string;

  const data = await getSubtaskById(subtaskId);

  if (!data) {
    throw new Error(`Subtask with id: ${subtaskId} wasn't found`);
  }

  const parentTask = await getTaskById(data.taskId);

  if (!parentTask) {
    throw new Error(`Project with id: ${subtaskId} wasn't found`);
  }

  const comments: CommentType[] = [];
  data.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  return {
    ...data,
    comments,
    style: parentTask.style,
    parentTitle: parentTask.title,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["subtask", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Subtask id={params.id} />
    </Hydrate>
  );
}
