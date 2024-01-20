import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import { getServerUser } from "../lib/getServerUser";
import Tasks from "./tasks";
import { getTasksByIds } from "@/app/lib/data/task/getTasksByIds";

async function getData() {
  const user = await getServerUser();

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      style: true,
      taskIds: true,
      isStarred: true,
    },
  });
  const userProjectNames = projects.map((project) => ({
    title: project.title,
    style: project.style,
  }));

  const tasksIds: string[] = [];
  const taskWithoutProjectIds = await prisma.task.findMany({
    where: { projectId: userId },
    select: { id: true },
  });
  taskWithoutProjectIds.forEach((task) => {
    tasksIds.push(task.id);
  });

  projects.forEach((project) => {
    tasksIds.push(...project.taskIds);
  });

  const tasks = await (
    await getTasksByIds(tasksIds)
  ).map((task) => {
    const parentProject = projects.find(
      (project) => project.id === task.projectId
    );
    const isFavorite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavorite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  return {
    userProjectNames,
    tasks,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["tasks"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Tasks />
    </Hydrate>
  );
}
