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
import { Challenge, CommentType, Habit, Task } from "@prisma/client";
import { cache } from "react";
import { getProjectById } from "@/app/lib/data/project/getProjectById";
import { getTaskById } from "@/app/lib/data/task/getTaskById";
import { getTasksByIds } from "@/app/lib/data/task/getTasksByIds";

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

export async function getProductivityData(dateType: DateType) {
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

export async function getChallengeData(challengeId: string) {
  const user = await getServerUser();

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error(`challenge with id: ${challengeId} wasn't found`);
  }

  const host = await prisma.user.findUnique({
    where: { id: challenge.userId },
    select: { name: true },
  });

  if (!host) {
    throw new Error(`User with id ${challenge.userId} wasn't found`);
  }

  challenge.comments = challenge.comments.filter(
    (comment) => comment.type === CommentType.USER_COMMENT
  );

  const memberIds = challenge.members.map((member) => member.id);

  if (memberIds.length) {
    const users = await prisma.user.findMany({
      where: { id: { in: memberIds } },
      select: { name: true, id: true },
    });

    challenge.members = challenge.members.map((member) => {
      const userName = users.find((name) => name.id === member.id)?.name;
      return {
        ...member,
        name: userName,
      };
    });

    challenge.comments = challenge.comments.map((comment) => {
      const userName = users.find((user) => user.id === comment.userId)?.name;

      return { ...comment, userName };
    });
  }

  return {
    ...challenge,
    hostId: challenge.userId,
    userId: user.id,
    hostName: host.name,
  };
}

export async function getHabitData(habitId: string) {
  const user = await getServerUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  if (!habit) {
    throw new Error(`project with id: ${habitId} wasn't found`);
  }

  const completedDays: string[] = habit.comments
    .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
    .map((comment) => {
      const date = new Date(Number(comment.time));
      const dateStr = date.toISOString().split("T")[0];
      return dateStr;
    });

  const startedFrom = habit.comments.find(
    (comment) => comment.type === CommentType.STARTED
  )?.time;

  habit.comments = habit.comments
    .filter((comment) => comment.type === CommentType.USER_COMMENT)
    .map((comment) => ({
      ...comment,
      userName: user.name,
    }));

  return {
    ...habit,
    userProjectNames,
    startedFrom: startedFrom ?? 0,
    completedDays,
  };
}

export async function getTaskData(taskId: string) {
  const user = await getServerUser();

  const userName = user.name as string;

  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id: ${taskId} wasn't found`);
  }

  const subtasks = await prisma.task.findMany({
    where: { id: { in: task.subtaskIds } },
  });

  const comments: any[] = [];
  task.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  const taskData = {
    ...task,
    taskId,
    subtasks,
    comments: comments.filter(
      (comment) => comment.type === CommentType.USER_COMMENT
    ),
  };

  const parentProject = await getProjectById(taskData.projectId);

  let parentTitle = parentProject?.title;

  if (task.parentId !== task.projectId) {
    const parent = await prisma.task.findUnique({
      where: { id: task.parentId },
      select: { title: true },
    });

    parentTitle = parent?.title;
  }

  return {
    ...taskData,
    projectTitle: parentProject ? parentProject.title : "No project",
    projectStyle: parentProject ? parentProject.style : "01",
    parentTitle,
  };
}

export async function getNotificationsData() {
  const { id } = await getServerUser();

  const user = await prisma.user.findUnique({
    where: { id },
    select: { notifications: true },
  });

  if (!user) {
    throw new Error(`User with id ${id} wasn't found`);
  }

  const { notifications } = user;

  const notificationUserIds = [
    ...new Set(notifications.map((notification) => notification.userId)),
  ];

  const notificationUsers = await prisma.user.findMany({
    where: { id: { in: notificationUserIds } },
    select: { id: true, name: true },
  });

  return notifications
    .map((notification) => ({
      ...notification,
      userName: notificationUsers.find(
        (user) => user.id === notification.userId
      )?.name,
    }))
    .reverse();
}

export async function getProjectData(projectId: string) {
  const user = await getServerUser();

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

export async function getSearchData() {
  const user = await getServerUser();

  const users = await prisma.user.findMany({
    where: { NOT: { id: user.id } },
    select: { name: true, id: true },
  });

  return {
    users,
  };
}
