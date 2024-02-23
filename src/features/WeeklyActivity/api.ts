import { prisma } from "@/app/lib/prisma/db.server";
import { getMonday } from "@/shared/lib/utils/getMonday";
import { Comment, CommentType } from "@prisma/client";
import { getActivityDays } from "../Activity/lib";
import { getTodayHabits } from "@/templates/DashboardPage/api/getTodayHabits";
import { getTodayChallenges } from "@/templates/DashboardPage/api/getTodayChallenges";

type ActivityItem = {
  taskTitle: string;
  comment: Comment;
};

export async function getWeeklyActivityData(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, style: true, title: true },
  });
  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: [...projects.map((project) => project.id), userId] },
    },
    select: {
      comments: true,
      projectId: true,
      title: true,
      completed: true,
      id: true,
      points: true,
    },
  });

  const firstWeekdayTimestamp = getMonday(new Date()).setHours(3, 0, 0, 0);

  // Getting an array of tasks completed this week
  const lastWeekActiveTasks = tasks.filter((task) =>
    task.comments.find((comment) => {
      // Check if there was activity
      if (
        comment.type === CommentType.PROGRESS_UPDATE ||
        comment.type === CommentType.COMPLETED
      ) {
        return +comment.time >= firstWeekdayTimestamp;
      }
    })
  );

  // Getting an array of projects which tasks were updated this week
  const lastWeekActiveProjects = projects
    .filter((project) =>
      lastWeekActiveTasks.find((task) => task.projectId === project.id)
    )
    .map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id
      );
      const completedTasks = projectTasks.filter((task) => task.completed);
      const currentProgress = Math.floor(
        (completedTasks.length / projectTasks.length) * 100
      );

      const previouslyCompletedTasks = completedTasks.filter((task) => {
        return (task.completed as Date) < new Date(firstWeekdayTimestamp);
      });

      const lastWeekCompletedTasks = completedTasks.filter((task) => {
        return (task.completed as Date) >= new Date(firstWeekdayTimestamp);
      });

      const prevProgress = Math.floor(
        (previouslyCompletedTasks.length / projectTasks.length) * 100
      );

      const progressChange = currentProgress - prevProgress;

      return {
        ...project,
        progressChange,
        currentProgress,
        tasks: lastWeekCompletedTasks,
      };
    });

  const activityFeed: ActivityItem[] = [];

  lastWeekActiveTasks.forEach((task) => {
    task.comments.forEach((comment) => {
      const isCommentFromThisWeek = +comment.time >= firstWeekdayTimestamp;

      if (isCommentFromThisWeek) {
        activityFeed.push({ taskTitle: task.title, comment });
      }
    });
  });

  const lastWeekActiveHabits = await getTodayHabits(userId);
  const lastWeekActiveChallenges = await getTodayChallenges(userId);

  const days = getActivityDays(
    lastWeekActiveTasks,
    lastWeekActiveHabits,
    lastWeekActiveChallenges
  );

  // Getting max task amount among the days
  const maxActivity = Math.max(...days.map((day) => day.taskAmount));

  return {
    days,
    projects: lastWeekActiveProjects,
    activityFeed,
    maxActivity,
    allTasksAmount: lastWeekActiveTasks.length,
  };
}
