import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getUser } from "@/app/lib/session";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import Project from "./project";
import { getProjectById } from "@/entities/project/api/getProjectById";
import { getTasksByIds } from "@/entities/task/api/getTasksByIds";

async function getData(projectId: string) {
  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new Error(`project with id: ${projectId} wasn't found`);
  }

  const tasks = await (
    await getTasksByIds(project.taskIds)
  ).map((task) => ({ ...task, isFavorite: project.isStarred }));

  return {
    ...project,
    tasks,
    userProjectNames,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["project"], () => getData(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Project id={params.id} />
    </Hydrate>
  );
}
