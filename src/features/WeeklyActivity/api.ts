import { prisma } from "@/db.server";
import { getMonday } from "@/shared/lib/utils/getMonday";
import { Comment } from "@prisma/client";

type ActivityItem = {
  taskTitle: string;
  comment: Comment;
};

// Now we're getting activity only by comments left inside tasks
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

  // Getting an array of tasks updated this week
  const lastWeekActiveTasks = tasks.filter((task) =>
    task.comments.find((comment) => +comment.time >= firstWeekdayTimestamp)
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

      const lastWeekCompletedTasks = completedTasks.filter((task) => {
        return task.completed >= firstWeekdayTimestamp;
      });
      const prevProgress = Math.floor(
        (lastWeekCompletedTasks.length / projectTasks.length) * 100
      );

      const progressChange = currentProgress - prevProgress;

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
