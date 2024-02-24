import { prisma } from "@/app/lib/prisma/db.server";
import { getActivityDays } from "./lib";
import { getFirstDayOfTheWeek } from "@/shared/lib/utils/getFirstDayOfTheWeek";
import { CommentType } from "@prisma/client";

// Now we're getting activity only by comments left inside tasks
// export async function getWeeklyActivityData(userId: string) {
//   const projects = await prisma.project.findMany({
//     where: { userId },
//     select: { id: true },
//   });
//   const tasks = await prisma.task.findMany({
//     where: {
//       projectId: { in: [...projects.map((project) => project.id), userId] },
//     },
//     select: { comments: true, projectId: true, points: true },
//   });

//   const firstWeekdayTimestamp = getFirstDayOfTheWeek();

//   // Getting an array of tasks updated this week
//   const lastWeekActiveTasks = tasks.filter((task) =>
//     task.comments.find((comment) => +comment.time >= firstWeekdayTimestamp)
//   );

//   // Getting an array of projects which tasks were updated this week
//   const lastWeekActiveProjects = projects.filter((project) =>
//     lastWeekActiveTasks.find((task) => task.projectId === project.id)
//   );

//   // Getting an array of weekdays where we have a title and task amount from that day
//   const days = getActivityDays(lastWeekActiveTasks, [], []);

//   // Getting max task amount among the days
//   const maxActivity = Math.max(...days.map((day) => day.taskAmount));

//   return {
//     days,
//     allTasks: lastWeekActiveTasks.length,
//     allProjects: lastWeekActiveProjects.length,
//     maxActivity,
//   };
// }

export async function getWeeklyActivityData(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true },
  });
  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: [...projects.map((project) => project.id), userId] },
    },
    select: {
      id: true,
      comments: true,
      projectId: true,
      points: true,
      deadline: true,
    },
  });

  const firstWeekdayTimestamp = getFirstDayOfTheWeek();

  // Getting an array of tasks updated this week
  // const lastWeekPlannedTasks = tasks.filter((task) =>
  //   task.comments.find((comment) => +comment.time >= firstWeekdayTimestamp)
  // );

  const lastWeekPlannedTasks = tasks.filter(
    (task) => task.deadline && task.deadline >= new Date(firstWeekdayTimestamp)
  );
  // const lastWeekCompletedTasks = lastWeekPlannedTasks.filter((task) =>
  //   task.comments.find(
  //     (comment) =>
  //       comment.type === CommentType.COMPLETED &&
  //       +comment.time >= firstWeekdayTimestamp
  //   )
  // );

  const lastWeekPlannedHabits = await prisma.habit.findMany({
    where: { userId, isArchived: false },
    select: { id: true, comments: true, points: true },
  });
  // const lastWeekCompletedHabits = lastWeekPlannedHabits.filter(habit => habit.comments.find(
  //   (comment) =>
  //     comment.type === CommentType.COMPLETED &&
  //     +comment.time >= firstWeekdayTimestamp
  // ))

  // const lastWeekPlannedChallenges = await prisma.challenge.findMany({where: {}})

  // Getting an array of weekdays where we have a title and task amount from that day
  const days = getActivityDays(
    lastWeekPlannedTasks,
    // lastWeekCompletedTasks,
    lastWeekPlannedHabits,
    // lastWeekCompletedHabits,
    []
  );

  // Getting max task amount among the days
  const totalPoints = days.reduce((sum, day) => sum + day.totalPoints, 0);

  return {
    days,
    totalPoints,
  };
}
