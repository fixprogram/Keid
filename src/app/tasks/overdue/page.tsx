import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";

import { getServerUser } from "@/app/lib/getServerUser";
import OverdueTasks from "./overdue-tasks";

async function getData() {
  const user = await getServerUser();

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true, style: true, taskIds: true, isStarred: true },
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

  const overdueTasks = await prisma.task.findMany({
    where: {
      id: { in: tasksIds },
      deadline: { lt: new Date().setHours(23, 59, 59, 999) },
      AND: { completed: 0 },
      NOT: { deadline: 0 },
    },
  });

  const mappedOverdueTasks = overdueTasks.map((task) => {
    const parentProject = projects.find((project) => {
      if (project.taskIds.some((taskId) => taskId === task.id)) return project;
    });
    const isFavorite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavorite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  return {
    tasks: mappedOverdueTasks,
    userProjectNames,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["tasks"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <OverdueTasks />
    </Hydrate>
  );
}
