import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { User } from "../types";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import { getUser } from "../lib/session";
import Dashboard from "./dashboard";
import { getWeekTasks } from "@/features/WeekTasks/api";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";

async function getData() {
  const user = await getUser();

  // Here you can change data in the whole db in case you added or deleted some fields
  // await prisma.subtask.updateMany({ data: { description: "" } });

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, taskIds: true, isStarred: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

  const weekTasks = await (
    await getWeekTasks(projectIDs)
  ).map((task) => {
    const isFavourite = Boolean(
      projects.find((project) =>
        project.taskIds.some((taskId) => taskId === task.id)
      )?.isStarred
    );

    return { ...task, isFavourite };
  });

  const projectAmount = userProjectNames.length;
  const totalTasksIds: string[] = [];

  const taskWithoutProjectIds = await prisma.task.findMany({
    where: { projectId: userId },
    select: { id: true },
  });
  taskWithoutProjectIds.forEach((task) => {
    totalTasksIds.push(task.id);
  });
  projects.forEach((project) => {
    totalTasksIds.push(...project.taskIds);
  });

  const totalTaskAmount = totalTasksIds.length;

  const overdueTasks = await prisma.task.findMany({
    where: {
      id: { in: totalTasksIds },
      deadline: { lt: new Date().setHours(23, 59, 59, 999) },
      AND: { completed: 0 },
      NOT: { deadline: 0 },
    },
    select: { id: true },
  });

  const overdueTaskAmount = overdueTasks.length;

  const weeklyActivityData = await getWeeklyActivityData(userId);

  const habits = await prisma.habit.findMany({ where: { userId } });

  return {
    projectAmount,
    overdueTaskAmount,
    totalTaskAmount,
    weekTasks,
    userName: user.name,
    userId,
    projects: weeklyActivityData.projects,
    activityFeed: weeklyActivityData.activityFeed,
    habits,
  };
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["dashboard"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Dashboard />
    </Hydrate>
  );
}
