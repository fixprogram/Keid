import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getUser } from "@/app/lib/session";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { Habit, Task } from "@prisma/client";
import Productivity from "./productivity";
import { getTodayProductivity } from "@/templates/DashboardPage/api/getTodayProductivity";

export async function getData(dateType: DateType) {
  const user = await getUser();

  const userId = user.id;
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, taskIds: true, isStarred: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

  let tasks: Task[] = [];
  let habits: Habit[] = [];

  switch (dateType) {
    case DateType.Today: {
      return await getTodayProductivity(userId);
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

  const weeklyActivityData = await getWeeklyActivityData(userId);

  return {
    activity: {
      maxActivity: Math.max(
        ...weeklyActivityData.days.map((day) => day.taskAmount)
      ),
      allProjects: weeklyActivityData.projects.length,
      allTasks: weeklyActivityData.allTasksAmount,
      days: weeklyActivityData.days,
    },
    projects: weeklyActivityData.projects,
  };
}

export default async function Page() {
  const dateType = DateType.Today;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["dashboard", "productivity", dateType], () =>
    getData(dateType)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Productivity />
    </Hydrate>
  );
}
