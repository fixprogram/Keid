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

export async function transformChallenges(challenges: Challenge[]) {
  const user = await getUser();
  const userId = user.id;

  const hostIds = challenges.map((challenge) => challenge.userId);

  const hosts = await prisma.user.findMany({
    where: { id: { in: [...new Set(hostIds)] } },
    select: { id: true, name: true },
  });

  const mappedChallenges = challenges.map((challenge) => {
    const host = hosts.find((host) => host.id === challenge.userId);

    let isCompletedForToday = false;

    if (userId && userId !== challenge.userId) {
      const member = challenge.members.find(
        (member) => member.id === userId
      ) as Member;

      isCompletedForToday = Boolean(
        member.comments.filter(
          (comment) =>
            comment.type === CommentType.PROGRESS_UPDATE &&
            isDateToday(new Date(Number(comment.time)))
        ).length
      );
    } else {
      isCompletedForToday = Boolean(
        challenge.comments.filter(
          (comment) =>
            comment.type === CommentType.PROGRESS_UPDATE &&
            isDateToday(new Date(Number(comment.time)))
        ).length
      );
    }

    return transformChallenge({
      data: {
        ...challenge,
        hostId: host?.id,
        userId,
        hostName: host?.name,
        isCompletedForToday,
      },
    });
  });

  return mappedChallenges;
}

export async function getData(dateType: DateType) {
  const user = await getUser();

  // const subtasks1 = await prisma.subtask.findMany();

  // console.log("subtasks1: ", subtasks1);

  // for (const subtask1 of subtasks1) {
  //   const { taskId, ...rest } = subtask1;
  //   const data: Task = {
  //     ...rest,
  //     style: "01",
  //     parentId: subtask1.taskId,
  //     subtaskIds: [],
  //     repeats: "Once",
  //   };

  //   // console.log("data: ", data);

  //   await prisma.task.create({ data });
  // }

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

  const habits = await prisma.habit.findMany({
    where: { userId, isArchived: false },
  });

  const mappedTasks = tasks
    .map((task) => {
      const isFavorite = Boolean(
        projects.find((project) =>
          project.taskIds.some((taskId) => taskId === task.id)
        )?.isStarred
      );

      return { ...task, isFavorite };
    })
    .sort((a: Task, b: Task) => a.completed - b.completed);

  const challenges = await prisma.challenge.findMany({
    where: {
      OR: [
        { userId, isArchived: false },
        { members: { some: { id: userId } }, isArchived: false },
      ],
    },
  });

  const transformedChallenges = await transformChallenges(challenges);

  return {
    projectAmount,
    overdueTaskAmount,
    totalTaskAmount,
    tasks: mappedTasks,
    userName: user.name,
    projects: weeklyActivityData.projects,
    activityFeed: weeklyActivityData.activityFeed,
    habits,
    // challenges,
    challenges: transformedChallenges,
  };
}

export default async function Page() {
  const user = await getUser();

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
