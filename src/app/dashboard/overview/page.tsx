import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/backend/service/user/getUserProjectNames";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import Overview from "./overview";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getUser } from "@/app/lib/session";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getTodayTasks } from "@/templates/DashboardPage/api/getTodayTasks";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { Challenge, CommentType, Member, Task } from "@prisma/client";
import { transformChallenge } from "@/templates/DashboardPage/lib/transformChallenge";
import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { getTodayHabits } from "@/templates/DashboardPage/api/getTodayHabits";
import { mapAndSortTasks } from "@/templates/DashboardPage/lib/mapAndSortTasks";
import { getTodayChallenges } from "@/templates/DashboardPage/api/getTodayChallenges";

export async function getData(dateType: DateType) {
  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);
  const projects = await prisma.project.findMany({
    where: { userId, isArchived: false },
    select: { id: true, taskIds: true, isStarred: true },
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

  const habits = await getTodayHabits(userId);

  const challenges = await getTodayChallenges(userId);

  return {
    projectAmount,
    overdueTaskAmount,
    totalTaskAmount,
    tasks: mapAndSortTasks(tasks, projects),
    userName: user.name,
    projects: weeklyActivityData.projects,
    activityFeed: weeklyActivityData.activityFeed,
    habits,
    challenges,
  };
}

export default async function Page() {
  const dateType = DateType.Today;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["dashboard", "overview", dateType], () =>
    getData(dateType)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Overview />
    </Hydrate>
  );
}
