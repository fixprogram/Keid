import { prisma } from "@/db.server";
import { getMonday } from "@/shared/lib/utils/getMonday";
import { Comment, CommentType } from "@prisma/client";

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
        return task.completed < firstWeekdayTimestamp;
      });

      const lastWeekCompletedTasks = completedTasks.filter((task) => {
        return task.completed >= firstWeekdayTimestamp;
      });

      const prevProgress = Math.floor(
        (previouslyCompletedTasks.length / projectTasks.length) * 100
      );

      const progressChange = currentProgress - prevProgress;

      console.log("completedTasks: ", completedTasks);

      return {
        ...project,
        progressChange,
        currentProgress,
        tasks: lastWeekCompletedTasks,
      };
    });

  // Getting an array of weekdays where we have a title and task amount from that day
  //   const days = getActivityDays(lastWeekActiveTasks);

  // Getting max task amount among the days
  //   const maxActivity = Math.max(...days.map((day) => day.taskAmount));

  const activityFeed: ActivityItem[] = [];

  lastWeekActiveTasks.forEach((task) => {
    task.comments.forEach((comment) => {
      const isCommentFromThisWeek = +comment.time >= firstWeekdayTimestamp;

      if (isCommentFromThisWeek) {
        activityFeed.push({ taskTitle: task.title, comment });
      }
    });
  });

  return {
    projects: lastWeekActiveProjects,
    activityFeed,
  };
}
