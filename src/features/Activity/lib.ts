import { getStartOfWeek } from "@/shared/lib/utils/getStartOfWeek";
import { Comment } from "@prisma/client";

type LastWeekActiveTasks = {
  comments: Comment[];
  points: number;
}[];

type LastWeekActiveHabits = {
  comments: Comment[];
  points: number;
}[];

type LastWeekActiveChallenges = {
  comments: Comment[];
  points: number;
}[];

export function getActivityDays(
  lastWeekActiveTasks: LastWeekActiveTasks,
  lastWeekActiveHabits: LastWeekActiveHabits,
  lastWeekActiveChallenges: LastWeekActiveChallenges
) {
  const startOfWeek = getStartOfWeek();

  const days = [
    { title: "M" },
    { title: "T" },
    { title: "W" },
    { title: "T" },
    { title: "F" },
    { title: "S" },
    { title: "S" },
  ].map((day, index) => {
    // Calculate the start of each day
    const dayStart = new Date(startOfWeek);
    dayStart.setDate(dayStart.getDate() + index);

    // Calculate the start of the next day
    const nextDayStart = new Date(dayStart);
    nextDayStart.setDate(dayStart.getDate() + 1);

    const taskAmount = lastWeekActiveTasks
      .filter((task) =>
        task.comments.some((comment) => {
          return (
            Number(comment.time) > dayStart.getTime() &&
            Number(comment.time) <= nextDayStart.getTime()
          );
        })
      )
      .reduce((sum, task) => sum + task.points, 0);

    const habitPoints = lastWeekActiveHabits
      .filter((habit) =>
        habit.comments.some((comment) => {
          return (
            Number(comment.time) > dayStart.getTime() &&
            Number(comment.time) <= nextDayStart.getTime()
          );
        })
      )
      .reduce((sum, task) => sum + task.points, 0);

    const challengePoints = lastWeekActiveChallenges
      .filter((challenge) =>
        challenge.comments.some((comment) => {
          return (
            Number(comment.time) > dayStart.getTime() &&
            Number(comment.time) <= nextDayStart.getTime()
          );
        })
      )
      .reduce((sum, task) => sum + task.points, 0);

    return { ...day, taskAmount: taskAmount + habitPoints + challengePoints };
  });

  return days;
}
