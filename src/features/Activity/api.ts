import { prisma } from "@/db.server";
import { getMonday } from "@/shared/lib/utils/getMonday";
import { getActivityDays } from "./lib";

// Now we're getting activity only by comments left inside tasks
export async function getWeeklyActivityData(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true },
  });
  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: [...projects.map((project) => project.id), userId] },
    },
    select: { comments: true, projectId: true, points: true },
  });

  const firstWeekdayTimestamp = getMonday(new Date()).setHours(3, 0, 0, 0);

  // Getting an array of tasks updated this week
  const lastWeekActiveTasks = tasks.filter((task) =>
    task.comments.find((comment) => +comment.time >= firstWeekdayTimestamp)
  );

  // Getting an array of projects which tasks were updated this week
  const lastWeekActiveProjects = projects.filter((project) =>
    lastWeekActiveTasks.find((task) => task.projectId === project.id)
  );

  // Getting an array of weekdays where we have a title and task amount from that day
  const days = getActivityDays(lastWeekActiveTasks);

  // Getting max task amount among the days
  const maxActivity = Math.max(...days.map((day) => day.taskAmount));

  return {
    days,
    allTasks: lastWeekActiveTasks.length,
    allProjects: lastWeekActiveProjects.length,
    maxActivity,
  };
}
