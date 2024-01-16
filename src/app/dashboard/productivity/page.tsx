import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getServerUser } from "@/app/lib/getServerUser";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { Challenge, Habit, Task } from "@prisma/client";
import Productivity from "./productivity";
import { getTodayProductivity } from "@/templates/DashboardPage/api/getTodayProductivity";
import { DailyProgress } from "@/features/DailyProgress";
import { WeeklyActivity } from "@/features/WeeklyActivity";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import { getTodayTasks } from "@/templates/DashboardPage/api/getTodayTasks";
import { getTodayHabits } from "@/templates/DashboardPage/api/getTodayHabits";
import { getTodayChallenges } from "@/templates/DashboardPage/api/getTodayChallenges";

export async function getData(dateType: DateType) {
  const user = await getServerUser();

  const userId = user.id;
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, taskIds: true, isStarred: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

  let tasks: Task[] = [];
  let habits: Habit[] = [];
  let challenges: Challenge[] = [];

  switch (dateType) {
    case DateType.Today: {
      tasks = await getTodayTasks(userId);
      habits = await getTodayHabits(userId);
      challenges = await getTodayChallenges(userId);
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
    tasks,
    habits,
    challenges,
  };
}

export default async function Page() {
  const dateType = DateType.Today;

  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["dashboard", "productivity", dateType], () =>
  //   getData(dateType)
  // );
  // const dehydratedState = dehydrate(queryClient);

  const data = await getData(dateType);

  if (dateType === DateType.Today) {
    return <DailyProgress {...data} />;
  }

  if (dateType === DateType.Week) {
    return (
      <>
        <WeeklyActivity {...data.activity} />
        <WeeklyStatistics {...data} />
      </>
    );
  }
  // return (
  // <Hydrate state={dehydratedState}>
  // <Productivity />

  return <div className="text-deactive">Empty for now</div>;
  {
    /* </Hydrate> */
  }
  // );
}
