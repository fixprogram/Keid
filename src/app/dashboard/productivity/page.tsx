import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/backend/service/user/getUserProjectNames";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getUser } from "@/app/lib/session";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getTodayTasks } from "@/templates/DashboardPage/api/getTodayTasks";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { Task } from "@prisma/client";
import Productivity from "./productivity";

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

  switch (dateType) {
    case DateType.Today: {
      tasks = await getTodayTasks(projectIDs);

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

  const weeklyActivityData = await getWeeklyActivityData(userId);

  console.log("weeklyActivityData: ", weeklyActivityData);

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
    // activityFeed: weeklyActivityData.activityFeed,
  };
}

export default async function Page() {
  const user = await getUser();

  const userId = user.id;
  // TODO: Add dateType saving to user schema
  //   const dateType = await prisma.user.findUnique({
  //     where: { id: userId },
  //     select: { dateType: true },
  //   });

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
