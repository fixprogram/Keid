"use server";
import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/app/lib/prisma/db.server";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getTodayChallenges } from "@/templates/DashboardPage/api/getTodayChallenges";
import { getTodayHabits } from "@/templates/DashboardPage/api/getTodayHabits";
import { getTodayTasks } from "@/templates/DashboardPage/api/getTodayTasks";
import { mapAndSortTasks } from "@/templates/DashboardPage/lib/mapAndSortTasks";
import { Task } from "@prisma/client";
import { cache } from "react";

export const getOverviewData = cache(async (dateType: DateType) => {
  const user = await getServerUser();

  const userId = user.id;

  const userProjectNames = await getUserProjectNames(userId);
  const projects = await prisma.project.findMany({
    where: { userId, isArchived: false },
    select: { id: true, taskIds: true, isStarred: true, title: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

  let tasks: Task[] = [];

  switch (dateType) {
    case DateType.Today: {
      tasks = await getTodayTasks(userId);

      break;
    }
    case DateType.Week: {
      tasks = await getThisWeekTasks(projectIDs);
      break;
    }
    case DateType.Month: {
      tasks = await getThisMonthTasks(projectIDs);
      break;
    }
    default: {
      throw new Error(`Date type ${dateType} doesn't exist`);
    }
  }

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

  // const overdueTasks = await prisma.task.findMany({
  //   where: {
  //     id: { in: totalTasksIds },
  //     deadline: { lt: new Date().setHours(23, 59, 59, 999) },
  //     AND: { completed: 0 },
  //     NOT: { deadline: 0 },
  //   },
  //   select: { id: true },
  // });

  // const overdueTaskAmount = overdueTasks.length;

  // TODO: Analyze which approach is more efficient

  // const weeklyActivityData = await getWeeklyActivityData(userId);
  // const habits = await getTodayHabits(userId);
  // const challenges = await getTodayChallenges(userId);

  const [weeklyActivityData, habits, challenges] = await Promise.all([
    getWeeklyActivityData(userId),
    getTodayHabits(userId),
    getTodayChallenges(userId),
  ]);
  //

  //   Task & {
  //     isFavorite: boolean;
  //     projectTitle: string;
  //   }

  return {
    projectAmount,
    // overdueTaskAmount,
    totalTaskAmount,
    tasks: mapAndSortTasks(tasks, projects),
    userName: user.name,
    projects: weeklyActivityData.projects,
    activityFeed: weeklyActivityData.activityFeed,
    habits,
    challenges,
  };
});
